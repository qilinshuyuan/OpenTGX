import { UIController } from "../KFramework/kylins_ui_framework/UIController";
import { Layout_AboutMe } from "./Layout_AboutMe";
import { GameUILayer } from "../ui_modules_basic/GameUILayer";

export class UI_AboutMe extends UIController{
    constructor(){
        super('UI_AboutMe', GameUILayer.POPUP0, Layout_AboutMe, 'ui_modules_about');
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