### Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

### events 模块只提供了一个对象： events.EventEmitter。
  EventEmitter 的核心就是事件触发与事件监听器功能的封装。
  ```javascript
    // 引入 events 模块
    var events = require('events');
    // 创建 eventEmitter 对象
    var eventEmitter = new events.EventEmitter();
  ```