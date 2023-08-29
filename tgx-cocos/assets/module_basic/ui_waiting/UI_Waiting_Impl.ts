import { tgxUIWaiting, tgxLayout_UIWaiting, tgxModuleContext } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";


export class UIWaiting_Impl extends tgxUIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayers.LOADING, tgxLayout_UIWaiting);
    }
}

tgxModuleContext.attachImplClass(tgxUIWaiting, UIWaiting_Impl);