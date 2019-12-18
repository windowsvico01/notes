### Stream(流)

####Node.js，Stream 有四种流类型：
- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。
####所有的 Stream 对象都是 EventEmitter 的实例。

#### 读取流
- fs.createReadStream
#### 写入流
- fs.createWriteStream
#### 管道流
- pipe
- 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
#### 链式流
- pipe
- 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
```javascript
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");
```