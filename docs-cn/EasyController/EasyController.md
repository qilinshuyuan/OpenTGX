# EasyController 使用说明

EasyController 可以看作是 EasyTouch、EasyJoystick、EasyCamera 的合体。

它包含以下主要特性：
- 虚拟摇杆
- 键盘、鼠标事件处理
- 角色控制器（移动、跳跃、动画切换、场景碰撞处理等）
- 摄像机（第三人称摄像机、漫游摄像机）

## 使用步骤
![](./images/EasyController/joystick.jpg)

### 添加虚拟摇杆
1、将 EasyController 目录下的 ui_joystick_panel 预制体拖动到 Canvas 下。

2、左下角绿色区域为移动区域，当在此区域点击时，会出现移动控制器，控制角色移动。（当用户按下 W、A、S、D 键时，和移动控制器效果一样。）


3、紫色区域为摄像机控制区域，当在此区域点击并移动时，可以操作摄像机旋转，当双指按住并移动时，可以调节摄像机观察距离。

4、当按下空格键时，可以触发角色的跳跃功能。

### 添加角色控制器
1、将 EasyController 目录下的 CharacterController 拖动给自己的角色。

2、如果角色要参与物理碰撞，请确保角色拥有碰撞器（Collider）组件和刚体（RigidBody）组件。

3、如果角色需要播放动画，请确保角色拥有动画组件。

4、角色控制器相关参数：
- velocity 向前移动速率
- jumpVelocity 起跳时的向上速度
- maxJumpTimes 最大跳跃次数，0 表示不能跳，1 表示只能跳一次，N 表示可以连续跳N次。
- idleAnimationClip 待机动画
- moveAnimationClip 移动动画
- jumpBeginAnimationClip 跳跃开始动画
- jumpLoopAnimationClip 跳跃循环动画
- jumpLandAnimationClip 跳跃落地动画

### 第三人称摄像机控制器
1、将 ThirdPersionCamera 组件挂到需要控制的摄像机节点上，一般为 Main Camera，主摄像机

2、ThirdPersionCamera 相关参数
- target 需要跟随的目标，一般是角色节点
- lookAtOffset 跟随目标点的偏移
- zoomSensitivity 缩放灵敏度
- lenMin 最小观察距离
- lenMax 最大观察距离
- len 默认观察距离
- rotateVHSeparately 水平和竖直方向是否单独旋转，开启后，同一时间只会进行水平或者竖直旋转。
- tweenTime 缓动时间 单位：秒

## 编程指南
1、当用户操作虚拟摇杆时，会派发对应的事件，事件由 director.getScene() 派发。

2、事件列表
- EasyControllerEvent.MOVEMENT 移动
- EasyControllerEvent.MOVEMENT_STOP 停止移动
- EasyControllerEvent.CAMERA_ROTATE 摄像机旋转
- EasyControllerEvent.CAMERA_ZOOM 摄像机缩放
- EasyControllerEvent.JUMP 跳

3、在自己的脚本中，使用 director.getScene().on 监听相应事件。

