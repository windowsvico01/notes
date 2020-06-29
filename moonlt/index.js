const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const multipart = require('connect-multiparty');


const api = require('./api/index.js');
const user = require('./api/user.js');
const content = require('./api/content.js');
const db = require('./api/db.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const GameLobby = require('./api/game.js');
app.use(cors());
app.use(cookieParser('123456'));
app.use(urlencodedParser);
app.use(multipart());
app.use('/public', express.static('public'));
app.use('/', express.static('public/page'));
app.use(['/admin', '/admin/*'], express.static('backstage/build/index.html'));
app.use('/static', express.static('backstage/build/static'));
app.use('/api', api);
app.use('/user', user);
app.use('/content', content);
// app.use((req, res) => {
//   // 执行static没有找到对应的资源文件（404）
//   res.status(404);
//   res.send('NOT FOUND');
// })
// 游戏初始化
const game = new GameLobby({ server });
game.initSocket();
const chatInfo = {
  users: [
    // { name: '', id: '' },
  ]
}
const io = require('socket.io')({
  path: '/test',
  serveClient: true,
});
const isValid = (token) => {
  const tokens = ['vico', 'vico001', '123333'];
  if (tokens.indexOf(token) !== -1) return true;
  else return false;
}

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/page/index.html');
    // res.sendFile(__dirname + '/backstage/build/index.html');
});
app.get('/ca/*',  function(req, res) {
  res.sendFile(__dirname + '/public/page/index.html');
});
app.get('/detail/*',  function(req, res) {
  res.sendFile(__dirname + '/public/page/detail.html');
});
app.get('/admin/*', function(req, res) {
  res.sendFile(__dirname + '/backstage/build/index.html');
});
io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

// middleware 中间件
// io.use((socket, next) => {
//   let token = socket.handshake.query.name;
//   if (isValid(token)) {
//     return next();
//   }
//   return next(new Error('authentication error'));
// });

io.on('connection', function(socket) {
    // const newNamespace = socket.nsp.name; 
    // 监测当前在线用户
    if (!chatInfo.users.filter((e) => e.name == socket.handshake.query.name).length) {
      chatInfo.users.push({
        name: socket.handshake.query.name,
        id: socket.id,
      });
    }
    io.emit('send_from_server', socket.handshake.query.name +'来啦');
    socket.on('disconnect', function(data){
      console.log(socket.handshake.query);
      console.log('用户断开');
    });
    socket.on('send_from_client', function(room, roomId, msg){     
      if (room) {
        // console.log('发送到room：' + room + '的消息：' + msg);
        saveMsg(roomId, { msg, sendName: socket.handshake.query.name, sendUid: socket.handshake.query.uid }, () => {
          io.to(roomId).emit('send_from_server', msg, { send_name: socket.handshake.query.name, send_uid: socket.handshake.query.uid }, roomId);
        })
      } else {
        // console.log(socket.handshake.query.name + '发送到大厅的消息：' + msg);
        saveMsg(100000, { msg, sendName: socket.handshake.query.name, sendUid: socket.handshake.query.uid }, () => {
          io.emit('send_from_server', msg, { send_name: socket.handshake.query.name, send_uid: socket.handshake.query.uid });
        })
      }
    });
    socket.on('joinRoom', function(roomId) {
      socket.join(roomId, function(){
        let rooms = Object.keys(socket.rooms);
        io.to(roomId).emit('send_from_server', socket.handshake.query.name +'来啦', '', roomId);
        // console.log(rooms); // [ <socket.id>, 'room 237' ]
      })
    });
    socket.on('leaveRoom', function(roomId, uid) {
      socket.leave(roomId, function(){
        let rooms = Object.keys(socket.rooms);
        // console.log(rooms); // [ <socket.id>, 'room 237' ]
      })
    });
})
// 存储消息
saveMsg = (room, params, cb) => {
  const tTarget = room || 100000;
  const { msg, sendName, sendUid } = params;
  const addSql = 'INSERT INTO record(id, msg, target, send_name, send_uid, send_time) VALUES(0,?,?,?,?,?)';
  const addSqlParams = [msg, tTarget, sendName, sendUid,moment().format('YYYY-MM-DD HH:mm:ss')];
  db.query(addSql, addSqlParams, (err) => {
    if (err) {
      console.log(err);
      return;
    };
    cb();
  })
}
server.setTimeout(600*1000);
server.listen(8080, function() {
    console.log('正在监听8080端口');
})