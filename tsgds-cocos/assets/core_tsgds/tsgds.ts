//tg is short for ts gds

//base
export { AudioMgr as tgAudioMgr } from "./base/AudioMgr";
export { InputMgr as tgInputMgr } from "./base/InputMgr";
export { ResourceMgr as tgResourceMgr } from "./base/ResourceMgr";
export { SafeJSON as tgSafeJSON } from "./base/SafeJSON";
export { ResolutionAutoFit as tgResolutionAutoFit } from "./base/ResolutionAutoFit";
export { ModuleContext as tgModuleContext } from "./base/ModuleContext";

//camera
export { FPSCamera as tgFPSCamera } from "./easy_camera/FPSCamera";
export { FollowCamera2D as tgFollowCamera2D } from "./easy_camera/FollowCamera2D";
export { FreeCamera as tgFreeCamera } from "./easy_camera/FreeCamera";
export { ThirdPersonCamera as tgThirdPersonCamera } from "./easy_camera/ThirdPersonCamera";

//easy controller
export { CharacterMovement as tgCharacterMovement } from "./easy_controller/CharacterMovement";
export { CharacterMovement2D as tgCharacterMovement2D } from "./easy_controller/CharacterMovement2D";
export { EasyController as tgEasyController, EasyControllerEvent as tgEasyControllerEvent } from "./easy_controller/EasyController";
export { ThirdPersonCameraCtrl as tgThirdPersonCameraCtrl } from "./easy_controller/ThirdPersonCameraCtrl";
export { UI_Joystick as tgUI_Joystick } from "./easy_controller/UI_Joystick";

//ui framework
export { Layout_UIAlert as tgLayout_UIAlert } from "./easy_ui_framework/alert/Layout_UIAlert";
export { UIAlert as tgUIAlert } from "./easy_ui_framework/alert/UIAlert";
export { Layout_UIWaiting as tgLayout_UIWaiting } from "./easy_ui_framework/waiting/Layout_UIWaiting";
export { UIWaiting as tgUIWaiting } from "./easy_ui_framework/waiting/UIWaiting";
export { EventDispatcher as tgEventDispatcher } from "./easy_ui_framework/EventDispatcher";
export { UIController as tgUIController } from "./easy_ui_framework/UIController";
export { UILayers as tgUILayers, UILayerNames as gdsUILayerNames } from "./easy_ui_framework/UILayers";
export { UIMgr as tgUIMgr } from "./easy_ui_framework/UIMgr";