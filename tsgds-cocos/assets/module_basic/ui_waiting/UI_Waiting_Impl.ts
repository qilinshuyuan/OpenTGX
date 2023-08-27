import { tgUIWaiting, tgLayout_UIWaiting, tgModuleContext } from "../../core_tsgds/tsgds";
import { GameUILayers } from "../../scripts/GameUILayers";


export class UIWaiting_Impl extends tgUIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayers.LOADING, tgLayout_UIWaiting);
    }
}

tgModuleContext.attachImplClass(tgUIWaiting, UIWaiting_Impl);