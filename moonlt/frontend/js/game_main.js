class Main {  // 游戏主进程
  constructor(props = {}) {
    const { cid = 'rich', teams = [ 'pink', 'blue', 'red', 'green', 'black' ], userList = [], playerList = {}, gameState = {}, id, name, socket } = props;
    this.config = { // 配置信息
      playerList,
      userList, // 用户信息
      start: 'leftBottom',
      width: 700,
      height: 700,
      waitTime: 10,
      container: cid,
      teams
    }
    this.socket = socket;
    this.state = {     
      status: {},
      cells: [], // 所有格子
      roomId: gameState.roomId,
      round: gameState.round || 1, // 回合
      queue: gameState.queue || [], // 玩家队列
      cIndex: gameState.cIndex || 0, //当前队列index
      cPlayer: gameState.cPlayer || null, // 当前玩家
    }
    this.player = { // 玩家信息
      playing: null, // 当前玩家
      num: 1, // 玩家数量 
      list: {}, // 玩家对象列表
    }
    this.me = { // 自己的信息
      id,
      name,
    }
  }
  init() {
    this.initGameEnv();
    this.initPlayers();
    this.initTools();
    // 绑定主进程事件
    this.bindEvent();
  }
  initGameEnv() { // 初始化游戏环境
    // 初始化游戏主进程
    this.render();
    // 初始化棋盘
    this.state.table = new Table();
    this.state.table.init();
    this.state.table.render();
  }
  initPlayers() { // 初始化游戏玩家
    const { userList, playerList } = this.config;
    const { table } = this.state;
    // 初始化玩家
    Object.keys(playerList).forEach((key) => {
      const { name, id, uid, team } = playerList[key].state;
      this.player.list[id] = new Player({ id, uid, name, table, team });
      // this.state.queue.push(id);
      this.player.num += 1;
      this.player.list[id].render();
    })
  }
  initTools() { // 初始化游戏道具
    // 初始化色子
    this.state.roll = new Roll();
    this.state.roll.init();
  }
  render() {
    const operateBox = `<div id="operate" class="operateBox"></div>`;
    $(`#${this.config.container}`).append(operateBox);
    this.renderState();
  }
  renderState() {
    console.log(this.state.cPlayer);
    const startBtn = `<div id="startRoll" class="btn btn-start">${this.me.name}快跑</div>`;
    const waitingBtn = `<div id="waitBtn" class="btn btn-wait">${this.state.cPlayer.name}正在跑</div>`;
    if (this.me.id === this.state.cPlayer.id) {
      $('#operate').html(startBtn);
    } else {
      $('#operate').html(waitingBtn);
    }
  }
  bindEvent() {
    const _this = this;
    $('#operate').on('click', '#startRoll', function() {
      if (_this.me.id === _this.state.cPlayer.id) {
        console.log(_this.me.name + '要滚动了');
        const rollParams = {
          action: 'start_roll',
          id: _this.me.id,
          name: _this.me.name,
          roomId: _this.state.roomId,
        };
        console.log(_this.socket);
        _this.socket.emit('startRoll', rollParams);
      } else {
        console.log('还没轮到' + _this.me.name)
      }
      // if (_this.player && _this.state.roll) {
      //   if (_this.state.roll.state.isRolling) {
      //     console.log('正在滚动');
      //     return;
      //   }
      //   if (_this.state.table.state.isRunning) {
      //     console.log('有人在跑');
      //     return;
      //   }
      //   _this.state.roll.rollStart(_this.state.player);
      // }
    })
  }
  divide(cb) { // 分组
    const { teams, teamPlayers } = this.config;
    const { list, num } = this.player;
    if (teamPlayers === 1) { // 一人一个小组
      if (teams.length < num) return; // 分组配置不够
      Object.keys(list).forEach((i) => {
        keys[i].state.team = teams[i];
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
  init() {
    const times = `<div class="step-box">走 <span id="step-con" style="color:red;font-size: 0.5rem;font-weight: blod">0</span> 步</div>`;
    $(`#${this.state.container}`).append(times);
  }
  render(num) {
    $('#step-con').html(num);
  }
  rollStart(player) {
    const point = [ 1, 2, 3, 4, 5, 6 ];
    const rollTime = 20;
    const rollOnce = (rollTime) => {
      this.state.isRolling = true;
      this.timer = setTimeout(() => {
        const tIndex = Math.round(Math.random() * 5);
        const tPoint = point[tIndex];
        this.render(tPoint);
        rollTime --;
        if (rollTime) rollOnce(rollTime);
        else {
          this.state.isRolling = false;
          player.moveStep(tPoint);
          clearTimeout(this.timer);
        }
      }, 200)
    }
    rollOnce(rollTime)
  }
}

class Player {
  constructor(props = {}) {
    const { id, uid, table, name = '玩家1', team = 'blue' } = props;
    this.state = {
      table,
      id,
      team,
      name,
      step: 0, // 位置
      circle: 0, // 圈数
      curr: null,
    }
  }
  init() {

  }
  render() {
    const { container, head, cells } = this.state.table.state;
    const { l, t } = cells[head].state.position;
    const { id, team } = this.state;
    const tPlayer = `<div
    id="${id}"
    class="player"
    style="left:${l}rem;
    top:${t}rem;
    background:${team};
    "
    >
    ${this.state.name}
    </div>`;
    $(`#${container}`).append(tPlayer);
    this.state.curr = head;
  }
  moveTo(target) {
    const moveToNext = () => {
      const { curr, table, id } = this.state;
      const { cells } = table.state;
      const next = cells[cells[curr].state.next];
      const _this = this;
      this.state.step += 1;
      table.state.isRunning = true; // 有人在跑
      if (next.state.isLast) {
        this.state.step = 0.
        this.state.circle += 1;
      }
      $(`#${id}`).animate({
        left: `${next.state.position.l}rem`,
        top: `${next.state.position.t}rem`,
      }, 100, () => {
        _this.state.curr = next.state.id;
        if (_this.state.curr === target) { // 到达目标位置
          table.state.isRunning = false; // 没人跑了
          return;
        }
        moveToNext();
      });
    }
    moveToNext();
  }
  moveStep(steps) {
    let tSteps = 0;
    const moveToNext = () => {
      const { curr, table, id } = this.state;
      const { cells } = table.state;
      const next = cells[cells[curr].state.next];
      const _this = this;
      this.state.step += 1;
      table.state.isRunning = true; // 有人在跑
      if (next.state.isLast) {
        this.state.step = 0.
        this.state.circle += 1;
      }
      $(`#${id}`).animate({
        left: `${next.state.position.l}rem`,
        top: `${next.state.position.t}rem`,
      }, 1000, () => {
        tSteps += 1;
        _this.state.curr = next.state.id;
        if (tSteps === steps) { // 到达目标位置
          table.state.isRunning = false; // 有人在跑
          // console.log(next.state)
          return;
        }
        moveToNext();
      });
    }
    moveToNext();
  }
}

class Table { // 棋盘
  constructor(props = {}) {
    const { cid = 'rich' } = props;
    this.state = {
      start: 'leftBottom',
      width: 700,
      height: 700,
      container: cid,
      config: {},
      status: {},
      head: '1',
      cells: {},
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
    this.state.steps = cells.length;
    switch(this.state.start) {
      case('leftBottom'):
        cells[0].left = 0;
        cells[0].top = this.state.height - cells[0].height;
        break;
      default:
        cells[0].left = 0;
        cells[0].top = this.state.height;
        break;
    }
    cells.forEach((item, index) => {
      if (index === 0) this.state.head = item.id;
      if (index !== 0) {
        const tPrev = cells[index - 1];
        item.prev = tPrev.id;
        // 设置位置
        const tP = this.getLocation(tPrev, item);
        item.left = tP.x;
        item.top = tP.y;
      }
      if (cells[index + 1]) item.next = cells[index + 1].id;
      else {
        item.isLast = true;
        item.next = this.state.head
      }
      const tC = new Cell(item);
      this.state.cells[tC.state.id] = tC;
    })
  }
  render() {
    const { head, cells } = this.state;
    if (!head) {
      console.log('缺少开始棋格');
      return;
    }
    const renderCells = (cell) => {
      cell.render(this.state.container);
      if (cell.state.next && !cell.state.isLast) {
        renderCells(this.state.cells[cell.state.next]);
      }
    }
    renderCells(this.state.cells[head]);
    // this.state.cells.forEach((cell) => {
    //   cell.render(this.state.container);
    // });
  }
  getLocation(prev, curr) { // 边界判断后获取位置
    const toLeft = prev.left - curr.width;
    const toRight = this.state.width - prev.left - prev.width - curr.width;
    const toTop = prev.top - curr.width;
    const toBottom = this.state.height - prev.top - prev.height - curr.height;
    if (toLeft < 0) { // 靠近左边界
      if (toTop < 0) { // 在左上角
        return { x: prev.left + curr.width, y: prev.top };
      } else { // 左边界
        return { x: prev.left, y: prev.top - curr.height };
      }
    } else {
      if (toRight < 0) { // 靠近右边界
        if (toBottom < 0) { // 右下角
          return { x: prev.left - curr.width, y: prev.top };
        } else { //  靠近右
          return { x: prev.left, y: prev.top + curr.height };
        }
      } else {
        if (toTop < 0) { // 上边界不靠近角
          return { x: prev.left + curr.width, y: prev.top };
        }
        if (toBottom < 0) { // 下边界不靠近角
          return { x: prev.left - curr.width, y: prev.top };
        }
      }
    }
  }

}

class Cell { // 单个格子
  constructor(props = {}) {
    const {
      id,
      type = 'default',
      width = 80,
      height = 80,
      left = 0,
      top = 0,
      isHead = false,
      isLast = false,
      next,
    } = props;
    this.state = {
      id,
      type, // 类型： 普通 功能 道具
      size: {
        w: width * 10 / 750,
        h: height * 10 / 750,
      },
      position: {
        center: { x: left, y: top },
        l: left * 10 / 750,
        t: top * 10 / 750,
      },
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
  render (container) {
    const cellHtml = `
    <div
      class="cell default"
      style="width:${this.state.size.w}rem;
      height:${this.state.size.h}rem;
      left:${this.state.position.l}rem;
      top:${this.state.position.t}rem;
      "
      id="${this.state.id}"
    >
      <div class="inner">${this.state.id}</div>
    </div>`;
    $(`#${container}`).append(cellHtml);
  }
  setColor() {

  }
}


class Socket {
  constructor({ username, uid }) {
    this.socket = '';
    this.config = {
      url: location.href,
      nameSpace: '',
      room: '',
      roomId: '',
      name: username || '',
      uid: uid || '',
    }
  }
  init() {
    if (!this.config.name) {
      console.log('用户名未输入');
      return;
    }
    this.socket = io({
      path: '/game',
      query: {
        name: this.config.name,
        uid: this.config.uid,
      }
    });
    this.socket && this.socket.on('send_from_server', function(msg, from, roomId){

      if (roomId) { // 发送至房间
        // let messageText = '';
        // if (!from) {
        //   alertMsg(msg, 'success');
        // } else {
        //   if (from.send_uid * 1 === _this.config.uid) messageText = `<div class="mine"><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
        //   else messageText = `<div><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
        // }
        // $('#messages').append(messageText);
        // scrollToLocation($('#messages'), 'div');
      } else { // 发送至大厅
        // let messageText = '';
        // if (!from) {
        //   alertMsg(msg, 'success');
        // } else {
        //   if (from.send_uid * 1 === _this.config.uid) messageText = `<div class="mine"><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
        //   else messageText = `<div><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
        // }
        // $('#publicRes').append(messageText);
        // scrollToLocation($('#publicRes'), 'div');
      }
    });
    this.socket && this.socket.on('error', function (data) {
      console.log(data || 'error');
    });
    this.bindJoinRoom();
    this.bindReady();
    // this.bindSelectRoom();
    // this.bindLeaveRoom();
    // this.bindSendMessage();
    // this.getMessages(100000);
  }
  bindJoinRoom() {
    this.socket && this.socket.on('join_room', (msg, params) => {
      console.log('join_room')
      const { roomInfo = {}, roomId, id, name } = params;
      if (name === this.config.name) {
        this.config.roomId = roomId;
        this.config.room = roomInfo;
        this.config.id = id;
        const joinParams = { roomId, id, name };
        this.socket.emit('joinRoom', joinParams);
      }
    })
  }
  bindReady() {
    this.socket && this.socket.on('join_ready', (msg, params) => {
      const { roomInfo = {}, roomId, id, name } = params;
      if (this.config.roomId !== roomId) return;
      const gameParams = {
        userList: roomInfo.config.userList,
        playerList: roomInfo.player.list,
      }
      this.renderStart(roomInfo.player.list);
      // if (!this.main) {
      //   this.main = new Main(gameParams);
      //   this.main.init();
      // }
    })
  }
  renderStart(playerList) {
    const { name, uid } = this.config;
    console.log('我得名字：' + name);
    let tGameHtml = '<div class="players-con" id="player-con">';
    const _this = this;
    Object.keys(playerList).forEach((key) => {
      if (playerList[key].state.name === name) {
        tGameHtml += `<p id="${playerList[key].state.id}">${playerList[key].state.team}队：我</p>`;
      } else {
        tGameHtml += `<p id="${playerList[key].state.id}">${playerList[key].state.team}队：${playerList[key].state.name}</p>`;
      }
    })
    tGameHtml += '<div id="ready-btn" class="btn ready"> 准备 </div></div>';
    $('body').append(tGameHtml);
    this.bindGameReady();
    $('body').on('click', '#ready-btn', function() {
      console.log('click');
      const readyParams = {
        action: 'game_ready',
        roomId: _this.config.roomId,
        uid: _this.config.uid,
        id: _this.config.id,
        name: _this.config.name,
      }
      _this.socket.emit('gameReady', readyParams);
    });
  }
  bindGameReady() {
    this.socket && this.socket.on('game_ready', (msg, params) => {
      console.log('game_ready')
      const { roomInfo = {}, roomId, id, name } = params;
      if (this.config.roomId !== roomId) return;
      $(`#${id}`).css('color', 'green').append('已准备');
      if (this.config.name === name) {
        $('#ready-btn').remove();
      } 
      this.bindGameStart();
      // if (!this.main) {
      //   this.main = new Main(gameParams);
      //   this.main.init();
      // }
    })
  }
  bindGameStart() {
    this.socket && this.socket.on('game_start', (msg, params) => {
      if (!this.main) {
        alert(msg);
        console.log(params);
        const gameParams = {
          userList: params.roomInfo.config.userList,
          playerList: params.roomInfo.player.list,
          roomId: params.roomId,
          gameState: params.gameState,
          id: this.config.id,
          name: this.config.name,
          socket: this.socket,
        }
        this.main = new Main(gameParams);
        this.main.init();
        this.bindRollEvents();
      }
    })
  }
  bindRollEvents() {
    this.socket && this.socket.on('send_steps', (params) => {
      console.log('params');
      const { id, steps } = params;
      if (id === this.config.id) {
        this.main.player.list[id].moveStep(steps);
      }
    })
  }
  bindSelectRoom() {
    const _this = this;
    $('#rooms').find('li').each(function(index, el){
      $(el).on('click', function(e){
        _this.config.room && _this.socket.emit('leaveRoom', _this.config.roomId);
        _this.config.room = $(el).data('room');
        _this.config.roomId = $(el).data('roomid');
        $('#roomInfo').show();
        $('#currentRoom').html(_this.config.room);
        _this.socket.emit('joinRoom', _this.config.roomId);
        $('#publicRes').hide();
        $('#messages').show();
        _this.getMessages(_this.config.roomId);
      })
    })
  }
  bindLeaveRoom() {
    const _this = this;
    $('#leaveBtn').on('click', () => {
      if (!_this.config.roomId) return
      _this.socket.emit('leaveRoom', _this.config.roomId, _this.config.uid);
      $('#currentRoom').empty();
      $('#roomInfo').hide();
      $('#messages').hide();
      $('#publicRes').show();
      _this.getMessages(100000);
      _this.config.room = '';
      _this.config.roomId = '';
    })
  }
  getMessages(roomId) {
    const _this = this;
    $('#messages').empty();
    roomId === 100000 && $('#publicRes').find('div').remove();
    Api.post('/api/getMessages', { roomId }, (res, err) => {
      if (res.code === -1) {
        console.log('获取信息失败');
        return;
      }
      if (roomId === 100000) { // 大厅消息
        res.data.length && res.data.forEach((item) => {
          let tMessage = '';
          if (_this.config.uid === item.send_uid) tMessage = `<div class="mine"><div class="header">${item.send_name}</div><span>${item.msg}( ${item.send_time} )</span></div>`;
          else tMessage =  `<div><div class="header">${item.send_name}</div><span>${item.msg}( ${item.send_time} )</span></div>`;
          $('#publicRes').append(tMessage);
        })
        $('#publicRes').append(`<div class="public"><span><--------↑↑ 历史消息 ↑↑-------></span></div>`);
        $('#publicRes').height($(window).height() - 240);
        scrollToLocation($('#publicRes'), 'div');
      } else { // 房间消息
        res.data.length && res.data.forEach((item) => {
          let tMessage = '';
          if (_this.config.uid === item.send_uid) tMessage = `<div class="mine"><div class="header">${item.send_name}</div><span>${item.msg}( ${item.send_time} )</span></div>`;
          else tMessage =  `<div><div class="header">${item.send_name}</div><span>${item.msg}( ${item.send_time} )</span></div>`;
          $('#messages').append(tMessage);
        })
        $('#messages').append(`<div class="public"><span><--------↑↑ 历史消息 ↑↑-------></span></div>`);
        $('#messages').height($(window).height() - 240);
        scrollToLocation($('#messages'), 'div');
      }
    })
  }
  bindSendMessage() {
    const _this = this;
    $('form').submit(function(e){
      var submitMsg = $('#m').val();
      if (!submitMsg) return;
      e.preventDefault();
      if (_this.config.room) _this.socket.emit('send_from_client', _this.config.room, _this.config.roomId, submitMsg);
      else _this.socket.emit('send_from_client', '', '', submitMsg);
      $('#m').val('');
      return false;
    });
  }
}
const getUserInfo = (cb) => {
  Api.post('/api/getUserInfo', {token: getCookie('token')}, (res, err) => {
    if ([-1, -2, -9].indexOf(res.code) !== -1) location.href = `${Api.host}/login.html`;
    if (res.code === 0) cb(res.data);
  })
}
$(function(){
  // const params = {
  //   userList: [ { id: '1111', name: '小杨' } ],
  // }
  
  getUserInfo((data) => {
    const tSocket = new Socket({ username: data.username, uid: data.uid });
    tSocket.init();
  })
})

