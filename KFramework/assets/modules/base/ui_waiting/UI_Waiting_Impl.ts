
import { UIWaiting } from "../../../KFramework/kylins_ui_framework/waiting/UIWaiting";
import { Layout_UIWaiting } from "../../../KFramework/kylins_ui_framework/waiting/Layout_UIWaiting";
import { GameUILayer } from "../../../scripts/GameUILayer";
import { SubModule } from "../../../scripts/UIDef";

export class UIWaiting_Impl extends UIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayer.LOADING, Layout_UIWaiting);
    }
}

SubModule.attachImplClass(UIWaiting, UIWaiting_Impl);