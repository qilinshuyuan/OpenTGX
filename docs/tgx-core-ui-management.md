# OpenTGX UI Management

## Initialize

```ts
tgx.UIMgr.inst.setup(this.uiCanvasPrefab, GameUILayers.NUM, GameUILayerNames);
```

In the `Start` script of the initial scene, call the `tgx.UIMgr.inst.setup` function to complete the initialization.

After initialization, `UIRoot` will exist as a permanent node. There is no need to call this interface again even when switching scenes.

The first parameter of `tgx.UIMgr.inst.setup` supports both passing in a Canvas node and a Canvas node's Prefab.

## UI Layers

Placing different UI categories into different layers to ensure display orders is a common requirement.

The second parameter of `tgx.UIMgr.inst.setup` is used to specify the number of UI layers, and the third is used to specify the name of each layer for easy debugging.

In [UILayers.ts](https://github.com/qilinshuyuan/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/easy_ui_framework/UILayers.ts), `tgxUILayers` defines the functionality of each UI layer, and `tgx.UILayerNames` defines the name of each layer.

If the built-in layers do not meet your needs, refer to the [GameUILayers](https://github.com/qilinshuyuan/OpenTGX/blob/main/tgx-core-cocos/assets/scripts/GameUILayers.ts) in the sample project to define the layers suitable for your own project.

## UI Structure

A UI consists of three parts:

- `Prefab`: Used for editing the UI layout.
- `Layout`: A script component that associates with the code and ui prefab, ensuring that changes in the prefab do not affect the code.
- `UIController`: A UI controller that does not rely on engine loading, used to implement the actual UI logic.

Let's take the HUD in the game as an example. It might be the following combination.
The ui_game_hud folder contains:

- `ui_game_hud.prefab`
- `Layout_UIGameHUD.ts`, which inherits from cc.Component
- `UIGameHUD.ts`, which inherits from tgxUIController

### ui_game_hud.prefab

You can directly edit the UI nodes in the scene editor and then create them into a Prefab.

### Layout_UIGameHUD

It inherits from `cc.Component` and is attached to the root node of `ui_game_Hud.prefab`.

It has a series of `@property` attributes and is associated with the nodes in `ui_game_Hud.prefab`.

### UIGameHUD

It inherits from [tgx.UIController](https://github.com/qilinshuyuan/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/easy_ui_framework/UIController.ts), at least needs to implement the `constructor` and the `onCreated` methods.

构建函数主要用于指定基本信息，以启动资源加载，`onCreated` 函数会在资源加载成功后被调用，用于初始化 UI 显示。

构造函数中，我们需要指定三个参数：prefab 路径、所在层级、Layout 类。

The `constructor` is mainly used to specify basic information to initiate resource loading. The `onCreated` is called after all the resources have been successfully loaded and is used for initializing UI display.

In the constructor, we need to specify three parameters: prefab path, the layer it belongs to, and the Layout class.

```ts
constructor(){
    super('ui_game_hud/ui_game_hud', GameUILayers.HUD, Layout_UIGameHUD);
}

onCreated(){
    let layout = this.layout as Layout_UIGameHUD;
    this.onButtonEvent(layout.btnBack)
}
```

The following methods need to be implemented according to the requirements:

- `getRes`: When there are additional resources that need to be loaded besides the prefab, you can use it to return an array of resources. The manager will call onCreated after loading the corresponding resources.
- `onDispose`: Called when the object is being destroyed.
- `onUpdate`: Called for every frame update.

## UI Display

OpenTGX offers a UI management system that does not rely on resource loading, enabling you to pop up any predefined window at any time. For example:

```ts
tgx.UIMgr.inst.showUI(UIGameHUD);
```

`UIGameHUD` is the subclass of the corresponding UIController; it serves as a representative of the UI. Using the class name directly, rather than a string, makes the entire project's code more readable and easier to maintain.

When displaying, you can set data in the callback method.

```ts
tgxUIMgr.inst.showUI(UIGameHUD,(ui:UIGameHUD)=>{
    //TODO
});
```

The callback functions will be called after the `onCreated` execution, so you can confidently use all UI properties and methods.

## UI Close

In general, the closing of a UI should be determined by the UI object itself. Simply call `this.close()` within your own UIController to close it.

If there is indeed a situation where an external entity needs to close a corresponding UI, it is recommended to use the event mechanism. The UIController should listen for a specific event internally to trigger the closing.

To close all existing interfaces, you can use the following code line:

```ts
tgx.UIMgr.inst.closeAll();
```

## Event Handling

For ease of event listening in the code, UIController provides a convenient event listening mechanism. It will automatically remove the event listeners after the UI is destroyed, no need to manual remove.

To listen for button events:

```ts
this.onButtonEvent(layout.btnBack,()=>{
    //TODO
});
```

To listen for toggle events:

```ts
this.onToggleEvent(layout.checkBox,()=>{

});
```

For more complex situations, you can also use the Layout component to forward the events. For example:

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
export class MyUI extends tgx.UIController{
    //..
    onCreated(){
        let layout = this.layout as Layout_MyUI;
        layout.cbOnScrollEvent = (event:any)=>{
            //TODO
        };
    }
}
```

> Divide the UI logic into Layout and Controller; do not consider it troublesome. After working on more projects, you will come to appreciate its advantages.

## Alert

OpenTGX Core also has built-in Alert and Waiting (Lock Sreen) functionalities, which can be easily invoked.

```ts
tgx.UIAlert.show('Are you OK?',true).onClick((isOK:boolean)=>{
    if(isOK){
        //TO DO
    }
});
```

`tgx.UIAlert.show` pops up an alert dialog and blocks click events. When the user clicks `OK` or `Cancel`, the callback function specified by onClick is invoked. Users can know which button was clicked based on isOK and perform corresponding operations. After a button is clicked, the alert dialog will automatically close.

The second parameter of the tgxUIAlert.show method is `showCancel`, which is used to decide whether to display the Cancel button, with the default being false.

> Each call to show will generate a new instance of UIAlert.

tgx.UIAlert class is defined at [core_tgx/easy_ui_framework/alert](https://github.com/qilinshuyuan/OpenTGX/tree/main/tgx-core-cocos/assets/core_tgx/easy_ui_framework/alert) , developers should implement their own class, refer to: [UIAlert_Impl](https://github.com/qilinshuyuan/OpenTGX/tree/main/tgx-core-cocos/assets/module_basic/ui_alert)。

1. UI Prefab for UIAlert should be created in the project and attach `tgxL.ayout_UIAlert` to the root node.
2. Need to create a new class(e.g. `UIAlert_Impl` ) and inherit from `tgx.UIAlert`, then pass in the Prefab path and other parameters to the constructor.
3. Need to use the `@tgx_class(tgxUIAlert, UIAlert_Impl)`decorater, assign the implementation class of `tgx.UIAlert` as `UIAlert_Impl`.After doing that, `tgx.UIMgr` will use `UIAlert_Impl` class to create the new instance of `tgx.UIAlert`.

## Waiting - Lock Screen

Sometimes, we need to lock user operations or wait for a certain operation to complete. In such cases, we need to use the screen-locking wait feature.

`tgx.UIWaiting` is a singleton, and it can be shown as follows:

```ts
tgx.UIWaiting.show();
```

To hide it where necessary, execute:

```ts
tgx.UIWaiting.hide();
```

For the implementation of `tgx/UIWaiting`, please refer to the implementation of `UIAlert_Impl` to implement `UIWaiting_Impl`.

For more detials, please refer to the project: [tgx-core-cocos](https://github.com/qilinshuyuan/OpenTGX/tree/main/tgx-core-cocos).
