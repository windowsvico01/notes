## http(HTTP)

### HTTP消息头
```json
{ 
  'content-length': '123',
  'content-type': 'text/plain',
  'connection': 'keep-alive',
  'host': 'mysite.com',
  'accept': '*/\*'
}
```
- 接收到的原始消息头保存在 rawHeaders 属性中，该属性是 [key, value, key2, value2, ...] 的数组。
-- 例如，上面的消息头对象可能具有的 rawHeaders 列表如下所示：
```json
[ 
  'ConTent-Length', '123456',
  'content-LENGTH', '123',
  'content-type', 'text/plain',
  'CONNECTION', 'keep-alive',
  'Host', 'mysite.com',
  'accepT', '*/\*' 
]
```
[套接字(socket)](https://baike.baidu.com/item/%E5%A5%97%E6%8E%A5%E5%AD%97/9637606?fr=aladdin)
### http.Server 类
#### close 事件
当服务器关闭时触发。
#### request 事件
- request
- response
每次有请求时都会触发
#### checkContinue 事件
- request
- response
每次收到 HTTP Expect: 100-continue 的请求时都会触发。 如果未监听此事件，服务器将自动响应 100 Continue。
#### clientError 事件
- exception
- socket
#### connect 事件
- request
- socket
- head
每次客户端请求 HTTP CONNECT 方法时触发。 如果未监听此事件，则请求 CONNECT 方法的客户端将关闭其连接。
#### connection 事件
- socket
建立新的 TCP 流时会触发此事件

#### server.close([callback])
- callback
停止服务器接受新连接。
#### server.listen()
启动 HTTP 服务器监听连接。
#### server.listening
- `boolean` 表明服务器是否正在监听连接。
#### server.setTimeout([msecs][, callback])
- msecs <number> 默认值：120000
- callback <Function>
- 返回 <http.Server>
设置套接字的超时值，并在服务器对象上触发 'timeout' 事件，如果发生超时，则将套接字作为参数传入。
如果服务器对象上有 'timeout' 事件监听器，则将使用超时的套接字作为参数调用它。
默认情况下，服务器的超时值为 2 分钟，如果超时，套接字会自动销毁。 但是，如果将回调分配给服务器的 'timeout' 事件，则必须显式处理超时。
#### server.timeout
- <number> 超时时间  默认 120000
#### server.keepAliveTimeout
- <number> 超时时间 默认 5000
#### server.maxHeadersCount
- <number> 默认值：2000
限制最大传入请求头数。 如果设置为 0，则不会应用任何限制。
#### server.headersTimeout
- <number> 默认值：40000
限制解析器等待接收完整 HTTP 请求头的时间。

### http.ServerResponse 类
- 继承自 <stream>
此对象由 HTTP 服务器在内部创建，而不是由用户创建。 它作为第二个参数传给 'request' 事件。





### http.Agent 类
Agent 负责管理 HTTP 客户端的连接持久性和重用

### http.ClientRequest 类
此对象由 http.request() 内部创建并返回。它代表正在进行中的请求，其请求头已进入队列。 

要获得响应，则为请求对象添加 'response' 事件监听器。 
#### 'abort' 事件
当请求被客户端中止时触发。 此事件仅在第一次调用 abort() 时触发。

#### 'connect' 事件

