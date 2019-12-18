/** 从流中读取数据 */
// var fs = require('fs');
// var data = '';
// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');
// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');

// readerStream.on('data', function(chunk) {
//   data += chunk;
// });

// readerStream.on('end', function() {
//   console.log(data);
// });

// readerStream.on('error', function(err) {
//   console.log(err);
// });

// console.log('finish');
/** 写入流 */
// var fs = require('fs');
// var data = '我是你爷爷';

// var writerStream = fs.createWriteStream('output.txt');

// writerStream.write(data, 'UTF8');

// writerStream.end('end');

// writerStream.on('finish', function() {
//   console.log('写入完成');
// });

// writerStream.on('error', function(err) {
//   console.log(err);
// });

// console.log('finish');
/** 管道流 */
// var fs = require('fs');
// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt');
// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');
// // 管道读写
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);
// console.log('finish');


