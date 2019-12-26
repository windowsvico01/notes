## 全局变量
#### 全局变量
- 在最外层定义的变量
- 全局对象的属性
- 隐式定义的变量
- 当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。

### __filename
是当前正在执行的脚本的文件名：输出文件所在位置的绝对路径

### __dirname
表示当前执行脚本所在的目录。

### setTimeout(callback, ms)

### clearTimeout(t)

### setInterval(callback, ms)

### process
描述当前Node.js进程状态的对象
- exit : 当进程准备推出时触发
- beforeExit : 当node清空时间循环，并且没有其他安排时候触发
- uncaughtException: 当一个异常冒泡到时间循环，触发这个事件
- Signal: 当进程收到信息时就触发
