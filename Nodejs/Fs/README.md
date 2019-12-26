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
---|:----------------------------------------:
r|以读取模式打开文件,不存在抛出异常
r+|以读写模式打开文件~~~
rs|以同步方式读取文件
rs+|以同步的方式读写文件
w|以写入模式打开文件，如果文件不存在则创建
wx|类似'w'，但是如果文件路径存在，则文件写入失败
w+|以读写方式打开文件，如果文件不存在则创建
wx+|类似'w+'，但是如果文件路径存在，则文件读写失败
a|以追加模式打开文件，如果文件不存在则创建
ax|类似'a'，但是如果文件路劲存在，则文件追加失败
a+|以读取追加模式打开文件，如果文件不存在则创建
ax+|类似'a+',但是如果文件路径存在，则文件读取追加失败

### 获取文件信息
#### 语法
`fs.stat(path, callback)`
#### 参数
- `path` 文件路径
- `callback` 回调函数，callback(err, stats) stats 是fs.stats对象
方法|描
---|:---:
stats.isFile()|如果是文件返回true，否则false
stats.isDirectory()|如果是目录返回true，否则false
stats.isBlockDevice()|如果是块设备返回true，否则false
stats.isCharacterDevice()|如果是字符设备返回true，否则false
stats.isSymbolicLink()|如果是软连接返回true，否则false
stats.isFIFO()|如果是FIFO，返回true，否则false
stats.isSocket()|如果是Socket返回true，否则false

### 写入文件
#### 语法
`fs.writeFile(file, data[, options], callback)`
默认是'w'模式
#### 参数
- `file` 文件名
- `data` 要写入的文件数据，可以使String或者Buffer
- `options` 对象，包含{encoding, mode, flag} 默认编码utf8
- `callback` 回调

### 读取文件
#### 语法
`fs.read(fd, buffer, offset, length, position, callback)`
#### 参数
- `fd` 文件描述符
- `buffer` 数据写入缓冲区
- `offset` 缓冲区写入的写入偏移量
- `length` 要从文件中读取的字节数
- `position` 文件读取的其实位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
- `callback` callback(err, bytesRead, buffer) bytesRead 表示读取字节数

### 关闭文件
#### 语法
`fs.close(fd, callback)`
#### 参数
- `fd` 通过fs.open()返回文件描述符
- `callback` 回调函数，没有参数

### 截取文件
#### 语法
`fs.ftruncate(fd, len, callback)`
#### 参数
- `fd` 通过fs.open()方法返回的文件描述符
- `len` 文件内容截取的长度
- `callback` 回调函数，没有参数

### 删除文件
#### 语法
`fs.unlink(path, callback)`
#### 参数
- `path` 文件路径
- `callback` 回调函数没有参数

### 创建目录
#### 语法
`fs.mkdir(path [, options], callback)`
#### 参数
- `path` 文件路径
- `options`
-- `recursive` 是否以递归方式创建目录，默认false
-- `mode` 设置目录权限，默认0777
- `callback` 回调函数没有参数

### 读取目录
#### 语法
`fs.readdir(path, callback)`
#### 参数
- `path` 文件路径
- `callback` 回调函数，callback(err, files) files 为目录下的文件数组列表

### 删除目录
#### 语法
`fs.rmdir(path, callback)`
#### 参数
- `path` 文件路径
- `callback` 回调函数，没有参数






