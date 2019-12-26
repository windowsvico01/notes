## Node.js 文件系统
```javascript
  var fs = require('fs');
```

### 同步和异步
模块中方法均有同步和异步的版本。
同步：fs.readFileSync();
异步：fs.readFile();

### 打开文件
#### 语法
`fs.open(path, flags[, mode], callback)`
#### 参数
- `path` 文件路径
- `flags` 文件打开的行为
- `mode` 设置文件模式（权限），（可读写）
- `callback` 回调函数，callback(err, fd);

Flag|描述
---|---:
r|以读取模式打开文件