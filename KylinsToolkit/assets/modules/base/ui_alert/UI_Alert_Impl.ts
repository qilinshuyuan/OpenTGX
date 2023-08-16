import { kfc } from "../../../KFC/KFC";
import { GameUILayer } from "../../../scripts/GameUILayer";
import { SubModule } from "../../../scripts/UIDef";

export class UIAlert_Impl extends kfc.UIAlert{
    constructor(){
        super('ui_alert/UI_Alert',GameUILayer.ALERT, kfc.Layout_UIAlert);
    }
}

SubModule.attachImplClass(kfc.UIAlert, UIAlert_Impl);

