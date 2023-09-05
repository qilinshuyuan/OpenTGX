//base
export { AudioMgr as tgxAudioMgr } from "./base/AudioMgr";
export { InputMgr as tgxInputMgr } from "./base/InputMgr";
export { ResourceMgr as tgxResourceMgr } from "./base/ResourceMgr";
export { SafeJSON as tgxSafeJSON } from "./base/SafeJSON";
export { ResolutionAutoFit as tgxResolutionAutoFit } from "./base/ResolutionAutoFit";
export { ModuleContext as tgxModuleContext } from "./base/ModuleContext";

//camera
export { FPSCamera as tgxFPSCamera } from "./easy_camera/FPSCamera";
export { FollowCamera2D as tgxFollowCamera2D } from "./easy_camera/FollowCamera2D";
export { FreeCamera as tgxFreeCamera } from "./easy_camera/FreeCamera";
export { ThirdPersonCamera as tgxThirdPersonCamera } from "./easy_camera/ThirdPersonCamera";

//easy controller
export { CharacterMovement as tgxCharacterMovement } from "./easy_controller/CharacterMovement";
export { CharacterMovement2D as tgxCharacterMovement2D } from "./easy_controller/CharacterMovement2D";
export { EasyController as tgxEasyController, EasyControllerEvent as tgxEasyControllerEvent } from "./easy_controller/EasyController";
export { ThirdPersonCameraCtrl as tgxThirdPersonCameraCtrl } from "./easy_controller/ThirdPersonCameraCtrl";
export { UI_Joystick as tgxUI_Joystick } from "./easy_controller/UI_Joystick";

//ui framework
export { Layout_UIAlert as tgxLayout_UIAlert } from "./easy_ui_framework/alert/Layout_UIAlert";
export { UIAlert as tgxUIAlert } from "./easy_ui_framework/alert/UIAlert";
export { Layout_UIWaiting as tgxLayout_UIWaiting } from "./easy_ui_framework/waiting/Layout_UIWaiting";
export { UIWaiting as tgxUIWaiting } from "./easy_ui_framework/waiting/UIWaiting";
export { EventDispatcher as tgxEventDispatcher } from "./easy_ui_framework/EventDispatcher";
export { UIController as tgxUIController } from "./easy_ui_framework/UIController";
export { UILayers as tgxUILayers, UILayerNames as gdsUILayerNames } from "./easy_ui_framework/UILayers";
export { UIMgr as tgxUIMgr } from "./easy_ui_framework/UIMgr";