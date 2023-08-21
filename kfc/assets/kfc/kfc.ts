//kfc is short for Kylins Framework Core

//base
export { AudioMgr as kfcAudioMgr } from "./kylins_base/AudioMgr";
export { InputMgr as kfcInputMgr } from "./kylins_base/InputMgr";
export { ResourceMgr as kfcResourceMgr } from "./kylins_base/ResourceMgr";
export { SafeJSON as kfcSafeJSON } from "./kylins_base/SafeJSON";
export { ResolutionAutoFit as kfcResolutionAutoFit } from "./kylins_base/ResolutionAutoFit";

//camera
export { FPSCamera as kfcFPSCamera } from "./kylins_camera/FPSCamera";
export { FollowCamera2D as kfcFollowCamera2D } from "./kylins_camera/FollowCamera2D";
export { FreeCamera as kfcFreeCamera } from "./kylins_camera/FreeCamera";
export { ThirdPersonCamera as kfcThirdPersonCamera } from "./kylins_camera/ThirdPersonCamera";

//easy controller
export { CharacterMovement as kfcCharacterMovement } from "./kylins_easy_controller/CharacterMovement";
export { CharacterMovement2D as kfcCharacterMovement2D } from "./kylins_easy_controller/CharacterMovement2D";
export { EasyController as kfcEasyController, EasyControllerEvent as kfcEasyControllerEvent } from "./kylins_easy_controller/EasyController";
export { ThirdPersonCameraCtrl as kfcThirdPersonCameraCtrl } from "./kylins_easy_controller/ThirdPersonCameraCtrl";
export { UI_Joystick as kfcUI_Joystick } from "./kylins_easy_controller/UI_Joystick";

//ui framework
export { Layout_UIAlert as kfcLayout_UIAlert } from "./kylins_ui_framework/alert/Layout_UIAlert";
export { UIAlert as kfcUIAlert } from "./kylins_ui_framework/alert/UIAlert";
export { Layout_UIWaiting as kfcLayout_UIWaiting } from "./kylins_ui_framework/waiting/Layout_UIWaiting";
export { UIWaiting as kfcUIWaiting } from "./kylins_ui_framework/waiting/UIWaiting";
export { EventDispatcher as kfcEventDispatcher } from "./kylins_ui_framework/EventDispatcher";
export { UIController as kfcUIController } from "./kylins_ui_framework/UIController";
export { UILayers as kfcUILayers, UILayerNames as kfcUILayerNames } from "./kylins_ui_framework/UILayers";
export { UIMgr as kfcUIMgr } from "./kylins_ui_framework/UIMgr";