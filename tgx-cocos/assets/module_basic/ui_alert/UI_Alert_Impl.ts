
import { tgxLayout_UIAlert, tgxModuleContext, tgxUIAlert } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";

export class UIAlert_Impl extends tgxUIAlert {
    constructor() {
        super('ui_alert/UI_Alert', GameUILayers.ALERT, tgxLayout_UIAlert);
    }
}

tgxModuleContext.attachImplClass(tgxUIAlert, UIAlert_Impl);