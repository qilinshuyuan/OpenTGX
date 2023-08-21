
import { kfcUIAlert, kfcLayout_UIAlert } from "../../../kfc/kfc";
import { GameUILayer } from "../../../scripts/GameUILayers";
import { SubModule } from "../../../scripts/UIDef";

export class UIAlert_Impl extends kfcUIAlert{
    constructor(){
        super('ui_alert/UI_Alert',GameUILayer.ALERT, kfcLayout_UIAlert);
    }
}

SubModule.attachImplClass(kfcUIAlert, UIAlert_Impl);

