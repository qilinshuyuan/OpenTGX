
import { kfc } from "../../../KFC/KFC";
import { GameUILayer } from "../../../scripts/GameUILayer";
import { SubModule } from "../../../scripts/UIDef";

export class UIWaiting_Impl extends kfc.UIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayer.LOADING, kfc.Layout_UIWaiting);
    }
}

SubModule.attachImplClass(kfc.UIWaiting, UIWaiting_Impl);