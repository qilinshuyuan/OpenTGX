# TSRPC Server

## 介绍

- MasterServer：主管服务器（登录、匹配、各类系统），HTTP
- WorldServer：世界服务（玩家同步、关卡、游戏逻辑），WebSocket

MasterServer 和 WorldServer 为一对多的关系，保持长连接 RPC

## 启动

```shell
# 启动 MasterServer
npm run dev:master

# 启动 WorldServer
npm run dev:world

# 再启动一个 WorldServer （测试分布式）
npm run dev:world2
```

## 构建

```shell
npm run build
```