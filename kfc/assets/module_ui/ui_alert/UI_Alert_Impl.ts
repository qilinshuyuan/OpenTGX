import { kfcUIAlert, kfcLayout_UIAlert, kfcAttachImplClass } from "../../kfc/kfc";
import { GameUILayers } from "../../scripts/GameUILayers";

export class UIAlert_Impl extends kfcUIAlert{
    constructor(){
        super('ui_alert/UI_Alert',GameUILayers.ALERT, kfcLayout_UIAlert);
    }
}

kfcAttachImplClass(kfcUIAlert, UIAlert_Impl);

