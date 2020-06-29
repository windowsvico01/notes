## 发布和订阅
是一种 消息通信模式： 发送者（pub）发送消息，订阅者（sub）接收消息
Redis客户端可以订阅任意数量的频道
```type=redis
redis 127.0.0.1:6379> SUBSCRIBE redisChat

Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "redisChat"
3) (integer) 1

redis 127.0.0.1:6379> PUBLISH redisChat "Redis is a great caching technique"

(integer) 1

redis 127.0.0.1:6379> PUBLISH redisChat "Learn redis by runoob.com"

(integer) 1

# 订阅者的客户端会显示如下消息
1) "message"
2) "redisChat"
3) "Redis is a great caching technique"
1) "message"
2) "redisChat"
3) "Learn redis by runoob.com"
```
- 1.PSUBSCRIBE pattern [pattern] 订阅一个或多个符合给定模式的频道
- 2.PUBSUB subcommand [argument[argument...]] 查看订阅与发布系统状态
- 3.SUBSCRIBE channel [channel...] 订阅给定的一个或多个频道的信息
- 4.PUBLISH channel message 将信息发送到指定的频道
- 5.PUNSUBSCRIBE [pattern[pattern...]] 退订所有给定模式的频道
- 6.UNSUBSCRIBE [channel[channel...]] 退订给定的频道