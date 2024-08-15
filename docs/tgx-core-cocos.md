# tgx-core-cocos Documentation

tgx-core-cocos is the OpenTGX client framework based on Cocos Creator. Standalone projects can start from it.

## Asset Directory Description

- `core_tgx`: Core library of tgx-core-cocos
  - `base`: Some basic tool components, such as automatic screen adaptation, resource loading queue, sound playback manager, input manager, etc.
  - `easy_camera`: Roaming camera, FPS camera, third-person camera, 2D follow camera.
  - `easy_controller`: Virtual joystick (supporting 2D and 3D), buttons, camera controller.
  - `easy_ui_framework`: A minimalist MVVM-style UI framework, with unidirectional dependency on logical data. Supports UI layer management, UI automatic loader, UI event hosting, etc.
  - `tgx.ts`: The main class of tgx-core-cocos, you can access all classes by referencing it.
- module_basic: Basic bundle, based on loading necessary game resources and code.
- module_demo_rooster: Separate bundle, virtual joystick 3D example.
- module_demo_tank: Separate bundle, virtual joystick 2D example.
- module_extra: Cross-module example of popping up UI windows.
- res: Resources used.
- script: Scripts that must be placed in the main package.
- start: Initialization scene, used for loading and starting the project. Belongs to the main package.

Please refer to [Quick Start](./quick-start.md) for environment setup and project startup.

## Quick Start Project

### Introduction

Copy all the contents of the assets into a new project. Be careful not to overwrite scripts with the same name.

### Modify the Start Scene

Modify the content in the start scene and the content of the Start.ts script, manage preloading well, and try to shorten the startup time as much as possible.

### Handle module_basic

`module_basic` will be set as the default bundle at startup, in the Start.ts, and will be called after the scene is loaded. It is recommended to put common UI, materials, scripts, etc., into this package.

At the same time, delete unnecessary content. Ensure the content is clean.

### Delete Other Packages

If the rest of the content is not needed, delete it.

### Add Other Packages

Add new bundles according to project requirements and formulate a good loading strategy. Generally, the content that can be seen in the package should be put into the package. Including materials, prefabs, scripts, UI, etc.

### Modify Definitions

Scenes, bundles, etc., in the project are not directly used with strings but are predefined as static properties. Make changes before use.

- scripts/GameUILayers.ts defines the UI layers needed in the project.
- scripts/ModuleDef.ts defines the names of the bundles needed in the project.

- scripts/SceneDef.ts defines the scene names needed in the project.
  > Scene definitions that need to be synthesized through code do not need to be written here.

## res

res is not a bundle but a resource placed in the main package. Resources in the main package that are not referenced anywhere will not be packaged into the program version.

### 3D Models, Animations

3D models, animation materials (such as FBX, glTF, etc.), it is recommended to place them in res and not directly into any bundle. In the bundle, reference the materials that need to be used, or create the corresponding prefab. This can avoid the bundle being too large.

### Images and Others

For images or files that are clearly to be loaded alone, they need to be placed in the corresponding bundle to be loaded, otherwise, it is recommended to place them in the res directory (or other directories of the main package).

In this way, only materials referenced by scenes, prefabs, animations, etc., in the bundle will be included in the bundle.

### Audio

Since audio uses dynamic loading, it needs to be placed in the corresponding bundle, and the correct bundle name should be passed when playing.

### Do Not Use the resources Directory

Since the resources directory list will be loaded before the main. Therefore, do not use the resources directory, which can make the start scene start faster.

For more information, please refer to [OpenTGX Developer Documentation](./developer-guide.md).
