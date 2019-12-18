### Node.js模块系统

#### 创建模块
```javascript
/** main.js */
var hello = require('./hello');
hello.world();
/** hello.js */
// exports.world = function() {
//   console.log('hello world');
// }
function Hello() {
  var name;
  this.setName = function(tName) {
    name = tName;
  }
  this.sayHello = function() {
    console.log('hello' + name);
  };
};
module.exports = Hello;
```

#### 从文件模块缓存中加载
尽管原生模块与文件模块的优先级不同，但是都会优先从文件模块的缓存中加载已经存在的模块。
#### 从原生模块加载
原生模块的优先级仅次于文件模块缓存的优先级。
#### 从文件加载
当文件模块缓存中不存在，而且不是原生模块的时候，Node.js 会解析 require 方法传入的参数，并从文件系统中加载实际的文件

***exports 和 module.exports 的使用***
***如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。***