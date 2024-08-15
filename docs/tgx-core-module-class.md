# Packaging and Classes

Cocos Creator offers a packaging feature. By selecting a folder and setting the packaging attributes, you can divide the project into different packages.

All content under the folder will be packaged separately, and the code under the folder will also generate a package.

The code and content in the package must be used only after loading.

Suppose we have packages 1, 2, and 3, and their loading order is 1 -> 2 -> 3.

Since packages 2 and 3 will be loaded after 1, the code in package 1 cannot use any code from packages 2 and 3.

Assuming we have three classes, each belonging to a, b, and c.

- In package 1: class A {}
- In package 2: class B {}
- In package 3: class C {}

- Package 1 can only use class A.
- Package 2 can use class A and class B.
- Package 3 can use class A, class B, and class C.

So, if we really want to use class B and class C in package 1, what should we do?

We can define `class B` and `class C` in package 1.

Then, in package 2, the implementation of class B is as follows.

```ts
class B_Impl extends B {
    //
}

B['__impl_class__'] = B_Impl;

```

We inherit class B from BaseB and hang a __impl_class__ attribute on B.

When package 2 is loaded, this attribute will be hung on B.

So, how does package 1 know which module B belongs to? This requires giving additional information when defining class B.

```ts
class B{
    // If there are functions and properties that need to be called, they can be defined here.
}

B[`__module_name__`] = 'module_2';
```

Next, we can implement the creation function we want.

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

>This mechanism is mainly used for code splitting. In most cases, there is no need for interaction between packages, and such a complex design is not required.

For more details, please refer to: [ModuleContext](https://github.com/qilinshuyuan/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/base/ModuleContext.ts)。

> At present, `ModuleContext` is mainly used for UI management.
