## Express 核心功能
- 设置中间件来相应http请求
- 定义路由表，执行不同的http动作
- 通过向模板传递参数来动态渲染HTML页面

### 其他模块
- `body-parser` node.js 中间件，用于出来JSON，Raw，Text，Url编码的数据
- `cookie-parser` 解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
- `multer` node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

### 请求和相应
Express 应用使用回调函数的参数：request 和 response 对象来处理和响应的数据
```javascript
  app.get('/', function(req, res){
      //----
  })
```

### 静态文件
- Express 提供了内置中间件express.static来设置静态文件, 图片，css，js 等
```javascript
  app.use('/public', express.static('public'));
```

### GET 方法
- 获取参数 req.query.[key]
### POST
- 获取参数 req.body.[key]

------------------------------
## RESTful API
- GET
- PUT 更新活添加数据
- DELETE 删除数据
- POST 添加数据
