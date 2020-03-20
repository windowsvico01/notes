class Index {
  constructor() {
    this.userInfo = {};
  }
  init() {
    this.getUserInfo((data) => {
      console.log(data);
      const tRoom = new Room({ username: data.username, uid: data.uid });
      tRoom.init();
    });
  }
  getUserInfo(cb) {
    Api.post('/api/getUserInfo', {token: getCookie('token')}, (res, err) => {
      console.log(res);
      console.log(err);
      if ([-1, -2].indexOf(res.code) !== -1) location.href = `${Api.host}/login.html`;
      if (res.code === 0) cb(res.data);
    })
  }
}
const getCookie = (name) => {
  var start = document.cookie.indexOf(name + "="); //得到cookie字符串中的名称
  var len = start + name.length + 1; //得到从起始位置到结束cookie位置的长度
  //如果起始没有值且name不存在于cookie字符串中，则返回null
  if ((!start) && (name != document.cookie.substring(0, name.length))) {
      return null;
  }
  if (start == -1) return null; //如果起始位置为-1也为null
  var end = document.cookie.indexOf(';', len); //获取cookie尾部位置
  if (end == -1) end = document.cookie.length; //计算cookie尾部长度
  return unescape(document.cookie.substring(len, end)); //获取cookie值
}
class Room {
  constructor({ username, uid }) {
    this.rooms = [];
    this.uid = uid;
    this.createUid = uid;
    this.username = username;
  }
  init() {
    const tSocket = new Socket({ username: this.username, uid: this.uid });
    console.log(tSocket);
    this.renderRoomList(() => {
      tSocket.init();
    })
    this.bindCreateRoom(() => {
      tSocket.bindSelectRoom();
    })
  }
  renderRoomList(cb) {
    $('#rooms').find('li').remove();
    this.getRooms({}, (data) => {
      if (data.length) {
        data.forEach((item) => {
          $('#rooms').append(`<li class="btn btn-warning mr-1" data-roomid="${item.id}" data-room="${item.name}">${item.name}</li>`);
        })
        cb();
      }
    });
  }
  bindCreateRoom(cb) {
    const _this = this;
    $('#addRoomBtn').on('click', () => {
      $('#addRoomModal').fadeIn();
      $('#createRoom').on('click', () => {
        const tName = $('#roomName').val();
        if (!tName) return;
        _this.createRoom({ roomName: tName, createUid: _this.createUid }, () => {
          $('#roomName').val('');
          $('#addRoomModal').fadeOut();
          _this.renderRoomList(cb);
        })
      })
      $('#cancelCreate').on('click', () => {
        $('#roomName').val('');
        $('#addRoomModal').fadeOut();
      })
    })
    
  }
  getRooms(params, cb) {
    Api.post('/api/getRooms', params, (res, err) => {
      if (res.code !== 0) {
        console.log('失败'+ err.msg);
        return
      }
      cb(res.data);
    })
  }
  createRoom(params, cb) {
    const _this = this;
    Api.post('/api/createRoom', params, (res, err) => {
      if (res.code !== 0) {
        console.log('失败'+ err.msg);
        return
      }
      const tRes = res;
      _this.getRooms({}, () => {
        cb(tRes);
      })
    })
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
    const _this = this;
    if (!this.config.name) {
      console.log('用户名未输入');
      return;
    }
    this.socket = io({
      path: '/test',
      query: {
        name: this.config.name,
        uid: this.config.uid,
      }
    });
    this.socket && this.socket.on('send_from_server', function(msg, from, roomId){
      if (roomId) { // 发送至房间
        let messageText = '';
        if (!from) {
          alertMsg(msg, 'success');
        } else {
          if (from.send_uid * 1 === _this.config.uid) messageText = `<div class="mine"><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
          else messageText = `<div><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
        }
        $('#messages').append(messageText);
        scrollToLocation($('#messages'), 'div');
      } else { // 发送至大厅
        let messageText = '';
        if (!from) {
          alertMsg(msg, 'success');
        } else {
          if (from.send_uid * 1 === _this.config.uid) messageText = `<div class="mine"><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
          else messageText = `<div><div class="header">${from.send_name}</div><span>${msg}</span></div>`;
        }
        $('#publicRes').append(messageText);
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
const scrollToLocation = (parent, target) => {
  const scrollToContainer = parent.find(`${target}:last`);
  parent.height($(window).height() - 240);
  const scrollToContainerTop = scrollToContainer.offset() ? scrollToContainer.offset().top : 0;
  const parentTop = parent.offset() ? parent.offset().top : 0;
  parent.animate({
    scrollTop: scrollToContainerTop - parentTop + parent.scrollTop()
  }, 800);
}
$(function(){
  const tIndex = new Index();
  tIndex.init();
})