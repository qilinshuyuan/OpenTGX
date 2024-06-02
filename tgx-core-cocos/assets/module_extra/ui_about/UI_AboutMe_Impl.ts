import { GameUILayers } from "../../scripts/GameUILayers";
import { ModuleDef } from "../../scripts/ModuleDef";
import { UI_AboutMe } from "../../scripts/UIDef";
import { Layout_AboutMe } from "./Layout_AboutMe";

@tgx_class(ModuleDef.EXTRA,UI_AboutMe)
export class UI_AboutMe_Impl extends UI_AboutMe {
    constructor() {
        super('ui_about/UI_AboutMe', GameUILayers.POPUP, Layout_AboutMe);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_AboutMe;
        this.onButtonEvent(layout.btnClose, () => {
            this.close();
        });
    }
}