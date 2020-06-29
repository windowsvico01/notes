const express = require('express');

class GameLobby {
  constructor(props = {}) {
    const { path = 'game', server } = props;
    this.path = path;
    this.server = server;
    this.chatInfo = {
      users: [
        // { name: '', id: '' },
      ],
      waitQueue: [], // 等待队列
      rooms: {},
    }
    this.rooms = [];
  }
  initSocket() {
    this.io = require('socket.io')({
      path: `/${this.path}`,
      serveClient: true,
    });
    this.io.attach(this.server, {
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false
    });
    this.io.on('connection', (socket) => {
      this.bindEvent(socket);
      this.waitingPlayers(socket);
      this.joinRoom(socket);
    })
  }
  bindEvent(socket) {
    // 监测当前在线用户
    if (!this.chatInfo.users.filter((e) => e.name == socket.handshake.query.name).length) {
      this.chatInfo.users.push({
        name: socket.handshake.query.name,
        id: socket.id,
      });
      this.io.emit('send_from_server', socket.handshake.query.name +'来啦');
    }
    if (!this.chatInfo.waitQueue.filter((e) => e.name == socket.handshake.query.name).length) {
      this.chatInfo.waitQueue.push({
        name: socket.handshake.query.name,
        uid: socket.handshake.query.uid,
        id: socket.id,
      })
    }
    socket.on('disconnect', (data) => {
      this.chatInfo.users = this.chatInfo.users.filter((e) => e.name != socket.handshake.query.name);
      console.log(socket.handshake.query);
      console.log('用户断开');
    });
    // socket.on('send_from_client', function(room, roomId, msg){     
    //   if (room) {
    //     // console.log('发送到room：' + room + '的消息：' + msg);
    //     saveMsg(roomId, { msg, sendName: socket.handshake.query.name, sendUid: socket.handshake.query.uid }, () => {
    //       io.to(roomId).emit('send_from_server', msg, { send_name: socket.handshake.query.name, send_uid: socket.handshake.query.uid }, roomId);
    //     })
    //   } else {
    //     // console.log(socket.handshake.query.name + '发送到大厅的消息：' + msg);
    //     saveMsg(100000, { msg, sendName: socket.handshake.query.name, sendUid: socket.handshake.query.uid }, () => {
    //       io.emit('send_from_server', msg, { send_name: socket.handshake.query.name, send_uid: socket.handshake.query.uid });
    //     })
    //   }
    // });
    // socket.on('joinRoom', (roomId) => {
    //   socket.join(roomId, () => {
    //     this.io.to(roomId).emit('send_from_server', socket.handshake.query.name +'来啦', '', roomId);
    //     // console.log(rooms); // [ <socket.id>, 'room 237' ]
    //   })
    // });
    // socket.on('leaveRoom', function(roomId, uid) {
    //   socket.leave(roomId, function(){
    //     let rooms = Object.keys(socket.rooms);
    //     // console.log(rooms); // [ <socket.id>, 'room 237' ]
    //   })
    // });
  }
  waitingPlayers (socket) {
    const params = {
      type: 'waiting',
      waitQueue: this.chatInfo.waitQueue,
    }
    if (params.waitQueue.length < 2) { // 正在组队
      this.io.emit('send_from_server', '等待队友。。。', params)
    }
    if (params.waitQueue.length === 2) { // 组队完成，进入游戏房间
      const userList = params.waitQueue;
      const roomId = `room${new Date().valueOf()}`;
      this.room = new Room({ userList, roomId });
      this.room.init();
      this.chatInfo.rooms[roomId] = this.room;
      this.rooms.push(this.room);
      this.chatInfo.waitQueue.forEach((user) => {
        const params = {
          userList,
          roomInfo: this.room,
          roomId,
          uid: user.uid,
          id: user.id,
          name: user.name,
        }
        this.io.emit('join_room', '准备加入房间', params);
      })
      this.chatInfo.waitQueue = [];      
    }
  }
  joinRoom(socket) {
    socket.on('joinRoom', (data) => {
      const { roomId, name, id } = data;
      this.chatInfo.rooms[roomId].player.joined.push({ name, id, roomId });
      socket.join(roomId, () => {
        this.io.to(roomId).emit('send_from_server', socket.handshake.query.name +'来啦', '', roomId);
      })
      if (this.chatInfo.rooms[roomId].player.joined.length === this.chatInfo.rooms[roomId].player.max) { // 房间人员都已经进入
        console.log('房间人员都进入了');
        // 开始更新棋盘信息
        this.room.divide(); // 玩家分组
        const params = {
          roomInfo: this.room,
          roomId,
          id,
          name: name,
        }
        this.io.to(roomId).emit('join_ready', socket.handshake.query.name +'全员进入', params);
      }
      this.readyStart(socket);
    });
  }
  readyStart(socket) {
    console.log('bindreadyStart');
    socket.on('gameReady', (data) => {
      console.log('gameReady')
      const { action, roomId, name, id } = data;
      if (!this.chatInfo.rooms[roomId].player.ready.filter((item) => item.name === name).length) {
        this.chatInfo.rooms[roomId].player.ready.push({ name, id, roomId });
      }
      const params = {
        action: 'game_ready',
        roomInfo: this.room,
        roomId,
        id,
        name: name,
      }
      this.io.to(roomId).emit('game_ready', socket.handshake.query.name +'已准备', params);
      if (this.chatInfo.rooms[roomId].player.ready.length === this.chatInfo.rooms[roomId].player.max) {
        // 此处规推送开始信息，并且开始比赛
        this.room.initRound();
        const startParams = {
          action: 'game_start',
          roomInfo: this.room,
          roomId,
          gameState: this.room.state,
        }
        this.io.to(roomId).emit('game_start', '开始比赛', startParams);
        //  绑定比赛消息
        this.bindGameEvent(socket);
      }
    });
  }
  bindGameEvent(socket) {
    socket.on('startRoll', (data) => {
      console.log(data.name + 'startRoll');
      const { id, roomId } = data;
      this.room.roll.rollStart((point) => {
        console.log(point + '-----')
        this.room.player.list[id].moveStep(socket, point);
        console.log(this.room.player.list[id]);
        const stepsParams = {
          id,
          steps: point,
        }
        this.io.to(roomId).emit('send_steps', 'dasdasdasd', stepsParams);
      });
    })
  }
}

class Room {
  constructor(props = {}) {
    const { cid = 'rich', teams = [ 'pink', 'blue', 'red', 'green', 'black' ], teamPlayers = 1, userList = [], roomId } = props;
    this.config = {
      roomId,
      name: 'cpdd呀',
      userList, // 用户信息
      start: 'leftBottom',
      width: 700,
      height: 700,
      waitTime: 10,
      container: cid,
      teams,
      teamPlayers,
    }
    this.state = {
      table: null,
      round: 1, // 回合
      queue: [], // 玩家队列
      cIndex: 0, //当前队列index
      cPlayer: null, // 当前玩家
    }
    this.player = { // 玩家信息
      max: 2,
      joined: [], // 已经进入房间的玩家
      ready: [], // 已经点击准备的玩家
      playing: null, // 当前玩家
      num: 1, // 玩家数量 
      list: {}, // 玩家对象列表
    }
  }
  init() {
    this.initGameEnv();
    this.initPlayers();
    this.initTools();
    // 绑定主进程事件
    // this.bindEvent();
  }
  initGameEnv() { // 初始化游戏环境
    // 初始化棋盘
    this.state.table = new Table();
    this.state.table.init();
  }
  initPlayers() { // 初始化游戏玩家
    const { userList } = this.config;
    const { table } = this.state;
    // 初始化玩家
    userList.forEach((_player, index) => {
      const { uid, name, id } = _player;
      this.player.list[id] = new Player({ uid, id, name, table });
      this.player.list[id].init();
      // this.state.queue.push(index);
      this.player.num += 1;
    });
    // 玩家分组
    this.divide();
  }
  initTools() { // 初始化游戏道具
    // 初始化色子
    this.roll = new Roll();
  }
  initRound() { // 初始化游戏对局
    const { list } = this.player;
    Object.keys(list).forEach((key) => {
      console.log(key);
      const current = {
        name: list[key].state.name,
        id: list[key].state.id,
        uid: list[key].state.uid,
      }
      this.state.queue.push(current);
    })
    console.log(this.state.queue);
    this.state.cPlayer = this.state.queue[0];
    this.state.cIndex = 1;
  }
  divide(cb) { // 分组
    const { teams, teamPlayers } = this.config;
    const { list, num } = this.player;
    if (teamPlayers === 1) { // 一人一个小组
      if (teams.length < num) return; // 分组配置不够
      Object.keys(list).forEach((i, index) => {
        this.player.list[i].state.team = teams[index];
      })
    }
    if (cb) cb();
    // 后期再添加多人分组
  }
  // 开始回合
  startGame() {
    const { queue, cIndex, cPlayer } = this.state;
    const { list } = this.player;
    this.state.cPlayer = list[queue[cIndex]];
  }
  nextTurn() {
    const { queue, cIndex } = this.state;
    const { list } = this.player;
    if (cIndex = queue.length - 1) { // 玩完一轮了
      this.state.cIndex = 0;
      this.state.round += 1;
      this.state.cPlayer = list[queue[0]];
    } else {
      this.state.cPlayer = list[queue[cIndex + 1]];
    }
  }

}
class Roll {
  constructor(props = {}) {
    this.state = {
      container: 'rich',
      isRolling: false,
    }
  }
  rollStart(cb) {
    console.log('rollllllllllll');
    const point = [ 1, 2, 3, 4, 5, 6 ];
    const tIndex = Math.round(Math.random() * 5);
    const tPoint = point[tIndex];
    // 发送消息给客户端
    if (cb) cb(tPoint);
    
  }
}
class Player {
  constructor(props = {}) {
    const { id, uid, name = '玩家1', table, team = 'pink' } = props;
    this.state = {
      table,
      uid,
      id,
      team,
      name,
      step: 0, // 位置
      circle: 0, // 圈数
      curr: null,
      coin: 3000,
    }
  }
  init() {
    const { head } = this.state.table.state;
    this.state.curr = head;
  }
  moveTo(target) {
    const moveToNext = () => {
      const { curr, table, uid } = this.state;
      const { cells } = table.state;
      const next = cells[cells[curr].state.next];
      this.state.step += 1;
      table.state.isRunning = true; // 有人在跑
      if (next.state.isLast) {
        this.state.step = 0;
        this.state.circle += 1;
      }
      this.state.curr = next.state.id;
      if (this.state.curr === target) { // 到达目标位置
        // 发送给客户端移动到哪里  
        table.state.isRunning = false; // 没人跑了
        return;
      }
      moveToNext();
    }
    moveToNext();
  }
  moveStep(socket, steps) {
    let tSteps = 0;
    const moveToNext = () => {
      const { curr, table, id } = this.state;
      const { cells } = table.state;
      const next = cells[cells[curr].state.next];
      this.state.step += 1;
      if (next.state.isLast) {
        this.state.step = 0;
        this.state.circle += 1;
      }
      tSteps += 1;
      this.state.curr = next.state.id;
      if (tSteps === steps) { // 到达目标位置
        // 发送给客户端移动到哪里
        // console.log(next.state)
        return;
      }
      moveToNext();
    }
    moveToNext();
  }
}
class Table { // 棋盘
  constructor(props = {}) {
    const { cid = 'rich' } = props;
    this.state = {
      start: 'leftBottom',
      config: {},
      status: {},
      head: '1',
      cells: {},
      cellNum: 0,
      steps: 0,
      players: [],
      isRunning: false,
    }
  }
  init() {
    const cells = [ { width: 70, height: 70, id: '1', isHead: true },
    { width: 70, height: 70, id: '2', isHead: false },
    { width: 70, height: 70, id: '3', isHead: false },
    { width: 70, height: 70, id: '4', isHead: false },
    { width: 70, height: 70, id: '6', isHead: false },
    { width: 70, height: 70, id: '7', isHead: false },
    { width: 70, height: 70, id: '8', isHead: false },
    { width: 70, height: 70, id: '9', isHead: false },
    { width: 70, height: 70, id: '10', isHead: false },
    { width: 70, height: 70, id: '11', isHead: false },
    { width: 70, height: 70, id: '12', isHead: false },
    { width: 70, height: 70, id: '13', isHead: false },
    { width: 70, height: 70, id: '14', isHead: false },
    { width: 70, height: 70, id: '15', isHead: false },
    { width: 70, height: 70, id: '16', isHead: false },
    { width: 70, height: 70, id: '17', isHead: false },
    { width: 70, height: 70, id: '18', isHead: false },
    { width: 70, height: 70, id: '19', isHead: false },
    { width: 70, height: 70, id: '20', isHead: false },
    { width: 70, height: 70, id: '21', isHead: false },
    { width: 70, height: 70, id: '22', isHead: false },
    { width: 70, height: 70, id: '23', isHead: false },
    { width: 70, height: 70, id: '24', isHead: false },
    { width: 70, height: 70, id: '25', isHead: false },
    { width: 70, height: 70, id: '26', isHead: false },
    { width: 70, height: 70, id: '27', isHead: false },
    { width: 70, height: 70, id: '28', isHead: false },
    { width: 70, height: 70, id: '29', isHead: false },
    { width: 70, height: 70, id: '30', isHead: false },
    { width: 70, height: 70, id: '31', isHead: false },
    { width: 70, height: 70, id: '32', isHead: false },
    { width: 70, height: 70, id: '33', isHead: false },
    { width: 70, height: 70, id: '34', isHead: false },
    { width: 70, height: 70, id: '35', isHead: false },
    { width: 70, height: 70, id: '36', isHead: false },
    { width: 70, height: 70, id: '37', isHead: false },
    ];
    this.state.cellNum = cells.length;
    cells.forEach((item, index) => {
      if (index === 0) this.state.head = item.id;
      if (index !== 0) {
        const tPrev = cells[index - 1];
        item.prev = tPrev.id;
      }
      if (cells[index + 1]) item.next = cells[index + 1].id;
      else {
        item.isLast = true;
        item.next = this.state.head
      }
      const tC = new Cell(item);
      // this.state.cells.push(tC);
      this.state.cells[tC.state.id] = tC;
    })
  }
}
class Cell { // 单个格子
  constructor(props = {}) {
    const {
      id,
      type = 'default',
      isHead = false,
      isLast = false,
      next,
    } = props;
    this.state = {
      id,
      type, // 类型： 普通 功能 道具
      isHead,
      isLast,
      prev: null,
      next,
      default: { // 普通类型格子
        style: {
          color: '',
          class: 'normal'
        },
        price: 0, // 地块价格
        cost: 0, // 路过支付
        level: 1, // 等级
        owner: '',
      },
    }
  }
  init () {

  }
  setColor() {

  }
}

module.exports = GameLobby;