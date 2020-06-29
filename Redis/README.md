## Redis优势
- 性能极高 读写性能高
- 丰富的数据类型
- 原子性  要是执行成功，要么失败完全不执行
- 丰富的特性  Redis还支持 publish/subscribe, 通知, key 过期等等特性。

## 命令
### 键（key） 用于管理redis的键
- DEL key
- DUMP key 序列化给定key，返回被序列化的值
- EXISTS key 检查是否存在
- EXPIRE key  给key 设置过期时间  单位：s
- EXPIREAT key  给key 设置过期时间 时间戳 unix s
- PEXPIRE key 给key 设置过期时间  单位：ms
- PEXPIREAT key 给key 设置过期时间  时间戳 unix ms
- KEYS pattern 查找符合给定模式的key
- MOVE key db 将当前数据库的key移动到给定的数据库db当众
- PERSIST key 移除key的过期时间，key 持久保持
- PTTL key 以毫秒为单位返回key 的剩余过期时间
- TTL key 以秒为单位返回key 的剩余过期时间 time to live
- RANDOMKEY 单签数据库汇总随机返回一个key
- RENAME key newkey 修改key的名称
- RENAMENX key newkey  当newkey不存在是，将key改名为nwkey
- TYPE key 返回key 所村塾的值的类型

### 字符串 （string）用于管理redis字符串值
- SET key value 设置指定key的值
- GET key 获取指定key的值
- GETRANGE key start end 返回key中字符串值的子字符
- GETSET key value 将给定key的值设为value 返回key的旧值
- GETBIT key offset 对key 所存储的字符串值，获取指定偏移量上的位bit
- MGET key1 [key2...] 获取所有给定key的值
- SETBIT key offset value 对key所存储的字符串值，设置或清除指定偏移量上的位（bit）
- SETTEX key value 只有key不存在时设置key的值
- STRLEN key 返回key所存储的字符串值的长度
- MSET key value [key value...] 同时设置一个或多个key-value
- MSETNX key value [key value...] 同时设置一个或多个key-value, 当且仅当所有给定key都不存在
- PSETEX key millisenconds value 这个命令和SETTEX命令相似，以毫秒为设置key的生存时间
- INCR key 将key所存储的数字值增1
- INCRBY key increment 将key所存储的值加上给定的浮点增量值
- DECR key 将key 中存储的数字值减一
- DECRBY key decrement key所存储的值减去给定的减量值
- APPEND key value 如果key已经存在并且是一个字符串，APPEND命令将制定的value追加到该key原来值的末尾

### HASH 是一个string类型的field和value的映射表，hash适合用于存储对象
```Redis
127.0.0.1:6379>  HMSET runoobkey name "redis tutorial" description "redis basic commands for caching" likes 20 visitors 23000
OK
127.0.0.1:6379>  HGETALL runoobkey
1) "name"
2) "redis tutorial"
3) "description"
4) "redis basic commands for caching"
5) "likes"
6) "20"
7) "visitors"
8) "23000"
```

- HDEL key field1 [field2] 删除一个或多个哈希表字段
- HEXISTS key field 查看哈希表key中，制定的字段是否存在
- HGET key field 获取存储在哈希表中制定字段的值
- HGETALL key 获取在哈希表中制定key的所有字段和值
- HINCRBY key field increment 为哈希表key中的指定字段的整数值加上增量increment
- HINCRBYFLOAT key field increment 为哈希表key中的指定字段的浮点数值佳航增量increment
- HKEYS key 获取哈希表中字段的数量
- HMGET key filed1 [field2] 获取所有给定字段的值
- HMSET key field1 value1 [field2 value2] 同时将多个 field-value 对设置到哈希表key中
- HSET key field value 将哈希表key中的字段field的值设为value
- HSETNX key field value 只有在字段field不存在时，设置哈希表字段的值
- HVALS key 获取哈希表中的所有值

### Redis 列表 LIST 简单的字符串列表，按照插入顺序排序。可以添加到一个元素列表的头部（左边）或者尾部（右边）
```Redis
(integer) 1
redis 127.0.0.1:6379> LPUSH runoobkey mongodb
(integer) 2
redis 127.0.0.1:6379> LPUSH runoobkey mysql
(integer) 3
redis 127.0.0.1:6379> LRANGE runoobkey 0 10

1) "mysql"
2) "mongodb"
3) "redis"
```

- BLPOP key1 [key2] timeout 移出并获取列表的第一个元素，如果列表没有元素会阻塞列表，知道等到超时或发现可弹出元素为止
- BRPOP key [key2] timeout 移出并获取列表的最后一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
- BRPOPLPUSH source destination timeout 从列表中弹出一个值，将弹出的元素插入到另一个列表中，并返回它；如果没有元素会阻塞列表直到等待超时或发现可弹出的元素为止
- LINDEX key index 通过所以获取列表中的元素
- LINSERT key BEFORE|AFTER pivot value 在列表的元素前或者后插入元素
- LLEN key 获取列表长度
- LPOP key 移出并获取列表的第一个元素
- LPUSH key value1 [value2] 讲一个或多个值插入到列表头部
- LPUSHX key value 将一个值插入到已存在的列表头部
- LRANGE key start stop 获取列表指定范围内的元素
- LREN key count value 移除列表元素
- LSET key index value 通过索引设置列表元素的值
- LTRIM key start stop 对一个列表进行修剪，让列表值保留指定区间内的元素，不在指定区间内的元素都将被删除
- RPOP key 移除列表的最后一个元素，返回值为移除的元素
- RPOPLPUSH source destination 移除最后一个，将钙元素添加到另一个列表并返回
- RPUSH key value1 [value2] 在列表中添加一个活多个值
- RPUSHX key value 为已存在的列表添加值

### 集合 Set 是String类型的无序集合，集合成员是唯一的，
```Redis
redis 127.0.0.1:6379> SADD runoobkey redis
(integer) 1
redis 127.0.0.1:6379> SADD runoobkey mongodb
(integer) 1
redis 127.0.0.1:6379> SADD runoobkey mysql
(integer) 1
redis 127.0.0.1:6379> SADD runoobkey mysql
(integer) 0
redis 127.0.0.1:6379> SMEMBERS runoobkey

1) "mysql"
2) "mongodb"
3) "redis"
```

- SADD key member1 [member2] 向集合添加一个或多个成员
- SCARD key 获取集合的成员数
- SDIFF key1 [key2] 返回给定所有集合的差集
- SDIFFSTORE destination key1 [key2] 返回非定所有集合的差集并存储在destination中
- SINTER key1 [key2] 返回给定所有集合的交集
- SINTERSTORE destination key1 [key2] 返回给定所有集合的交集并存储在destination中
- SISMEMBER key member 判断member元素是否是集合key的成员
- SMEMBERS key 返回集合中的所有成员
- SMOVE source destionation member 将member 元素从source 集合移动到destination集合
- SPOP key 移除并返回集合中的一个随机元素
- SRANDMEMBER key [count] 返回集合中一个或多个随机数
- SREM key member1 [member2] 移除集合中一个或多个成员
- SUNION key1 [key2] 返回所有给定集合的并集
- SUNIONSTORE destination key1 [key2]所有戈丁集合的并集存储在destination集合中
- SSCAN key sursor [MATCH pattern] [COUNT count] 迭代集合中的元素

## 有序集合 不允许重复的成员 每个元素都会关联一个double类型的分数通过分数来为集合中成员大小排序，成员是唯一的，但是分数（score）可以重复

```Redis
redis 127.0.0.1:6379> ZADD runoobkey 1 redis
(integer) 1
redis 127.0.0.1:6379> ZADD runoobkey 2 mongodb
(integer) 1
redis 127.0.0.1:6379> ZADD runoobkey 3 mysql
(integer) 1
redis 127.0.0.1:6379> ZADD runoobkey 3 mysql
(integer) 0
redis 127.0.0.1:6379> ZADD runoobkey 4 mysql
(integer) 0
redis 127.0.0.1:6379> ZRANGE runoobkey 0 10 WITHSCORES

1) "redis"
2) "1"
3) "mongodb"
4) "2"
5) "mysql"
6) "4"
``` 

- ZADD key score1 member1 [score2 member2] 向有序集合添加一个或多个成员，或者更新一寸的成员的分数
- ZCARD key 获取有序集合的成员数
- ZCOUNT key min max 计算在有序集合中制定区间分数的成员
- ZINCRBY key increment member 有序集合中对指定成员的分数加上增量 increment
- ZINTERSTORE destination numkeys key [key...] 尖酸给定的一个或多个有序集的交集并将其结果集存储在新的有序集合key中
- ZLEXCOUNT key min max 在有序集合中计算指定字典区间内成员的数量
- ZRANGE key start stop [WITHSCORES] 通过索引区间返回有序集合指定区间内的成员
- ZRANGEBYLEX key min max [LIMIT offset count] 通过字典区间返回有序集合的成员
- ZRANGEBYSCORE key min max [WIDTHSCORES] [LIMIT] 通过分数返回有序集合指定区间内的成员
- ZRANK key member 返回有序集合汇总指定成员的索引
- ZREM key member [member...] 移除有序集合中一个或多个成员
- ZRENRANGEBYKEX key min max 移除有序集合中给定的字典区间的所有成员
- ZRENRANGEBYRANK key start stop 移除有序集合中给定的排定区间的所有成员
- ZRENRABGEBYSCORE key min max 移除有序集合中给定的分数区间的所有成员
- ZREVRANGE key start stop [WIDTHSCORES] 返回有序集合中制定分数区内的成员没分数从高到低排序
- ZREVRANK key member 返回有序集合汇总指定成员的排名，有序集合按分数值递减排序
- ZSCORE key member 返回有序集合中，成员的分数值
- ZUNIONSTORE destination numkeys key [key ...] 计算给定的一个或多个有序集合的并集，并存储在新的key中
- ZSCAN key cursor [MATCH pattern] [COUNT count] 迭代有序集合中的元素 包括元素成员和分支
