## Node.js常用工具
```javascript
  const util = require('util');
```
### util.callbackify
`util.callbackify(original)` 将async异步函数转换成遵循异常优先的回调风格的函数

```javascript
  const util = require('util');
  async function fn() {
    return 'hello';
  }
  const callbackFunction = util.callbackify(fn);
  callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(ret);
  });
```

### util.inherits
`util.inherits(constructor, superConstructor)` 实现对象间原型继承的函数
```javascript
  var util = require('util');
  function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
      console.log('Hello' + this.name);
    };
  }
  Base.prototype.showName = function() {
    console.log(this.name);
  }
  function Sub() {
    this.name = 'sub';
  }
  util.inherits(Sub, Base);
  var objBase = new Base();
  objBase.showName();
  // base
  objBase.sayHello();
  // Hello base
  console.log(objBase);
  // { name: 'base', base: 1991, sayHello: [Function]}
  var objSub = new Sub();
  objSub.showName();
  // sub
  console.log(objSub)
  // { name: 'sub' }
```
Sub仅仅继承了Base在原型中定义的函数，而构造函数内部创造的base属性和sayHello没有被继承

### util.inspect
`util.inspect(object, [showHidden], [depth], [colors])`是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。
`showHidden` 可选参数，如果为true，将会输出更多隐藏信息
`depth` 表示最大递归层数，默认递归2层，指定为null不限递归层数完整遍历对象

### util.isArray(object)
 如果给定的参数 "object" 是一个数组返回 true，否则返回 false。

### util.isRegExp(object)
 如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。

### util.isDate(object)
 如果给定的参数 "object" 是一个日期返回true，否则返回false。



