
import { kfcUIAlert, kfcLayout_UIAlert, kfcAttachImplClass } from "../../../kfc/kfc";
import { GameUILayer } from "../../../scripts/GameUILayers";
import { SubModule } from "../../../scripts/UIDef";

export class UIAlert_Impl extends kfcUIAlert{
    constructor(){
        super('ui_alert/UI_Alert',GameUILayer.ALERT, kfcLayout_UIAlert);
    }
}

kfcAttachImplClass(kfcUIAlert, UIAlert_Impl);

