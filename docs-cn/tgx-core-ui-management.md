# OpenTGX UI 管理器

## 初始化

```ts
tgxUIMgr.inst.setup()
```

## UI 分层

将不同的 UI 类别放入不同的层级来确保显示关系，是常见的需求。OpenTGX 内置了这个功能。


OpenTGX 提供了一套不依赖于场景的 UI 管理机制，你可以在任何时候弹出已定义的窗口。比如：
```ts
tgxUIMgr.inst.showUI(UI_GameHUD);
```

`UI_GameHUD` 是对应的 UIController 子类，它是一个 UI 的代表，比起使用 字符串，直接使用类名会让整个项目代码可读性更好，更加便于维护。

同时，OpenTGX Core 还内置了 Alert 和 Waiting （转圈等待），可以很方便地调用。

## 提示框（Alert）

```ts
tgxUIAlert.show('你确定要继续吗？',true).onClick((isOK:boolean)=>{
    if(isOK){
        //TO DO
    }
});
```
`tgxUIAlert` 会弹出一个提示框，并阻断点击事件。 当用户点确定或者取消时，会调用 `onClick` 指定的回调函数。用户根据 `isOK` 来判断点击的按钮并做对应的操作。 按钮点击后，提示框会自动关闭。 

`tgxUIAlert.show` 方法的第二个参数是 `showCancel`，用于决定是否要显示取消按钮，默认为 `false`。

## 锁屏等待（Waiting）

有时候，我们需要锁定用户操作，或者等待某个操作完成。则需要用到锁屏等待功能。只需要像下面一样操作就行。

```ts
tgxUIWating.show();
```

在需要隐藏它的地方，执行：
```ts
tgxUIWating.hide();
```