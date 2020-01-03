## GET
### 获取GET请求内容
- url.parse()
```javascript
  var http = require('http');
  var utl = require('url');
  var util = require('util');

  http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(util.inspect(url.parse(req.url, true))); // inspect obj转为字符串
  }).listen(3000);
```

### 获取URL参数
```javascript
  var http = require('http');
  var utl = require('url');
  var util = require('util');
  http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
  }).listen(3000);
```

## POST
```javascript

var http = require('http');
var querystring = require('querystring');
var util = require('util');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);

```