import { GameUILayers } from "../../scripts/GameUILayers";
import { ModuleDef } from "../../scripts/ModuleDef";

@tgx_class(ModuleDef.BASIC,tgx.UIAlert)
export class UIAlert_Impl extends tgx.UIAlert {
    constructor() {
        super('ui_alert/UI_Alert', GameUILayers.ALERT, tgx.Layout_UIAlert);
    }
}