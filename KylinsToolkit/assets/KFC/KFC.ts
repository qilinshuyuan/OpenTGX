//KFC is short for KylinsToolkit Framework Core

import { AudioMgr } from "./kylins_base/AudioMgr";
import { InputMgr } from "./kylins_base/InputMgr";
import { ResourceMgr } from "./kylins_base/ResourceMgr";
import { SafeJSON } from "./kylins_base/SafeJSON";
import { CharacterMovement } from "./kylins_easy_controller/CharacterMovement";
import { CharacterMovement2D } from "./kylins_easy_controller/CharacterMovement2D";
import { EasyController, EasyControllerEvent } from "./kylins_easy_controller/EasyController";
import { UI_Joystick } from "./kylins_easy_controller/UI_Joystick";
import { UIController } from "./kylins_ui_framework/UIController";
import { UIMgr } from "./kylins_ui_framework/UIMgr";
import { Layout_UIAlert } from "./kylins_ui_framework/alert/Layout_UIAlert";
import { UIAlert } from "./kylins_ui_framework/alert/UIAlert";
import { Layout_UIWaiting } from "./kylins_ui_framework/waiting/Layout_UIWaiting";
import { UIWaiting } from "./kylins_ui_framework/waiting/UIWaiting";

export class kfc{
    public static AudioMgr = AudioMgr;
    public static InputMgr = InputMgr;
    public static ResourceMgr = ResourceMgr;
    public static SafeJSON = SafeJSON;
    public static UIController = UIController;

    public static UI_Joystick = UI_Joystick;
    public static EasyController = EasyController;
    public static EasyControllerEvent = EasyControllerEvent;
    public static CharacterMovement2D = CharacterMovement2D;
    public static CharacterMovement = CharacterMovement;

    public static Layout_UIAlert = Layout_UIAlert;
    public static UIAlert = UIAlert;

    public static Layout_UIWaiting = Layout_UIWaiting;
    public static UIWaiting = UIWaiting;


    //singleton
    public static uiMgr = UIMgr.inst;


    private static _audioMgr: AudioMgr;
    public static get audioMgr(): AudioMgr {
        if (this._audioMgr == null) {
            this._audioMgr = new AudioMgr();
        }
        return this._audioMgr;
    }
}