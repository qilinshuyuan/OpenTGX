import { kfcUIAlert, kfcLayout_UIAlert, kfcAttachImplClass, kfcAttachModule } from "../../kfc/kfc";
import { GameUILayers } from "../../scripts/GameUILayers";
import { ModuleDef } from "../../scripts/ModuleDef";

export class UIAlert_Impl extends kfcUIAlert{
    constructor(){
        super('ui_alert/UI_Alert',GameUILayers.ALERT, kfcLayout_UIAlert);
    }
}

kfcAttachImplClass(kfcUIAlert, UIAlert_Impl);

