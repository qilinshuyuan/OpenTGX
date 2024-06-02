import { GameUILayers } from "../../scripts/GameUILayers";
import { ModuleDef } from "../../scripts/ModuleDef";

@tgx_class(ModuleDef.BASIC,tgx.UIWaiting)
export class UIWaiting_Impl extends tgx.UIWaiting{
    constructor(){
        super('ui_waiting/UI_Waiting',GameUILayers.LOADING, tgx.Layout_UIWaiting);
    }
}