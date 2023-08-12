import { Layout_UIAlert } from "../../../KFramework/kylins_ui_framework/alert/Layout_UIAlert";
import { UIAlert } from "../../../KFramework/kylins_ui_framework/alert/UIAlert";
import { GameUILayer } from "../../../scripts/GameUILayer";
import { SubModule } from "../../../scripts/UIDef";

export class UIAlert_Impl extends UIAlert{
    constructor(){
        super('ui_alert/UI_Alert',GameUILayer.ALERT, Layout_UIAlert);
    }
}

SubModule.attachImplClass(UIAlert, UIAlert_Impl);

