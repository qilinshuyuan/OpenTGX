import { tgUIWaiting, tgLayout_UIWaiting, tgModuleClass } from "../../core_tsgds/tsgds";
import { GameUILayers } from "../../scripts/GameUILayers";


export class UIWaiting_Impl extends tgUIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayers.LOADING, tgLayout_UIWaiting);
    }
}

tgModuleClass.attachImplClass(tgUIWaiting, UIWaiting_Impl);