
import { tgLayout_UIAlert, tgModuleClass, tgUIAlert } from "../../core_tsgds/tsgds";
import { GameUILayers } from "../../scripts/GameUILayers";

export class UIAlert_Impl extends tgUIAlert {
    constructor() {
        super('ui_alert/UI_Alert', GameUILayers.ALERT, tgLayout_UIAlert);
    }
}

tgModuleClass.attachImplClass(tgUIAlert, UIAlert_Impl);