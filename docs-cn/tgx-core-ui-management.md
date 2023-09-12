# OpenTGX UI 管理器

## 初始化

```ts
tgxUIMgr.inst.setup(this.uiCanvasPrefab, GameUILayers.NUM, GameUILayerNames);
```

在初始场景的 `Start` 脚本中调用 `tgxUIMgr.inst.setup` 函数，即可完成初始化。

初始化后，UIRoot 会作为常驻节点存在。即使切换场景也无需再次调用此接口。

`tgxUIMgr.inst.setup` 的第一个参数既支持传入一个 Canvas 节点，也支持传入一个 Canvas 节点的 Prefab。

## UI 分层

将不同的 UI 类别放入不同的层级来确保显示关系，是常见的需求。

`tgxUIMgr.inst.setup` 的第二个参数用于指定 UI 的分层层数，第三个用于指定每一层的名称，方便调试。

[UILayers.ts](https://github.com/MrKylinGithub/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/easy_ui_framework/UILayers.ts) 中 `tgxUILayers` 定义了每一个 UI 分层的功能，`tgxUILayerNames` 定义了每一层的名字。

如果内置的不满足需求，则参考示例项目中的 [GameUILayers](https://github.com/MrKylinGithub/OpenTGX/blob/main/tgx-core-cocos/assets/scripts/GameUILayers.ts)，定义适合自己项目的分层。

## UI 编辑

一个 UI 由 3 个部分组成：

- `Prefab`：用于编辑 UI 布局
- `Layout`：脚本组件，用于关联 UI 布局，当 UI 节点关系变动时不影响代码。
- `UIController`：不依赖引擎加载的 UI 控制器，用于实现真正的 UI 逻辑。

我们以游戏中的 HUD 为例。它可能是以下组合。

ui_game_hud 文件夹：

- ui_game_hud.prefab
- Layout_UIGameHUD.ts 继承自 cc.Component
- UIGameHUD.ts 继承自 tgxUIController

### ui_game_hud.prefab

我们直接在场景编辑器中编辑好UI节点，并制作成 Prefab 即可。

### Layout_UIGameHUD

它继承自 cc.Component, 并将其挂接在 `ui_game_Hud.prefab` 的根节点上。

它拥有一系列的 @property 属性，并与 `ui_game_Hud.prefab` 中的节点关联。

### UIGameHUD

它继承自 [tgxUIController](https://github.com/MrKylinGithub/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/easy_ui_framework/UIController.ts)，至少要实现`构造函数`和 `onCreated` 函数。

构建函数主要用于指定基本信息，以启动资源加载，`onCreated` 函数会在资源加载成功后被调用，用于初始化 UI 显示。

构造函数中，我们需要指定三个参数：prefab 路径、所在层级、Layout 类。

```ts
constructor(){
    super('ui_game_hud/ui_game_hud', GameUILayers.HUD, Layout_UIGameHUD);
}

onCreated(){
    let layout = this.layout as Layout_UIGameHUD;
    this.onButtonEvent(layout.btnBack)
}
```

根据需要，还可以实现以下函数：

- `getRes`: 当除 prefab 以外，还有资源需要加载时，可以通过它返回一个资源数组，管理器会加载完对应资源才调用 `onCreated`。
- `onDispose`: 销毁时调用
- `onUpdate`：每帧更新  

## UI 显示

OpenTGX 提供了一套不依赖于场景的 UI 管理机制，你可以在任何时候弹出已定义的窗口。比如：

```ts
tgxUIMgr.inst.showUI(UIGameHUD);
```

`UIGameHUD` 是对应的 UIController 子类，它是一个 UI 的代表，比起使用 字符串，直接使用类名会让整个项目代码可读性更好，更加便于维护。

显示时，可以进行数据设置。

```ts
tgxUIMgr.inst.showUI(UIGameHUD,(ui:UIGameHUD)=>{
    //TODO
});
```

响应函数会在 onCreated 之后被调用，可以放心使用。

## 隐藏

一般情况下，UI 的隐藏应该由自己决定。只需要在自己的 `UIController` 内调用 `this.hide()` 即可。

如果确实有外部需要关闭对应 UI 的情况，建议走事件机制。 由 UIController 内部监听某个事件进行关闭。

如果需要关闭所有已存在的界面，可以执行：

```ts
tgxUIMgr.inst.hideAll();
```

## 事件监听

为了方便在代码中监听事件，UIController 提供了快捷的事件监听机制。并会在界面销毁后自动删除，不需要手工取消监听。

监听按钮事件:

```ts
this.onButtonEvent(layout.btnBack,()=>{
    //TODO
});
```

监听单选复选按钮事件:

```ts
this.onToggleEvent(layout.checkBox,()=>{

});
```

对于更复杂的情况，也可以使用 Layout 组件转发。如：

```ts
//Layout_MyUI.ts
export class Layout_MyUI extends Component{
    //...
    public cbOnScrollEvent:Function;

    public onScrollEvent(event:any){
        if(this.cbOnScrollEvent){
            this.cbOnScrollEvent(event);
        }
    }
}

//MyUI.ts
export class MyUI extends tgxUIController{
    //..
    onCreated(){
        let layout = this.layout as Layout_MyUI;
        layout.cbOnScrollEvent = (event:any)=>{
            //TODO
        };
    }
}
```

> 将 UI 逻辑分到 Layout 与 Controller 中，不要觉得麻烦，多做一些项目就能体会到它的妙处。

## 提示框（Alert）

OpenTGX Core 还内置了 Alert 和 Waiting （转圈等待），可以很方便地调用。

```ts
tgxUIAlert.show('你确定要继续吗？',true).onClick((isOK:boolean)=>{
    if(isOK){
        //TO DO
    }
});
```

`tgxUIAlert` 会弹出一个提示框，并阻断点击事件。 当用户点确定或者取消时，会调用 `onClick` 指定的回调函数。用户根据 `isOK` 来判断点击的按钮并做对应的操作。 按钮点击后，提示框会自动关闭。 

`tgxUIAlert.show` 方法的第二个参数是 `showCancel`，用于决定是否要显示取消按钮，默认为 `false`。

> 每调用一次 show 就会产生一个新的 UIAlert 实例。

UIAlert 的基类定义在 [core_tgx/easy_ui_framework/alert](https://github.com/MrKylinGithub/OpenTGX/tree/main/tgx-core-cocos/assets/core_tgx/easy_ui_framework/alert)  中，实现类由各游戏自行负责，请参考：[UIAlert_Impl](https://github.com/MrKylinGithub/OpenTGX/tree/main/tgx-core-cocos/assets/module_basic/ui_alert)。

1. 我们需要在项目中自行实现 Prefab 的编辑，并挂接 `tgxLayout_UIAlert`。
2. 需要新建一个类（比如：`UIAlert_Impl` ）继承自 `tgxUIAlert` ，并在构造函数中指定 Prefab 的路径和相关参数。
3. 需要使用 `tgxModuleContext.attachImplClass(tgxUIAlert, UIAlert_Impl);` 将 `tgxUIAlert` 的实现类指定为 `UIAlert_Impl`，这样 `tgxUIMgr` 在创建 UIAlert 的时候就会使用 `UIAlert_Impl` 类。

`tgxModuleContext` 的内容请参考 [分包、模块与类](./tgx-core-module-class.md)。

## 锁屏等待（Waiting）

有时候，我们需要锁定用户操作，或者等待某个操作完成。则需要用到锁屏等待功能。

`tgxUIWaiting` 是单实例，只需要像下面一样操作就行。

```ts
tgxUIWaiting.show();
```

在需要隐藏它的地方，执行：

```ts
tgxUIWaiting.hide();
```

`tgxUIWaiting` 的实现方式请参考 `UIAlert_Impl` 进行 `UIWaiting_Impl` 的实现。


更多细节，请参考项目：[tgx-core-cocos](https://github.com/MrKylinGithub/OpenTGX/tree/main/tgx-core-cocos)。
