*中文 | [English](./README.md)

## 微信讨论群

群名：**KylinsToolkit & KFC**

请加扫码添加微信（微信号：`qilinzi6666`） 并注明 `KFC`，即可入群。

![](./docs-cn/images/wechat_qrcode.jpeg)

>群里不讨论无关话题。

## 公众号
欢迎关注麒麟子公众号，可以第一时间获得最新信息。

![image.png](https://download.cocos.com/CocosStore/markdown/c1fdf2a5defb499abbc9c78441b50d5e/c1fdf2a5defb499abbc9c78441b50d5e.png)
- 深耕游戏引擎与游戏开发 15 年
- 每一滴干货都源自商业项目实践
- 用技术资源赋能行业商机落地
- 交个朋友，你不亏！
## 项目模板/产品示例
- [3D 跑酷- Jare 大冒险](https://store.cocos.com/app/detail/4241)
- 桌球女孩-即将上线
- [虚拟摇杆 - 坦克 2D](https://github.com/MrKylinGithub/KylinsToolkit/tree/main/kfc/assets/module_demo_tank)
- [虚拟摇杆 - 伞鸡跳跳跳](https://github.com/MrKylinGithub/KylinsToolkit/tree/main/kfc/assets/module_demo_rooster)
> 案例收集中，有基于 KylinsToolkit&KFC 开发的项目想要在此展示的，可以联系麒麟子。

## 关于 KylinsToolkit&KFC
`KylinsToolkit` 是一个基于 [Cocos Creator](https://www.cocos.com/creator) 的开源免费的游戏项目开发解决方案。

它由框架核心 `KFC` 和相关工具集组成，它的目标是成为一套能够解决开发者常见需求和问题的基础方案。
如：
- **首包优化**、**分包策略**
- **模块管理**、**UI 管理**
- **网络通信**、**平台通信**
- **虚拟摇杆**、**2D&3D常用工具**
- **性能优化**、**发热优化**、**渲染优化**

里面的内容来自麒麟子十多年项目经验的总结，虽然不是最优解，但却能在一定程度上，让项目的起步、模块分割、多人协同和后期维护更加顺畅。

在此基础上，麒麟子会和众多开发者一起，基于 KylinsToolkit，为大家提供大量的可参考甚至直接使用的项目模板以及教学案例。

也希望有更多使用KylinsToolkit 来制作项目的朋友能加入进来。

## 关于 KFC
每周都有疯狂星期四，但这里说的 `KFC` 和它无关。

`KFC` 是 Kylin's Framework Core 的缩写。

麒麟子过去的两年多，大部分时间都花在了引领新人入门以及图形渲染教学上，而忽略了某些群体的需求，比如：
1. 需要**技术进阶和成长**，学会实用的项目处理技巧
2. 需要**优质的项目模板**，快速验证项目原型和进入迭代周期
3. 需要**高质量的框架**，解决项目模块管理和一些基础问题。

因此，麒麟子花了一些时间，重启并开源了 `KylinsToolkit`，并将项目框架方面的部分，抽取为了 `KFC`。

后期会逐步加入网络、2D 游戏常用控件、3D 游戏常用控件等等。

目前 `KFC` 包含了下面几个部分：
- `kylins_base`: 一些基础工具组件，如屏幕自动适配、资源加载队列、声音播放管理器、输入管理器等等。
- `kylins_camera`：漫游摄像机、FPS摄像机、第三人称摄像机、2D 跟随摄像机
- `kylins_easy_controller`：虚拟摇杆（支持 2D 和 3D）、按键、摄像机控制器
- `kylins_ui_framework`：极简版的 MVVM 型的 UI 框架，与逻辑数据单向依赖。支持 UI 分层管理、UI 自动加载器、UI 事件托管 等等。

# 适用领域
使用它你可以轻松搞定以下领域（包含但不限于）：
- 2D & 3D 游戏
- XR
- H5 互动营销
- H5 3D展馆
- 其他互动多媒体需求

## 通用基础功能：
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

## 实用 DEMO：
- [实时水面渲染]
- [高级后效包]

## 游戏模板：
- [3D跑酷- Jare 大冒险 - 地铁跑酷类似玩法](https://store.cocos.com/app/detail/4241)
- [小鸡逃亡3D - 神庙逃亡类似玩法]
- [KK飞车 - 天天飞车类似玩法]
- [地宫猎手 - 3D RPG 游戏]
- [气吞山河 - 类似黑洞的游戏]
- [桌球女孩 - 多人联机 NodeJS 版]
- [桌球女孩 - 多人联机 PGS 版]
- [百里挑一 - 替换图片即可做成不同品牌的营销游戏]

## XR 模板：
- [WebAR 博物馆 - 扫码即可展示对应模型，无需安装]
- [WebAR 找物品 - 配置好数据后，即可参与活动]

## 互动营销模板：
- [抽奖大轮盘 3D - 可用于各类抽奖活动]
- [汽车展厅 - 3D 物品展示可通用]
- [办公室全景 - 可方便内嵌到网页和 APP ]
- [大屏互动 - 支持 EXCEL 导入数据，签到后即可参与后期活动]
