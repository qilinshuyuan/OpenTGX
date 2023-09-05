# TSRPC Server

## 介绍

- MatchServer：房间管理服务（开房间、随机匹配），HTTP
- RoomServer：房间服务（运行实际房间逻辑），WebSocket

MatchServer 和 RoomServer 为一对多的关系，保持长连接 RPC

## 启动

```shell
# 启动 MatchServer
npm run dev:match

# 启动 RoomServer
npm run dev:room

# 再启动一个 RoomServer （测试分布式）
npm run dev:room2
```

## 构建

```shell
npm run build
```