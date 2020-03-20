## Socket.io 
Socket.IO是一个库，它支持浏览器和服务器之间的实时、双向和基于事件的通信。它包括：
... 一个Nodejs 服务器
... 一个js前端

### 可靠性
即使在以下情况也能建立连接：
. 代理和负载均衡
. 个人防火墙和防病毒软件
为此，它依赖Engine.IO ,首先建立长轮询连接，然后尝试升级到更好的传输，比如websocket。
### 支持
可以发出任何可序列话的数据结构，包括:
浏览器中的ArrayBuffer和Blob（二进制大对象，比如声音文件等）
Node.js中的ArrayBuffer和Buffer
### Multiplexing support 多路复用
为了在应用程序中创建关注点的分离（例如每个模块或者权限），Socket.IO允许创建多个命名空间，这些namespaces将冲淡单独的通信通道，但将共享基础连接
### 支持Room
每个Namespace都可以定义任意的可以进出的频道（房间room），你可以广播到任何给定的房间，到每个连接它的socket
可以将通知发送给一组用户，或者发送给连接在多个设备上的指定用户
这些功能附带一个简单方便的API，如下所示：
```javascript
  io.on('connection', function(socket){
    socket.emit('request', /* */); // 发送事件
    io.emit('broadcast', /* */); // 给所有人发送
    socket.on('reply', function(){ /* */ }); // 监听事件‘replay’
  });

```
## Using with Node http server
### Server (app.js)
```javascript
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```
### Client (index.html)
```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>
```
## Using with Express
### Server (app.js)
```javascript
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```
### Client (index.html)
```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>
```


[Namespaces](https://socket.io/docs/rooms-and-namespaces/)
对于降低资源（TCP连接）有用
### Default namespace
默认命名空间'/',是默认连接的socket.io 客户端，默认监听
```javascript
// the following two will emit to all the sockets connected to `/`
io.sockets.emit('hi', 'everyone');
io.emit('hi', 'everyone'); // short form
```
每个命名空间都会发送一个连接事件，它接受一个socket参数
```javascript
io.on('connection', function(socket){
  socket.on('disconnect', function(){ });
});
```
### Custom namespaces 自定义命名空间
可以在服务端调用of函数设置一个命名空间
```javascript
  const nsp = io.of('/my-namespace');
  nsp.on('connection', function(socket){
  console.log('someone connected');
  });
  nsp.emit('hi', 'everyone!');
```
在客户端，你需要告诉socket.io你连接了哪个命名空间
```javascript
  const socket = io('/my-namespace');
```
` Tips:  namespace 是socket.io协议的一个实现细节，与底层实际传输的url没有关系，候着默认为/Socket.IO/...`
### Rooms
#### Joining and leaving
可以加入join一个指定的频道去接收socket
```javascript
  io.on('connection', function(socket){
    socket.join('some room');
  });
```
调用`to`或者`in`(一样的)来广播
```javascript
  io.to('some room').emit('some event');
```
可以和jion一样leave，他们都接收一个callback回调
#### Default room
每个socket都是又一个随机的，不可访问的，唯一的标识符 `Socket#id`标识。为了方便，每个socket都会自动加入一个由这个id来标识的房间
这使得给其他socket发送广播简单
```javascript
io.on('connection', function(socket){
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });
});
```
## 发送和接收事件
### server
```javascript
// note, io(<port>) will create a http server for you
var io = require('socket.io')(80);

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
```
## 限制自己使用namespace
如果您可以控制为特定应用程序发出的所有消息和事件，那么使用default/namespace是可行的。
如果您想利用第三方代码，或者生成代码与其他人共享，socket.io提供了一种对socket进行命名空间的方法。
这有复用单个连接的好处。它将使用一个，而不是使用两个WebSocket连接的socket.io。
### Server (app.js)
```javascript
var io = require('socket.io')(80);
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
```
### Client (index.html)
```javascript
<script>
  var chat = io.connect('http://localhost/chat')
    , news = io.connect('http://localhost/news');
  
  chat.on('connect', function () {
    chat.emit('hi!');
  });
  
  news.on('news', function () {
    news.emit('woot');
  });
</script>
```
## 发送易失性消息
有时某些消息可以被删除。假设你有一个应用程序，显示关键字bieber的实时tweets。
如果某个客户端没有准备好接收消息（因为网络速度慢或其他问题，或者因为它们是通过长轮询连接的，并且正处于请求-响应周期的中间），如果它没有接收到与bieber相关的所有tweets，那么您的应用程序将不会受到影响。
在这种情况下，您可能希望将这些消息作为易失性消息发送。
### Server
```javascript
var io = require('socket.io')(80);
io.on('connection', function (socket) {
  var tweets = setInterval(function () {
    getBieberTweet(function (tweet) {
      socket.volatile.emit('bieber tweet', tweet);
    });
  }, 100);
  socket.on('disconnect', function () {
    clearInterval(tweets);
  });
});
```
## 发送和获取数据（确认）
有时，当客户机确认消息接收时，您可能希望得到回调。
为此，只需传递一个函数作为.send或.emit的最后一个参数。此外，当您使用.emit时，确认由您完成，这意味着您还可以传递数据：
### Server (app.js)
```javascript
var io = require('socket.io')(80);
io.on('connection', function (socket) {
  socket.on('ferret', function (name, word, fn) {
    fn(name + ' says ' + word);
  });
});
```
### Client (index.html)
```javascript
<script>
  var socket = io(); // TIP: io() with no args does auto-discovery
  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', 'tobi', 'woot', function (data) { // args are sent in order to acknowledgement function
      console.log(data); // data will be 'tobi says woot'
    });
  });
</script>
```
## 广播消息
要广播，只需添加一个广播标志来发出和发送方法调用。广播意味着向除启动它的socket之外的所有其他人发送消息。
```javascript
var io = require('socket.io')(80);
io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');
});
```
## 把它当作一个跨浏览器的WebSocket
如果您只需要WebSocket语义，也可以这样做。只需利用消息事件的发送和侦听：
### Server (app.js)
```javascript
var io = require('socket.io')(80);
io.on('connection', function (socket) {
  socket.on('message', function () { });
  socket.on('disconnect', function () { });
});

```
### Client (index.html)
```javascript
<script>
  var socket = io('http://localhost/');
  socket.on('connect', function () {
    socket.send('hi');

    socket.on('message', function (msg) {
      // my msg
    });
  });
</script>
```
##
```javascript
io.on('connect', onConnect);
function onConnect(socket){
  // 发送消息到客户端
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
  // 发送给出了发送人的其他人
  socket.broadcast.emit('broadcast', 'hello friends!');
  // 发送给game房间里的所有人
  socket.to('game').emit('nice game', "let's play a game");
  // 发送给game1或者game2里出了发送者的所哟人
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");
  // 发送给房间里包括发送者在内的所哟人
  io.in('game').emit('big-announcement', 'the game will start soon');
  // 发送给namesapce为‘myNamespace’的所有人包括发送者
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');
  // 发送给myNamespace下room房间内的所有人包括发送者
  io.of('myNamespace').to('room').emit('event', 'message');
  // 给单独一个id发送消息
  io.to(`${socketId}`).emit('hey', 'I just met you');
  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.
  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});
  // sending without compression（压缩）
  socket.compress(false).emit('uncompressed', "that's rough");
  // 发送消息，如果客户端未准备好接收消息，则可能会删除该消息
  socket.volatile.emit('maybe', 'do you really need it?');
  // 指定要发送的数据是否具有二进制数据
  socket.binary(false).emit('what', 'I have no binaries!');
  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');
  // sending to all connected clients
  io.emit('an event sent to all connected clients');
};
```
#### Disconnection
断开连接后，socket会部分自动离开所有通道，不需要特别断开；
### 从外部发送信息
有时候，你可能想从Socket.IO进程外向Socket.IO的namespaces或者rooms发送消息
有几种方法可以解决这个问题，比如实现自己的通道将消息发送到进程中
为了简化这个案例，我们创建了两个模块:
`socket.io-redis`
`socket.io-emitter`
可以实现Redis Adapter：
```javascript
const io = require('socket.io')(3000);
const redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
```
你可以从其他进程或者频道发送消息
```javascript
const io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
setInterval(function(){
  io.emit('time', new Date);
}, 5000);
```


