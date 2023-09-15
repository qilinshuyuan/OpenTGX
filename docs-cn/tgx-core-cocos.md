# tgx-core-cocos 文档

tgx-core-cocos 是基于 Cocos Creator 的 OpenTGX 客户端框架，单机项目可以从它开始。

## assets 目录说明

- `core_tgx`：tgx-core-cocos 核心基础库
  - `base`: 一些基础工具组件，如屏幕自动适配、资源加载队列、声音播放管理器、输入管理器等等。
  - `easy_camera`：漫游摄像机、FPS摄像机、第三人称摄像机、2D 跟随摄像机
  - `easy_controller`：虚拟摇杆（支持 2D 和 3D）、按键、摄像机控制器
  - `easy_ui_framework`：极简版的 MVVM 型的 UI 框架，与逻辑数据单向依赖。支持 UI 分层管理、UI 自动加载器、UI 事件托管 等等。
  - `tgx.ts`：tgx-core-cocos 的主类，引用它就可以访问所有类。
- module_basic：基础 bundle，基于加载必要的游戏资源和代码。
- module_demo_rooster：单独的 bundle，虚拟摇杆 3D 示例。
- module_demo_tank：单独的 bundle，虚拟摇杆 2D 示例。
- module_extra：跨模块弹窗出 UI窗口 示例。
- res：用到的资源。
- script：必须要放在 main 包中的脚本。
- start：初始化场景，用于加载和启动项目。属于 main 包。

请参考 [快速开始](./quick-start.md) 进行环境安装和项目启动。

## 快速开始项目

### 引入

将 assets 中的内容全部拷贝进新项目即可。注意同名脚本需要避免被覆盖。

### 修改 start 场景

修改 start 场景中的内容，以及 Start.ts 脚本内容，做好预加载管理，尽可能缩短启动时间。

### 处理好 module_basic

`module_basic` 会在启动时，在 Start.ts 中设置为默认 bundle，会在场景加载后被调用。 建议将通用的 UI，素材，脚本，都放入这个包中。

同时，删除掉不需要的内容。确保内容干净

### 删除掉其他包

如果其余内容不需要，则删除掉。

### 添加其他包

根据项目需求，添加新的 bundle，并制定好加载策略。 一般包内可见的内容，都放到包内。包括素材、prefab、脚本、UI 等。

### 修改定义

项目中地场景、bundle 等，不直接使用字符串，而是预先定义为了静态属性。在使用之前，做好修改。

- scripts/GameUILayers.ts  定义了项目中需要用到的 UI 层级。
- scripts/ModuleDef.ts 定义了项目中需要用到的 bundle 名称。

- scripts/SceneDef.ts 定义了项目中需要用到的场景名称。
  > 需要通过代码合成的场景定义不需要写在这里。

## res

res 不是 bundle，而是放在 main 包中的资源。main 包中的资源如果没有被任何地方引用，则不会打包到程序版本中。

### 3D 模型、动画

3D 模型、动画素材（比如 FBX、gLTF等），建议放在 res 中，不要直接放入任何 bundle。bundle 中，对需要用到的素材进行引用，或者制作出对应的 prefab。这样可以避免 bundle 过大。

### 图片以及其他

对于明确要单独动态加载的图片或者文件，需要放到对应的 bundle 里才能被加载，否则建议放到 res 目录下，（或者其他 main 包的目录下）。

这样只有被 bundle 中的场景、prefab、animation 等引用的素材才会被打入 bundle 中。

### 音频

由于音频采用动态加载，需要放入对应的 bundle 中，并在播放时，传入正确的 bundle 名。

### 不要使用 resources 目录

由于 resources 目录列表会比 main 先加载。因此不要使用 resources 目录，这样可以使 start 场景启动得更快些。

更多内容请查看 [OpenTGX 开发者文档-客户端模块文档](./developer-guide.md#客户端模块)。
