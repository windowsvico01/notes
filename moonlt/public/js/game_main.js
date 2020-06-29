"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Main = /*#__PURE__*/function () {
  // 游戏主进程
  function Main() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Main);

    var _props$cid = props.cid,
        cid = _props$cid === void 0 ? 'rich' : _props$cid,
        _props$teams = props.teams,
        teams = _props$teams === void 0 ? ['pink', 'blue', 'red', 'green', 'black'] : _props$teams,
        _props$userList = props.userList,
        userList = _props$userList === void 0 ? [] : _props$userList,
        _props$playerList = props.playerList,
        playerList = _props$playerList === void 0 ? {} : _props$playerList,
        _props$gameState = props.gameState,
        gameState = _props$gameState === void 0 ? {} : _props$gameState,
        id = props.id,
        name = props.name,
        socket = props.socket;
    this.config = {
      // 配置信息
      playerList: playerList,
      userList: userList,
      // 用户信息
      start: 'leftBottom',
      width: 700,
      height: 700,
      waitTime: 10,
      container: cid,
      teams: teams
    };
    this.socket = socket;
    this.state = {
      status: {},
      cells: [],
      // 所有格子
      roomId: gameState.roomId,
      round: gameState.round || 1,
      // 回合
      queue: gameState.queue || [],
      // 玩家队列
      cIndex: gameState.cIndex || 0,
      //当前队列index
      cPlayer: gameState.cPlayer || null // 当前玩家

    };
    this.player = {
      // 玩家信息
      playing: null,
      // 当前玩家
      num: 1,
      // 玩家数量 
      list: {} // 玩家对象列表

    };
    this.me = {
      // 自己的信息
      id: id,
      name: name
    };
  }

  _createClass(Main, [{
    key: "init",
    value: function init() {
      this.initGameEnv();
      this.initPlayers();
      this.initTools(); // 绑定主进程事件

      this.bindEvent();
    }
  }, {
    key: "initGameEnv",
    value: function initGameEnv() {
      // 初始化游戏环境
      // 初始化游戏主进程
      this.render(); // 初始化棋盘

      this.state.table = new Table();
      this.state.table.init();
      this.state.table.render();
    }
  }, {
    key: "initPlayers",
    value: function initPlayers() {
      var _this2 = this;

      // 初始化游戏玩家
      var _this$config = this.config,
          userList = _this$config.userList,
          playerList = _this$config.playerList;
      var table = this.state.table; // 初始化玩家

      Object.keys(playerList).forEach(function (key) {
        var _playerList$key$state = playerList[key].state,
            name = _playerList$key$state.name,
            id = _playerList$key$state.id,
            uid = _playerList$key$state.uid,
            team = _playerList$key$state.team;
        _this2.player.list[id] = new Player({
          id: id,
          uid: uid,
          name: name,
          table: table,
          team: team
        }); // this.state.queue.push(id);

        _this2.player.num += 1;

        _this2.player.list[id].render();
      });
    }
  }, {
    key: "initTools",
    value: function initTools() {
      // 初始化游戏道具
      // 初始化色子
      this.state.roll = new Roll();
      this.state.roll.init();
    }
  }, {
    key: "render",
    value: function render() {
      var operateBox = "<div id=\"operate\" class=\"operateBox\"></div>";
      $("#".concat(this.config.container)).append(operateBox);
      this.renderState();
    }
  }, {
    key: "renderState",
    value: function renderState() {
      console.log(this.state.cPlayer);
      var startBtn = "<div id=\"startRoll\" class=\"btn btn-start\">".concat(this.me.name, "\u5FEB\u8DD1</div>");
      var waitingBtn = "<div id=\"waitBtn\" class=\"btn btn-wait\">".concat(this.state.cPlayer.name, "\u6B63\u5728\u8DD1</div>");

      if (this.me.id === this.state.cPlayer.id) {
        $('#operate').html(startBtn);
      } else {
        $('#operate').html(waitingBtn);
      }
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      $('#operate').on('click', '#startRoll', function () {
        if (_this.me.id === _this.state.cPlayer.id) {
          console.log(_this.me.name + '要滚动了');
          var rollParams = {
            action: 'start_roll',
            id: _this.me.id,
            name: _this.me.name,
            roomId: _this.state.roomId
          };
          console.log(_this.socket);

          _this.socket.emit('startRoll', rollParams);
        } else {
          console.log('还没轮到' + _this.me.name);
        } // if (_this.player && _this.state.roll) {
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

      });
    }
  }, {
    key: "divide",
    value: function divide(cb) {
      // 分组
      var _this$config2 = this.config,
          teams = _this$config2.teams,
          teamPlayers = _this$config2.teamPlayers;
      var _this$player = this.player,
          list = _this$player.list,
          num = _this$player.num;

      if (teamPlayers === 1) {
        // 一人一个小组
        if (teams.length < num) return; // 分组配置不够

        Object.keys(list).forEach(function (i) {
          keys[i].state.team = teams[i];
        });
      }

      if (cb) cb(); // 后期再添加多人分组
    } // 开始回合

  }, {
    key: "startGame",
    value: function startGame() {
      var _this$state = this.state,
          queue = _this$state.queue,
          cIndex = _this$state.cIndex,
          cPlayer = _this$state.cPlayer;
      var list = this.player.list;
      this.state.cPlayer = list[queue[cIndex]];
    }
  }, {
    key: "nextTurn",
    value: function nextTurn() {
      var _this$state2 = this.state,
          queue = _this$state2.queue,
          cIndex = _this$state2.cIndex;
      var list = this.player.list;

      if (cIndex = (_readOnlyError("cIndex"), queue.length - 1)) {
        // 玩完一轮了
        this.state.cIndex = 0;
        this.state.round += 1;
        this.state.cPlayer = list[queue[0]];
      } else {
        this.state.cPlayer = list[queue[cIndex + 1]];
      }
    }
  }]);

  return Main;
}();

var Roll = /*#__PURE__*/function () {
  function Roll() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Roll);

    this.state = {
      container: 'rich',
      isRolling: false
    };
  }

  _createClass(Roll, [{
    key: "init",
    value: function init() {
      var times = "<div class=\"step-box\">\u8D70 <span id=\"step-con\" style=\"color:red;font-size: 0.5rem;font-weight: blod\">0</span> \u6B65</div>";
      $("#".concat(this.state.container)).append(times);
    }
  }, {
    key: "render",
    value: function render(num) {
      $('#step-con').html(num);
    }
  }, {
    key: "rollStart",
    value: function rollStart(player) {
      var _this3 = this;

      var point = [1, 2, 3, 4, 5, 6];
      var rollTime = 20;

      var rollOnce = function rollOnce(rollTime) {
        _this3.state.isRolling = true;
        _this3.timer = setTimeout(function () {
          var tIndex = Math.round(Math.random() * 5);
          var tPoint = point[tIndex];

          _this3.render(tPoint);

          rollTime--;
          if (rollTime) rollOnce(rollTime);else {
            _this3.state.isRolling = false;
            player.moveStep(tPoint);
            clearTimeout(_this3.timer);
          }
        }, 200);
      };

      rollOnce(rollTime);
    }
  }]);

  return Roll;
}();

var Player = /*#__PURE__*/function () {
  function Player() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Player);

    var id = props.id,
        uid = props.uid,
        table = props.table,
        _props$name = props.name,
        name = _props$name === void 0 ? '玩家1' : _props$name,
        _props$team = props.team,
        team = _props$team === void 0 ? 'blue' : _props$team;
    this.state = {
      table: table,
      id: id,
      team: team,
      name: name,
      step: 0,
      // 位置
      circle: 0,
      // 圈数
      curr: null
    };
  }

  _createClass(Player, [{
    key: "init",
    value: function init() {}
  }, {
    key: "render",
    value: function render() {
      var _this$state$table$sta = this.state.table.state,
          container = _this$state$table$sta.container,
          head = _this$state$table$sta.head,
          cells = _this$state$table$sta.cells;
      var _cells$head$state$pos = cells[head].state.position,
          l = _cells$head$state$pos.l,
          t = _cells$head$state$pos.t;
      var _this$state3 = this.state,
          id = _this$state3.id,
          team = _this$state3.team;
      var tPlayer = "<div\n    id=\"".concat(id, "\"\n    class=\"player\"\n    style=\"left:").concat(l, "rem;\n    top:").concat(t, "rem;\n    background:").concat(team, ";\n    \"\n    >\n    ").concat(this.state.name, "\n    </div>");
      $("#".concat(container)).append(tPlayer);
      this.state.curr = head;
    }
  }, {
    key: "moveTo",
    value: function moveTo(target) {
      var _this4 = this;

      var moveToNext = function moveToNext() {
        var _this4$state = _this4.state,
            curr = _this4$state.curr,
            table = _this4$state.table,
            id = _this4$state.id;
        var cells = table.state.cells;
        var next = cells[cells[curr].state.next];
        var _this = _this4;
        _this4.state.step += 1;
        table.state.isRunning = true; // 有人在跑

        if (next.state.isLast) {
          _this4.state.step = 0.;
          _this4.state.circle += 1;
        }

        $("#".concat(id)).animate({
          left: "".concat(next.state.position.l, "rem"),
          top: "".concat(next.state.position.t, "rem")
        }, 100, function () {
          _this.state.curr = next.state.id;

          if (_this.state.curr === target) {
            // 到达目标位置
            table.state.isRunning = false; // 没人跑了

            return;
          }

          moveToNext();
        });
      };

      moveToNext();
    }
  }, {
    key: "moveStep",
    value: function moveStep(steps) {
      var _this5 = this;

      var tSteps = 0;

      var moveToNext = function moveToNext() {
        var _this5$state = _this5.state,
            curr = _this5$state.curr,
            table = _this5$state.table,
            id = _this5$state.id;
        var cells = table.state.cells;
        var next = cells[cells[curr].state.next];
        var _this = _this5;
        _this5.state.step += 1;
        table.state.isRunning = true; // 有人在跑

        if (next.state.isLast) {
          _this5.state.step = 0.;
          _this5.state.circle += 1;
        }

        $("#".concat(id)).animate({
          left: "".concat(next.state.position.l, "rem"),
          top: "".concat(next.state.position.t, "rem")
        }, 1000, function () {
          tSteps += 1;
          _this.state.curr = next.state.id;

          if (tSteps === steps) {
            // 到达目标位置
            table.state.isRunning = false; // 有人在跑
            // console.log(next.state)

            return;
          }

          moveToNext();
        });
      };

      moveToNext();
    }
  }]);

  return Player;
}();

var Table = /*#__PURE__*/function () {
  // 棋盘
  function Table() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Table);

    var _props$cid2 = props.cid,
        cid = _props$cid2 === void 0 ? 'rich' : _props$cid2;
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
      isRunning: false
    };
  }

  _createClass(Table, [{
    key: "init",
    value: function init() {
      var _this6 = this;

      var cells = [{
        width: 70,
        height: 70,
        id: '1',
        isHead: true
      }, {
        width: 70,
        height: 70,
        id: '2',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '3',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '4',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '6',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '7',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '8',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '9',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '10',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '11',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '12',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '13',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '14',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '15',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '16',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '17',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '18',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '19',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '20',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '21',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '22',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '23',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '24',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '25',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '26',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '27',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '28',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '29',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '30',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '31',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '32',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '33',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '34',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '35',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '36',
        isHead: false
      }, {
        width: 70,
        height: 70,
        id: '37',
        isHead: false
      }];
      this.state.steps = cells.length;

      switch (this.state.start) {
        case 'leftBottom':
          cells[0].left = 0;
          cells[0].top = this.state.height - cells[0].height;
          break;

        default:
          cells[0].left = 0;
          cells[0].top = this.state.height;
          break;
      }

      cells.forEach(function (item, index) {
        if (index === 0) _this6.state.head = item.id;

        if (index !== 0) {
          var tPrev = cells[index - 1];
          item.prev = tPrev.id; // 设置位置

          var tP = _this6.getLocation(tPrev, item);

          item.left = tP.x;
          item.top = tP.y;
        }

        if (cells[index + 1]) item.next = cells[index + 1].id;else {
          item.isLast = true;
          item.next = _this6.state.head;
        }
        var tC = new Cell(item);
        _this6.state.cells[tC.state.id] = tC;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$state4 = this.state,
          head = _this$state4.head,
          cells = _this$state4.cells;

      if (!head) {
        console.log('缺少开始棋格');
        return;
      }

      var renderCells = function renderCells(cell) {
        cell.render(_this7.state.container);

        if (cell.state.next && !cell.state.isLast) {
          renderCells(_this7.state.cells[cell.state.next]);
        }
      };

      renderCells(this.state.cells[head]); // this.state.cells.forEach((cell) => {
      //   cell.render(this.state.container);
      // });
    }
  }, {
    key: "getLocation",
    value: function getLocation(prev, curr) {
      // 边界判断后获取位置
      var toLeft = prev.left - curr.width;
      var toRight = this.state.width - prev.left - prev.width - curr.width;
      var toTop = prev.top - curr.width;
      var toBottom = this.state.height - prev.top - prev.height - curr.height;

      if (toLeft < 0) {
        // 靠近左边界
        if (toTop < 0) {
          // 在左上角
          return {
            x: prev.left + curr.width,
            y: prev.top
          };
        } else {
          // 左边界
          return {
            x: prev.left,
            y: prev.top - curr.height
          };
        }
      } else {
        if (toRight < 0) {
          // 靠近右边界
          if (toBottom < 0) {
            // 右下角
            return {
              x: prev.left - curr.width,
              y: prev.top
            };
          } else {
            //  靠近右
            return {
              x: prev.left,
              y: prev.top + curr.height
            };
          }
        } else {
          if (toTop < 0) {
            // 上边界不靠近角
            return {
              x: prev.left + curr.width,
              y: prev.top
            };
          }

          if (toBottom < 0) {
            // 下边界不靠近角
            return {
              x: prev.left - curr.width,
              y: prev.top
            };
          }
        }
      }
    }
  }]);

  return Table;
}();

var Cell = /*#__PURE__*/function () {
  // 单个格子
  function Cell() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cell);

    var id = props.id,
        _props$type = props.type,
        type = _props$type === void 0 ? 'default' : _props$type,
        _props$width = props.width,
        width = _props$width === void 0 ? 80 : _props$width,
        _props$height = props.height,
        height = _props$height === void 0 ? 80 : _props$height,
        _props$left = props.left,
        left = _props$left === void 0 ? 0 : _props$left,
        _props$top = props.top,
        top = _props$top === void 0 ? 0 : _props$top,
        _props$isHead = props.isHead,
        isHead = _props$isHead === void 0 ? false : _props$isHead,
        _props$isLast = props.isLast,
        isLast = _props$isLast === void 0 ? false : _props$isLast,
        next = props.next;
    this.state = {
      id: id,
      type: type,
      // 类型： 普通 功能 道具
      size: {
        w: width * 10 / 750,
        h: height * 10 / 750
      },
      position: {
        center: {
          x: left,
          y: top
        },
        l: left * 10 / 750,
        t: top * 10 / 750
      },
      isHead: isHead,
      isLast: isLast,
      prev: null,
      next: next,
      "default": {
        // 普通类型格子
        style: {
          color: '',
          "class": 'normal'
        },
        price: 0,
        // 地块价格
        cost: 0,
        // 路过支付
        level: 1,
        // 等级
        owner: ''
      }
    };
  }

  _createClass(Cell, [{
    key: "init",
    value: function init() {}
  }, {
    key: "render",
    value: function render(container) {
      var cellHtml = "\n    <div\n      class=\"cell default\"\n      style=\"width:".concat(this.state.size.w, "rem;\n      height:").concat(this.state.size.h, "rem;\n      left:").concat(this.state.position.l, "rem;\n      top:").concat(this.state.position.t, "rem;\n      \"\n      id=\"").concat(this.state.id, "\"\n    >\n      <div class=\"inner\">").concat(this.state.id, "</div>\n    </div>");
      $("#".concat(container)).append(cellHtml);
    }
  }, {
    key: "setColor",
    value: function setColor() {}
  }]);

  return Cell;
}();

var Socket = /*#__PURE__*/function () {
  function Socket(_ref) {
    var username = _ref.username,
        uid = _ref.uid;

    _classCallCheck(this, Socket);

    this.socket = '';
    this.config = {
      url: location.href,
      nameSpace: '',
      room: '',
      roomId: '',
      name: username || '',
      uid: uid || ''
    };
  }

  _createClass(Socket, [{
    key: "init",
    value: function init() {
      if (!this.config.name) {
        console.log('用户名未输入');
        return;
      }

      this.socket = io({
        path: '/game',
        query: {
          name: this.config.name,
          uid: this.config.uid
        }
      });
      this.socket && this.socket.on('send_from_server', function (msg, from, roomId) {
        if (roomId) {// 发送至房间
          // let messageText = '';
          // if (!from) {
          //   alertMsg(msg, 'success');
          // } else {
          //   if (from.send_uid * 1 === _this.config.uid) messageText = `<div class="mine"><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
          //   else messageText = `<div><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
          // }
          // $('#messages').append(messageText);
          // scrollToLocation($('#messages'), 'div');
        } else {// 发送至大厅
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
      this.bindReady(); // this.bindSelectRoom();
      // this.bindLeaveRoom();
      // this.bindSendMessage();
      // this.getMessages(100000);
    }
  }, {
    key: "bindJoinRoom",
    value: function bindJoinRoom() {
      var _this8 = this;

      this.socket && this.socket.on('join_room', function (msg, params) {
        console.log('join_room');
        var _params$roomInfo = params.roomInfo,
            roomInfo = _params$roomInfo === void 0 ? {} : _params$roomInfo,
            roomId = params.roomId,
            id = params.id,
            name = params.name;

        if (name === _this8.config.name) {
          _this8.config.roomId = roomId;
          _this8.config.room = roomInfo;
          _this8.config.id = id;
          var joinParams = {
            roomId: roomId,
            id: id,
            name: name
          };

          _this8.socket.emit('joinRoom', joinParams);
        }
      });
    }
  }, {
    key: "bindReady",
    value: function bindReady() {
      var _this9 = this;

      this.socket && this.socket.on('join_ready', function (msg, params) {
        var _params$roomInfo2 = params.roomInfo,
            roomInfo = _params$roomInfo2 === void 0 ? {} : _params$roomInfo2,
            roomId = params.roomId,
            id = params.id,
            name = params.name;
        if (_this9.config.roomId !== roomId) return;
        var gameParams = {
          userList: roomInfo.config.userList,
          playerList: roomInfo.player.list
        };

        _this9.renderStart(roomInfo.player.list); // if (!this.main) {
        //   this.main = new Main(gameParams);
        //   this.main.init();
        // }

      });
    }
  }, {
    key: "renderStart",
    value: function renderStart(playerList) {
      var _this$config3 = this.config,
          name = _this$config3.name,
          uid = _this$config3.uid;
      console.log('我得名字：' + name);
      var tGameHtml = '<div class="players-con" id="player-con">';

      var _this = this;

      Object.keys(playerList).forEach(function (key) {
        if (playerList[key].state.name === name) {
          tGameHtml += "<p id=\"".concat(playerList[key].state.id, "\">").concat(playerList[key].state.team, "\u961F\uFF1A\u6211</p>");
        } else {
          tGameHtml += "<p id=\"".concat(playerList[key].state.id, "\">").concat(playerList[key].state.team, "\u961F\uFF1A").concat(playerList[key].state.name, "</p>");
        }
      });
      tGameHtml += '<div id="ready-btn" class="btn ready"> 准备 </div></div>';
      $('body').append(tGameHtml);
      this.bindGameReady();
      $('body').on('click', '#ready-btn', function () {
        console.log('click');
        var readyParams = {
          action: 'game_ready',
          roomId: _this.config.roomId,
          uid: _this.config.uid,
          id: _this.config.id,
          name: _this.config.name
        };

        _this.socket.emit('gameReady', readyParams);
      });
    }
  }, {
    key: "bindGameReady",
    value: function bindGameReady() {
      var _this10 = this;

      this.socket && this.socket.on('game_ready', function (msg, params) {
        console.log('game_ready');
        var _params$roomInfo3 = params.roomInfo,
            roomInfo = _params$roomInfo3 === void 0 ? {} : _params$roomInfo3,
            roomId = params.roomId,
            id = params.id,
            name = params.name;
        if (_this10.config.roomId !== roomId) return;
        $("#".concat(id)).css('color', 'green').append('已准备');

        if (_this10.config.name === name) {
          $('#ready-btn').remove();
        }

        _this10.bindGameStart(); // if (!this.main) {
        //   this.main = new Main(gameParams);
        //   this.main.init();
        // }

      });
    }
  }, {
    key: "bindGameStart",
    value: function bindGameStart() {
      var _this11 = this;

      this.socket && this.socket.on('game_start', function (msg, params) {
        if (!_this11.main) {
          alert(msg);
          console.log(params);
          var gameParams = {
            userList: params.roomInfo.config.userList,
            playerList: params.roomInfo.player.list,
            roomId: params.roomId,
            gameState: params.gameState,
            id: _this11.config.id,
            name: _this11.config.name,
            socket: _this11.socket
          };
          _this11.main = new Main(gameParams);

          _this11.main.init();

          _this11.bindRollEvents();
        }
      });
    }
  }, {
    key: "bindRollEvents",
    value: function bindRollEvents() {
      var _this12 = this;

      this.socket && this.socket.on('send_steps', function (params) {
        console.log('params');
        var id = params.id,
            steps = params.steps;

        if (id === _this12.config.id) {
          _this12.main.player.list[id].moveStep(steps);
        }
      });
    }
  }, {
    key: "bindSelectRoom",
    value: function bindSelectRoom() {
      var _this = this;

      $('#rooms').find('li').each(function (index, el) {
        $(el).on('click', function (e) {
          _this.config.room && _this.socket.emit('leaveRoom', _this.config.roomId);
          _this.config.room = $(el).data('room');
          _this.config.roomId = $(el).data('roomid');
          $('#roomInfo').show();
          $('#currentRoom').html(_this.config.room);

          _this.socket.emit('joinRoom', _this.config.roomId);

          $('#publicRes').hide();
          $('#messages').show();

          _this.getMessages(_this.config.roomId);
        });
      });
    }
  }, {
    key: "bindLeaveRoom",
    value: function bindLeaveRoom() {
      var _this = this;

      $('#leaveBtn').on('click', function () {
        if (!_this.config.roomId) return;

        _this.socket.emit('leaveRoom', _this.config.roomId, _this.config.uid);

        $('#currentRoom').empty();
        $('#roomInfo').hide();
        $('#messages').hide();
        $('#publicRes').show();

        _this.getMessages(100000);

        _this.config.room = '';
        _this.config.roomId = '';
      });
    }
  }, {
    key: "getMessages",
    value: function getMessages(roomId) {
      var _this = this;

      $('#messages').empty();
      roomId === 100000 && $('#publicRes').find('div').remove();
      Api.post('/api/getMessages', {
        roomId: roomId
      }, function (res, err) {
        if (res.code === -1) {
          console.log('获取信息失败');
          return;
        }

        if (roomId === 100000) {
          // 大厅消息
          res.data.length && res.data.forEach(function (item) {
            var tMessage = '';
            if (_this.config.uid === item.send_uid) tMessage = "<div class=\"mine\"><div class=\"header\">".concat(item.send_name, "</div><span>").concat(item.msg, "( ").concat(item.send_time, " )</span></div>");else tMessage = "<div><div class=\"header\">".concat(item.send_name, "</div><span>").concat(item.msg, "( ").concat(item.send_time, " )</span></div>");
            $('#publicRes').append(tMessage);
          });
          $('#publicRes').append("<div class=\"public\"><span><--------\u2191\u2191 \u5386\u53F2\u6D88\u606F \u2191\u2191-------></span></div>");
          $('#publicRes').height($(window).height() - 240);
          scrollToLocation($('#publicRes'), 'div');
        } else {
          // 房间消息
          res.data.length && res.data.forEach(function (item) {
            var tMessage = '';
            if (_this.config.uid === item.send_uid) tMessage = "<div class=\"mine\"><div class=\"header\">".concat(item.send_name, "</div><span>").concat(item.msg, "( ").concat(item.send_time, " )</span></div>");else tMessage = "<div><div class=\"header\">".concat(item.send_name, "</div><span>").concat(item.msg, "( ").concat(item.send_time, " )</span></div>");
            $('#messages').append(tMessage);
          });
          $('#messages').append("<div class=\"public\"><span><--------\u2191\u2191 \u5386\u53F2\u6D88\u606F \u2191\u2191-------></span></div>");
          $('#messages').height($(window).height() - 240);
          scrollToLocation($('#messages'), 'div');
        }
      });
    }
  }, {
    key: "bindSendMessage",
    value: function bindSendMessage() {
      var _this = this;

      $('form').submit(function (e) {
        var submitMsg = $('#m').val();
        if (!submitMsg) return;
        e.preventDefault();
        if (_this.config.room) _this.socket.emit('send_from_client', _this.config.room, _this.config.roomId, submitMsg);else _this.socket.emit('send_from_client', '', '', submitMsg);
        $('#m').val('');
        return false;
      });
    }
  }]);

  return Socket;
}();

var getUserInfo = function getUserInfo(cb) {
  Api.post('/api/getUserInfo', {
    token: getCookie('token')
  }, function (res, err) {
    if ([-1, -2, -9].indexOf(res.code) !== -1) location.href = "".concat(Api.host, "/login.html");
    if (res.code === 0) cb(res.data);
  });
};

$(function () {
  // const params = {
  //   userList: [ { id: '1111', name: '小杨' } ],
  // }
  getUserInfo(function (data) {
    var tSocket = new Socket({
      username: data.username,
      uid: data.uid
    });
    tSocket.init();
  });
});
//# sourceMappingURL=game_main.js.map
