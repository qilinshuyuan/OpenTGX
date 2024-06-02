
//basic
import { ISceneInfo as tgxISceneInfo, SceneUtil as tgxSceneUtil } from "./base/SceneUtils";
import { AudioMgr as tgxAudioMgr } from "./base/AudioMgr";
import { InputMgr as tgxInputMgr } from "./base/InputMgr";
import { ResourceMgr as tgxResourceMgr } from "./base/ResourceMgr";
import { SafeJSON as tgxSafeJSON } from "./base/SafeJSON";
import { ResolutionAutoFit as tgxResolutionAutoFit } from "./base/ResolutionAutoFit";
import { ModuleContext as tgxModuleContext } from "./base/ModuleContext";

//camera
import { FPSCamera as tgxFPSCamera } from "./easy_camera/FPSCamera";
import { FollowCamera2D as tgxFollowCamera2D } from "./easy_camera/FollowCamera2D";
import { FreeCamera as tgxFreeCamera } from "./easy_camera/FreeCamera";
import { ThirdPersonCamera as tgxThirdPersonCamera } from "./easy_camera/ThirdPersonCamera";

//easy controller
import { CharacterMovement as tgxCharacterMovement } from "./easy_controller/CharacterMovement";
import { CharacterMovement2D as tgxCharacterMovement2D } from "./easy_controller/CharacterMovement2D";
import { EasyController as tgxEasyController, EasyControllerEvent as tgxEasyControllerEvent } from "./easy_controller/EasyController";
import { ThirdPersonCameraCtrl as tgxThirdPersonCameraCtrl } from "./easy_controller/ThirdPersonCameraCtrl";
import { UIJoystick as tgxUIJoystick } from "./easy_controller/UIJoystick";

//ui framework
import { UIAlert as tgxUIAlert, Layout_UIAlert as tgxLayout_UIAlert } from "./easy_ui_framework/alert/UIAlert";
import { Layout_UIWaiting as tgxLayout_UIWaiting } from "./easy_ui_framework/waiting/Layout_UIWaiting";
import { UIWaiting as tgxUIWaiting } from "./easy_ui_framework/waiting/UIWaiting";
import { EventDispatcher as tgxEventDispatcher } from "./easy_ui_framework/EventDispatcher";
import { UIController as tgxUIController } from "./easy_ui_framework/UIController";
import { UILayers as tgxUILayers, UILayerNames as tgxUILayerNames } from "./easy_ui_framework/UILayers";
import { UIMgr as tgxUIMgr } from "./easy_ui_framework/UIMgr";
import { URLUtils as tgxURLUtils } from "./base/URLUtils";

namespace __tgx__ {
    export const ISceneInfo = tgxISceneInfo;
    export type ISceneInfo = tgxISceneInfo;
    export const SceneUtil = tgxSceneUtil;
    export type SceneUtil = tgxSceneUtil;
    /**
     * 音频管理器
     */
    export const AudioMgr = tgxAudioMgr;
    export type AudioMgr = tgxAudioMgr;
    export const InputMgr = tgxInputMgr;
    export type InputMgr = tgxInputMgr;
    export const ResourceMgr = tgxResourceMgr;
    export type ResourceMgr = tgxResourceMgr;
    export const SafeJSON = tgxSafeJSON;
    export type SafeJSON = tgxSafeJSON;
    export const ResolutionAutoFit = tgxResolutionAutoFit;
    export type ResolutionAutoFit = tgxResolutionAutoFit;
    export const ModuleContext = tgxModuleContext;
    export type ModuleContext = tgxModuleContext;

    //camera
    export const FPSCamera = tgxFPSCamera;
    export type FPSCamera = tgxFPSCamera;
    export const FollowCamera2D = tgxFollowCamera2D;
    export type FollowCamera2D = tgxFollowCamera2D;
    export const FreeCamera = tgxFreeCamera;
    export type FreeCamera = tgxFPSCamera;
    export const ThirdPersonCamera = tgxThirdPersonCamera;
    export type ThirdPersonCamera = tgxThirdPersonCamera;
    //easy controller
    export const CharacterMovement = tgxCharacterMovement;
    export type CharacterMovement = tgxCharacterMovement;
    export const CharacterMovement2D = tgxCharacterMovement2D;
    export type CharacterMovement2D = tgxCharacterMovement2D;
    export const EasyController = tgxEasyController;
    export type EasyController = tgxEasyController;
    export const EasyControllerEvent = tgxEasyControllerEvent;
    export type EasyControllerEvent = tgxEasyControllerEvent;
    export const ThirdPersonCameraCtrl = tgxThirdPersonCameraCtrl;
    export type ThirdPersonCameraCtrl = tgxThirdPersonCameraCtrl;
    export const UIJoystick = tgxUIJoystick;
    export type UIJoystick = tgxUIJoystick;

    //ui framework
    export const Layout_UIAlert = tgxLayout_UIAlert;
    export type Layout_UIAlert = tgxLayout_UIAlert;
    export const UIAlert = tgxUIAlert;
    export type UIAlert = tgxUIAlert;
    export const Layout_UIWaiting = tgxLayout_UIWaiting;
    export type Layout_UIWaiting = tgxLayout_UIWaiting;
    export const UIWaiting = tgxUIWaiting;
    export type UIWaiting = tgxUIWaiting;
    export const EventDispatcher = tgxEventDispatcher;
    type EventDispatcher = tgxEventDispatcher;
    export const UIController = tgxUIController;
    export type UIController = tgxUIController;
    export const UILayers = tgxUILayers;
    export type UILayers = tgxUILayers;
    export const UILayerNames = tgxUILayerNames;
    export const UIMgr = tgxUIMgr;
    export type UIMgr = tgxUIMgr;
    export const URLUtils = tgxURLUtils;
    export type URLUtils = tgxURLUtils;
};


(globalThis as any)['tgx'] = __tgx__;


//下面是声明，编程时提示。

declare global {
    namespace globalThis {
        namespace tgx {
            const ISceneInfo: typeof tgxISceneInfo;
            type ISceneInfo = tgxISceneInfo;
            const SceneUtil: typeof tgxSceneUtil;
            type SceneUtil = tgxSceneUtil;
            /**
             * 音频管理器
             */
            const AudioMgr: typeof tgxAudioMgr;
            type AudioMgr = tgxAudioMgr;
            const InputMgr: typeof tgxInputMgr;
            type InputMgr = tgxInputMgr;
            const ResourceMgr: typeof tgxResourceMgr;
            type ResourceMgr = tgxResourceMgr;
            const SafeJSON: typeof tgxSafeJSON;
            type SafeJSON = tgxSafeJSON;
            const ResolutionAutoFit: typeof tgxResolutionAutoFit;
            type ResolutionAutoFit = tgxResolutionAutoFit
            const ModuleContext: typeof tgxModuleContext;
            type ModuleContext = tgxModuleContext;

            //camera
            const FPSCamera: typeof tgxFPSCamera;
            type FPSCamera = tgxFPSCamera;
            const FollowCamera2D: typeof tgxFollowCamera2D;
            type FollowCamera2D = tgxFollowCamera2D;
            const FreeCamera: typeof tgxFreeCamera;
            type FreeCamera = tgxFreeCamera;
            const ThirdPersonCamera: typeof tgxThirdPersonCamera;
            type ThirdPersonCamera = tgxThirdPersonCamera;

            //easy controller
            const CharacterMovement: typeof tgxCharacterMovement;
            type CharacterMovement = tgxCharacterMovement;
            const CharacterMovement2D: typeof tgxCharacterMovement2D;
            type CharacterMovement2D = tgxCharacterMovement2D;
            const EasyController: typeof tgxEasyController;
            type EasyController = tgxEasyController;
            const EasyControllerEvent: typeof tgxEasyControllerEvent;
            type EasyControllerEvent = tgxEasyControllerEvent;
            const ThirdPersonCameraCtrl: typeof tgxThirdPersonCameraCtrl;
            type ThirdPersonCameraCtrl = tgxThirdPersonCameraCtrl;
            const UIJoystick: typeof tgxUIJoystick;
            type UIJoystick = tgxUIJoystick;

            //ui framework
            const Layout_UIAlert: typeof tgxLayout_UIAlert;
            type Layout_UIAlert = tgxLayout_UIAlert;
            const UIAlert: typeof tgxUIAlert;
            type UIAlert = tgxUIAlert;
            const Layout_UIWaiting: typeof tgxLayout_UIWaiting;
            type Layout_UIWaiting = tgxLayout_UIWaiting;
            const UIWaiting: typeof tgxUIWaiting;
            type UIWaiting = tgxUIWaiting;
            const EventDispatcher: typeof tgxEventDispatcher;
            type EventDispatcher = tgxEventDispatcher;
            const UIController: typeof tgxUIController;
            type UIController = tgxUIController;
            const UILayers: typeof tgxUILayers;
            type UILayers = tgxUILayers;
            const UILayerNames: string[];
            const UIMgr: typeof tgxUIMgr;
            type UIMgr = tgxUIMgr;
            const URLUtils: typeof tgxURLUtils;
            type URLUtils = tgxURLUtils;
        }
        /**
         * @en to ensure tgx_class is loaded before all other scripts, the implementation is placed in tgx_class.js and loaded as a plugin.
         * @zh tgx_class 需要确保在所有脚本加载之前加载，所以 tgx_class 真正的定义放在了 tgx_class.js 里，并使用插件方式加载。
        */
        const tgx_class: (module: string, superCls?: Function) => any;
    }
}