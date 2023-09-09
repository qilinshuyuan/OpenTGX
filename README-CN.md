*中文 | [English](./README.md)

# 关于 `OpenTGX`

![open-tgx-logo-txt](./open-tgx-logo-txt.png)

`OpenTGX` 是一个基于 TypeScript 的开源免费全栈游戏开发解决方案。

与其他开源框架不同之处在于，它不是单纯的框架。而是依靠统一的基础框架和大量的模板案例来满足行业需求和解决项目问题。

- `Open` = 开源、开放
- `T` = TypeScript，此方案的前后端都使用 TS 语言编写
- `G` = Game Development Technique, 游戏开发技术
- `X` = 领靠众多的行业、项目、案例模板，满足多元化需求

>Open 是态度， T 是使用入口，G 是技术基础，X 是方案和目标

`OpenTGX` 能够加速客户端和服务器两端的开发速度。客户端基于 TypeScript + Cocos Creator (能够发布到几乎所有的主流平台)，服务端使用 TypeScript + NodeJS ( 全世界最流行的 JS/TS 服务端程序开发平台 ).

根据你的自身需求，客户端和服务端可以分开使用。

环境搭建和开发指南，请查看：[开发者文档](docs-cn/developer-guide.md)


## 项目模板/产品示例

- [3D 跑酷 - Jare 大冒险](https://store.cocos.com/app/detail/4241)
- [3D 多人在线元宇宙案例](https://github.com/MrKylinGithub/OpenTGX/tree/main/tgx-metaverse-online)
- 桌球女孩-即将上线
- [虚拟摇杆 - 坦克 2D](https://github.com/MrKylinGithub/OpenTGX/tree/main/kfc/assets/module_demo_tank)
- [虚拟摇杆 - 伞鸡跳跳跳](https://github.com/MrKylinGithub/OpenTGX/tree/main/kfc/assets/module_demo_rooster)

> 案例收集中，有基于 OpenTGX 开发的项目想要在此展示的，可以联系麒麟子。

## 客户端特性

- **首包优化**、**分包策略**
- **模块管理**、**UI 管理**
- **网络通信**、**平台通信**
- **虚拟摇杆**、**2D&3D常用工具**
- **性能优化**、**发热优化**、**渲染优化**

## 服务端特性

- 简单易用，不过度设计
- TypeScript 编程，与客户端使用同样的编程语言
- 链接管理、用户管理、房间管理、断线重连

## 加入社群

### 微信讨论群

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

## OpenTGX-Cocos-Client

- `base`: 一些基础工具组件，如屏幕自动适配、资源加载队列、声音播放管理器、输入管理器等等。
- `easy_camera`：漫游摄像机、FPS摄像机、第三人称摄像机、2D 跟随摄像机
- `easy_controller`：虚拟摇杆（支持 2D 和 3D）、按键、摄像机控制器
- `easy_ui_framework`：极简版的 MVVM 型的 UI 框架，与逻辑数据单向依赖。支持 UI 分层管理、UI 自动加载器、UI 事件托管 等等。

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

## 适用领域

使用它你可以轻松搞定以下领域（包含但不限于）：

- 2D & 3D 游戏
- XR
- H5 互动营销
- H5 3D展馆
- 其他互动多媒体需求

## 通用基础功能

- [UI 框架 - 多分辨率适配、弹窗管理、按需加载]
- [虚拟摇杆与第三人称摄像机 - EasyController](./docs-cn/EasyController/EasyController.md)
- [热更新]
- [小游戏分包加载流程]

## 网络

- [HTTP 通信]
- [Websocket 通信]
- [PGS 对战]

## 高级模块

- [高中机型分档与适配]
- [后期管线 RT 可视化]

## 实用 DEMO

- [实时水面渲染]
- [高级后效包]

## 游戏模板

- [3D跑酷- Jare 大冒险 - 地铁跑酷类似玩法](https://store.cocos.com/app/detail/4241)
- [小鸡逃亡3D - 神庙逃亡类似玩法]
- [KK飞车 - 天天飞车类似玩法]
- [地宫猎手 - 3D RPG 游戏]
- [气吞山河 - 类似黑洞的游戏]
- [桌球女孩 - 多人联机 NodeJS 版]
- [桌球女孩 - 多人联机 PGS 版]
- [百里挑一 - 替换图片即可做成不同品牌的营销游戏]

## XR 模板

- [WebAR 博物馆 - 扫码即可展示对应模型，无需安装]
- [WebAR 找物品 - 配置好数据后，即可参与活动]

## 互动营销模板

- [抽奖大轮盘 3D - 可用于各类抽奖活动]
- [汽车展厅 - 3D 物品展示可通用]
- [办公室全景 - 可方便内嵌到网页和 APP ]
- [大屏互动 - 支持 EXCEL 导入数据，签到后即可参与后期活动]
