"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Index = /*#__PURE__*/function () {
  function Index() {
    _classCallCheck(this, Index);

    this.userInfo = {};
  }

  _createClass(Index, [{
    key: "init",
    value: function init() {
      this.getUserInfo(function (data) {
        console.log(data);
        var tRoom = new Room({
          username: data.username,
          uid: data.uid
        });
        tRoom.init();
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(cb) {
      Api.post('/api/getUserInfo', {
        token: getCookie('token')
      }, function (res, err) {
        if ([-1, -2, -9].indexOf(res.code) !== -1) location.href = "".concat(Api.host, "/login.html");
        if (res.code === 0) cb(res.data);
      });
    }
  }]);

  return Index;
}();

var getCookie = function getCookie(name) {
  var start = document.cookie.indexOf(name + "="); //得到cookie字符串中的名称

  var len = start + name.length + 1; //得到从起始位置到结束cookie位置的长度
  //如果起始没有值且name不存在于cookie字符串中，则返回null

  if (!start && name != document.cookie.substring(0, name.length)) {
    return null;
  }

  if (start == -1) return null; //如果起始位置为-1也为null

  var end = document.cookie.indexOf(';', len); //获取cookie尾部位置

  if (end == -1) end = document.cookie.length; //计算cookie尾部长度

  return unescape(document.cookie.substring(len, end)); //获取cookie值
};

var Room = /*#__PURE__*/function () {
  function Room(_ref) {
    var username = _ref.username,
        uid = _ref.uid;

    _classCallCheck(this, Room);

    this.rooms = [];
    this.uid = uid;
    this.createUid = uid;
    this.username = username;
  }

  _createClass(Room, [{
    key: "init",
    value: function init() {
      var tSocket = new Socket({
        username: this.username,
        uid: this.uid
      });
      console.log(tSocket);
      this.renderRoomList(function () {
        tSocket.init();
      });
      this.bindCreateRoom(function () {
        tSocket.bindSelectRoom();
      });
    }
  }, {
    key: "renderRoomList",
    value: function renderRoomList(cb) {
      $('#rooms').find('li').remove();
      this.getRooms({}, function (data) {
        if (data.length) {
          data.forEach(function (item) {
            $('#rooms').append("<li class=\"btn btn-warning mr-1\" data-roomid=\"".concat(item.id, "\" data-room=\"").concat(item.name, "\">").concat(item.name, "</li>"));
          });
          cb();
        }
      });
    }
  }, {
    key: "bindCreateRoom",
    value: function bindCreateRoom(cb) {
      var _this = this;

      $('#addRoomBtn').on('click', function () {
        $('#addRoomModal').fadeIn();
        $('#createRoom').on('click', function () {
          var tName = $('#roomName').val();
          if (!tName) return;

          _this.createRoom({
            roomName: tName,
            createUid: _this.createUid
          }, function () {
            $('#roomName').val('');
            $('#addRoomModal').fadeOut();

            _this.renderRoomList(cb);
          });
        });
        $('#cancelCreate').on('click', function () {
          $('#roomName').val('');
          $('#addRoomModal').fadeOut();
        });
      });
    }
  }, {
    key: "getRooms",
    value: function getRooms(params, cb) {
      Api.post('/api/getRooms', params, function (res, err) {
        if (res.code !== 0) {
          console.log('失败' + err.msg);
          return;
        }

        cb(res.data);
      });
    }
  }, {
    key: "createRoom",
    value: function createRoom(params, cb) {
      var _this = this;

      Api.post('/api/createRoom', params, function (res, err) {
        if (res.code !== 0) {
          console.log('失败' + err.msg);
          return;
        }

        var tRes = res;

        _this.getRooms({}, function () {
          cb(tRes);
        });
      });
    }
  }]);

  return Room;
}();

var Socket = /*#__PURE__*/function () {
  function Socket(_ref2) {
    var username = _ref2.username,
        uid = _ref2.uid;

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
      var _this = this;

      if (!this.config.name) {
        console.log('用户名未输入');
        return;
      }

      this.socket = io({
        path: '/test',
        query: {
          name: this.config.name,
          uid: this.config.uid
        }
      });
      this.socket && this.socket.on('send_from_server', function (msg, from, roomId) {
        if (roomId) {
          // 发送至房间
          var messageText = '';

          if (!from) {
            alertMsg(msg, 'success');
          } else {
            if (from.send_uid * 1 === _this.config.uid) messageText = "<div class=\"mine\"><div class=\"header\">".concat(from.send_name, "</div><span>").concat(msg, "</span></div>");else messageText = "<div><div class=\"header\">".concat(from.send_name, "</div><span>").concat(msg, "</span></div>");
          }

          $('#messages').append(messageText);
          scrollToLocation($('#messages'), 'div');
        } else {
          // 发送至大厅
          var _messageText = '';

          if (!from) {
            alertMsg(msg, 'success');
          } else {
            if (from.send_uid * 1 === _this.config.uid) _messageText = "<div class=\"mine\"><div class=\"header\">".concat(from.send_name, "</div><span>").concat(msg, "</span></div>");else _messageText = "<div><div class=\"header\">".concat(from.send_name, "</div><span>").concat(msg, "</span></div>");
          }

          $('#publicRes').append(_messageText);
          scrollToLocation($('#publicRes'), 'div');
        }
      });
      this.socket && this.socket.on('error', function (data) {
        console.log(data || 'error');
      });
      this.bindSelectRoom();
      this.bindLeaveRoom();
      this.bindSendMessage();
      this.getMessages(100000);
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

var scrollToLocation = function scrollToLocation(parent, target) {
  var scrollToContainer = parent.find("".concat(target, ":last"));
  parent.height($(window).height() - 240);
  var scrollToContainerTop = scrollToContainer.offset() ? scrollToContainer.offset().top : 0;
  var parentTop = parent.offset() ? parent.offset().top : 0;
  parent.animate({
    scrollTop: scrollToContainerTop - parentTop + parent.scrollTop()
  }, 800);
};

$(function () {
  var tIndex = new Index();
  tIndex.init();
});
//# sourceMappingURL=index.js.map
