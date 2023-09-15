# OpenTGX 开发者文档

OpenTGX 是一个基于 TypeScript 的全栈游戏开发技术方案。它基于一个基础框架，配合各种案例模板，加速项目开发。

想要搭建示例项目并运行，请参考：[快速开始-源码下载-环境搭建](./quick-start.md)。

## 案例列表

- 示例：坦克 2D - 源码
  - 在 tgx-cocos 目录内
- 示例：伞鸡跳跳 3D - 源码
  - 在 tgx-cocos 目录内
- 示例：聊天程序 - 源码
  - 在 tgx-cocos 目录内
- [游戏案例：Jare 大冒险 - 源码](https://store.cocos.com/app/detail/4241)
  - 3D 跑酷游戏，可以发布网页、原生、微信小游戏。
- [游戏案例：桌球女孩 Online - 源码](https://store.cocos.com/app/detail/4241)
  - 3D 桌球游戏、联机对局、单人练习、多人观战、排行

> 更多案例正在收集和制作中，如有需要在此展示的案例，请联系麒麟子。

## 模块文档

>以下部分，是 OpenTGX 的核心模块使用介绍与设计原理，也是游戏开发中常见的实用技巧。

### 客户端

- [自适应分辨率适配](./tgx-core-auto-resolution-policy.md)
  - 分辨率选择
  - 自动适配机制
- [UI 管理器](./tgx-core-ui-management.md)
  - UI 分层
  - 常驻与场景切换
  - UILayout
  - UIController
  - 资源加载
  - 事件监听
  - UIAlert
  - UIWaiting
- [分包与类](./tgx-core-module-class.md)
  - 代码分包
  - 模块标记
  - 接口类与实现类
  - 跨分包加载界面<普通人不用看>
- [虚拟摇杆](./EasyController/EasyController.md)
  - 2D 虚拟摇杆
  - 3D 虚拟摇杆
  - 摄像机缩放与旋转控制
- [音频管理器](./tgx-core-audio-mgr.md)
  - 音乐播放
  - 音效播放
  - 非 resources 分包中的音乐播放
- [摄像机组件](./tgx-core-camera-components.md)
  - 自由摄像机
  - 第三人称摄像机
  - 2D 跟随摄像机
  
## 服务器

服务器基础架构采用开源免费的 TSRPC，请前往 [TSRPC 官网](https://tsrpc.cn/) 了解详情。

- 主进程+世界进程架构
- 用户管理
- 子世界/房间/区域管理

## 网络通信

- Websocket
- 协议定义
- 请求与应答
- 服务器主推
