import { kfcUIWaiting, kfcLayout_UIWaiting, kfcAttachImplClass } from "../../kfc/kfc";
import { GameUILayers } from "../../scripts/GameUILayers";


export class UIWaiting_Impl extends kfcUIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayers.LOADING, kfcLayout_UIWaiting);
    }
}

kfcAttachImplClass(kfcUIWaiting, UIWaiting_Impl);