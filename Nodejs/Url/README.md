### url(URL)

使用WHATWG 的API解析URL字符串
```javascript
const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```
使用遗留API：
```javascript
const url = require('url');
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```
### WHATWG的URL接口

#### URL类
#### new URL(input[,base])
- input `<string>` 
  要解析的绝对或相对的 URL。
  如果 input 是相对路径，则需要 base。 如果 input 是绝对路径，则忽略 base。
- base `<string> | <URL>`
  如果 input 不是绝对路径，则为要解析的基本 URL
```javascript
  const myURL = new URL('/foo', 'https://example.org/');
  let myURL = new URL('http://Example.com/', 'https://example.org/');
  // http://example.com/
  myURL = new URL('https://Example.com/', 'https://example.org/');
  // https://example.com/
  myURL = new URL('foo://Example.com/', 'https://example.org/');
  // foo://Example.com/
  myURL = new URL('http:Example.com/', 'https://example.org/');
  // http://example.com/
  myURL = new URL('https:Example.com/', 'https://example.org/');
  // https://example.org/Example.com/
  myURL = new URL('foo:Example.com/', 'https://example.org/');
  // foo:Example.com/
```
#### url.hash
- `<string>`
获取及设置URL的片段部分
```javascript
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// 打印 #bar
myURL.hash = 'baz';
console.log(myURL.href);
// 打印 https://example.org/foo#baz
```
#### url.host
- `<string>`
获取及设置 URL 的主机部分
```javascript
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host);
// 打印 example.org:81
myURL.host = 'example.com:82';
console.log(myURL.href);
// 打印 https://example.com:82/foo
```
#### url.hostname
- url.host 和 url.hostname 之间的区别是 url.hostname 不包含端口。
#### url.href
- `<string>`
获取及设置序列化的URL
```javascript
const myURL = new URL('https://example.org/foo');
console.log(myURL.href);
// 打印 https://example.org/foo
myURL.href = 'https://example.com/bar';
console.log(myURL.href);
  // 打印 https://example.com/bar
```
#### url.toString()
- `<string>`
在 URL 对象上调用 toString() 方法将返回序列化的 URL。 返回值与 url.href 和 url.toJSON() 的相同。
#### url.port
- `<string>`
端口值可以是数字或包含 0 到 65535（含）范围内的数字字符串。 将值设置为给定 protocol 的 URL 对象的默认端口将会导致 port 值变为空字符串（''）。
#### url.protocol
- `<string>`
获取及设置URL的协议部分
#### url.searchParams
- `<URLSearchParams>`
获取表示 URL 查询参数的 URLSearchParams 对象。 该属性是只读的。 使用 url.search 设置来替换 URL 的整个查询参数。 详见 URLSearchParams。

#### url.origin
#### url.username
#### url.password
#### url.pathname

### URLSearchParams 类
URLSearchParams API 提供对 URL 查询部分的读写权限

[其他](http://nodejs.cn/api/url.html#url_url)





