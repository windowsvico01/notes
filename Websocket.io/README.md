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


