
# OpenTGX 文档

*中文 | [English](./README.md)

# OpenTGX 开发文档

由于精力有限，OpenTGX 开发文档只有英文版，请前往查看。

## 关于 `OpenTGX`

![open-tgx-logo-txt](./open-tgx-logo-txt.png)

`OpenTGX` 是一个开源免费的游戏开发技术框架。

- `Open` = 开源、开放
- `TGX` = Take Gamedev Tech to more fields!

与其他开源框架不同之处在于，它不是单纯的框架。而是依靠统一的基础框架和大量的模板案例来满足行业需求和解决项目问题。

如果通用解决方案不足以解决你的问题，可以直接访问行业解决方案：

- [TGX-元宇宙](./docs-cn/tgx-metaverse-online.md)
- [TGX-联机对战](https://store.cocos.com/app/detail/5504)
- [TGX-球球大乱斗](https://store.cocos.com/app/detail/6401)
- [TGX-高性能2D割草小游戏](https://store.cocos.com/app/detail/5862)
- [3D跑酷- Jare 大冒险 - 地铁跑酷类似玩法](https://store.cocos.com/app/detail/4241)
![Alt text](./screenshots/tgx-vsgames.jpg)
- [TGX-MMO 联系VX：qilinzi6666]()
- [TGX-Moba 联系VX：qilinzi6666]()
- [TGX-SLG 联系VX：qilinzi6666]()
- [TGX-卡牌 联系VX：qilinzi6666]()

> 案例收集中，有基于 OpenTGX 开发的项目想要在此展示的，可以联系麒麟子。

`OpenTGX` 能够加速客户端和服务器两端的开发速度。

客户端基于 TypeScript + Cocos Creator (能够发布到几乎所有的主流平台)。
服务端可以对接 TypeScript + NodeJS ( 全世界最流行的 JS/TS 服务端程序开发平台 )。和 Golang（口碑最佳的高并发服务端语言）。

## 客户端特性

- **首包优化**、**分包策略**
- **模块管理**、**UI 管理**
- **网络通信**、**平台通信**
- **虚拟摇杆**、**2D&3D常用工具**
- **性能优化**、**发热优化**、**渲染优化**

## 内置案例

- `tgx-core-cocos`: 基于 Cocos 的客户端核心框架，解决了加载、分包、UI 管理、虚拟摇杆、常用摄像机等问题。单机项目可从这里开始：[tgx-core-cocos 文档](./docs-cn/tgx-core-cocos.md)。

- `tgx-metaverse-online`：基于 tgx-core-cocos + TSRPC 的多人在线元宇宙案例。基于多进程分布式服务器集群，实现了登录、注册、聊天、多维子世界管理、多人同步、用户交互等特性。多人联机元宇宙项目可以从这里开始：[tgx-metaverse-online 文档](./docs-cn/tgx-metaverse-online.md)。

- [虚拟摇杆 - 坦克 2D](https://github.com/MrKylinGithub/OpenTGX/tree/main/kfc/assets/module_demo_tank)
- [虚拟摇杆 - 伞鸡跳跳跳](https://github.com/MrKylinGithub/OpenTGX/tree/main/kfc/assets/module_demo_rooster)

## 微信讨论群

群名：**OpenTGX|全栈游戏开发**

请加扫码添加微信（微信号：`qilinzi6666`） 并注明 `KFC`，即可入群。

![wechat_qrcode](./docs-cn/images/wechat_qrcode.jpeg)

>群里不讨论无关话题。

## 公众号

欢迎关注麒麟子公众号，可以第一时间获得最新信息。

![image.png](https://download.cocos.com/CocosStore/markdown/c1fdf2a5defb499abbc9c78441b50d5e/c1fdf2a5defb499abbc9c78441b50d5e.png)

- 深耕游戏引擎与游戏开发 15 年
- 每一滴干货都源自商业项目实践
- 用技术资源赋能行业商机落地
- 交个朋友，你不亏！

## 你为什么需要它？

麒麟子在接触了数千个开发者后，总结出了大家日常开发中的刚需，比如：

1. 需要**技术进阶和成长**，学会实用的项目处理技巧
2. 需要**优质的项目模板**，快速验证项目原型和进入迭代周期
3. 需要**高质量的框架**，解决项目模块管理和一些基础问题。

因此，麒麟子花了一些时间，重启并开源了 `KylinsToolkit`，并命名为 `OpenTGX`
后期会逐步加入网络、2D 游戏常用控件、3D 游戏常用控件等等。

里面的内容来自麒麟子十多年项目经验的总结，虽然不是最优解，但却能在一定程度上，让项目的起步、模块分割、多人协同和后期维护更加顺畅。

在此基础上，麒麟子会和众多开发者一起，基于 `OpenTGX`，为大家提供大量的可参考甚至直接使用的项目模板以及教学案例。

也希望有更多使用 `OpenTGX` 来制作项目的朋友能加入进来。