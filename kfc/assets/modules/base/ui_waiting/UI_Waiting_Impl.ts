
import { kfcLayout_UIWaiting, kfcUIWaiting } from "../../../kfc/kfc";
import { GameUILayer } from "../../../scripts/GameUILayers";
import { SubModule } from "../../../scripts/UIDef";

export class UIWaiting_Impl extends kfcUIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayer.LOADING, kfcLayout_UIWaiting);
    }
}

SubModule.attachImplClass(kfcUIWaiting, UIWaiting_Impl);