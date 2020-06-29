## Redis 事务

- 1.DISCARD 取消事务，放弃执行事务内所有命令
- 2.EXEC 执行所有事务内的命令
- 3.MULTI 标记一个事务块的开始
- 4.UNWATCH 取消WATCH命令对所有key的监视
- 5.WATCH key[key...] 监视一个(或多个)key，如果在事务执行之前这个key被其他命令改动，那么事务将被打断