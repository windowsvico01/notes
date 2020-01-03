const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const pathName = url.parse(req.url).pathname;
  console.log('请求文件路径 '+ pathName);
  fs.readFile(pathName.substr(1), (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data.toString());       
    }
    res.end();
  })
}).listen(8099);