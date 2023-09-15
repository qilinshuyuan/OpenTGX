# 分包与类

Cocos Creator 提供了分包功能，选中文件夹，设置分包属性，就可以将项目分成不同的包。

文件夹下的所有内容都会被单独打包，文件夹下的代码，也会生成分包。

分包中的代码和内容，必须在加载后才能被使用。

假如我们有分包 1,2,3。他们加载顺序是 1 -> 2 -> 3。

由于分包 2, 3 会在 1 之后加载，所以分包 1 的代码中，不能使用任何分包 2 和 3 中的代码。

假设，我们有三个类，分别属于 a, b， c。

- 分包 1 中: class A {}
- 分包 2 中: class B {}
- 分包 3 中: class C {}

- 分包 1，只能使用 class A。
- 分包 2，可以使用 class A 和 class B。
- 分包 3，可以使用 class A, class B 和 class C。

那如果我们真的想在分包 1 中使用 class B 和 class C，怎么办呢。

我们可以在分包 1 中，定义 `class B` 和 `class C`。

然后，在分包 2 中， class B 的实现如下。

```ts
class B_Impl extends B{
    //
}

B['__impl_class__'] = B_Impl;

```

我们把 class B 继承自 BaseB，并在 `B` 上，挂了一个 `__impl_class__` 属性。

当分包 2 被加载时，这个属性就会挂到 `B` 上。

那分包 1 如何知道  `B` 属于哪个模块呢？，这就需要在 `class B` 的定义时，给一个额外的信息。

```ts
class B{
    //如果有需要调用的函数和属性，可以在这里定义。
}

B[`__module_name__`] = 'module_2';
```

接下来，就可以实现我们想要的创建函数了。

```ts
function createFromModule(cls:any,cb:Function){
    let moduleName = cls[`__module_name__`];
    if(moduleName){
        assetManager.loadBundle(moduleName,(err,bundle)=>{
            cls = cls[`__impl_class__`] || cls;
            let obj = new cls();
            if(cb){
                cb(cls);
            }
        });
    }

}
```

>这个机制主要用于代码分割。大多数情况下，分包之间的代码是不需要交互的，不需要这么复杂的设计。

详情请参考：[ModuleContext](https://github.com/MrKylinGithub/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/base/ModuleContext.ts)。

> 目前 `ModuleContext` 主要用于 UI 管理。
