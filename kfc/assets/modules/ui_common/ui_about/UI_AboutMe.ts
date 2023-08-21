
import { GameUILayer } from "../../../scripts/GameUILayers";
import { UI_AboutMe, SubModule } from "../../../scripts/UIDef";
import { Layout_AboutMe } from "./Layout_AboutMe";

export class UI_AboutMe_Impl extends UI_AboutMe{
    constructor(){
        super('ui_about/UI_AboutMe', GameUILayer.POPUP, Layout_AboutMe);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_AboutMe;
        this.onButtonEvent(layout.btnClose,()=>{
            this.hide();
        });
    }
}

SubModule.attachImplClass(UI_AboutMe,UI_AboutMe_Impl);