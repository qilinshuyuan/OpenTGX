
import { tgxUIController, tgxUIMgr } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { UILogin } from "../ui_login/UILogin";
import { Layout_UIRegister } from "./Layout_UIRegister";

export class UIRegister extends tgxUIController {
    constructor() {
        super('ui_register/ui_register', GameUILayers.POPUP, Layout_UIRegister);
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_UIRegister;
        this.onButtonEvent(layout.btnBackToLogin,()=>{
            this.hide();
            tgxUIMgr.inst.showUI(UILogin);
        });

        this.onButtonEvent(layout.btnRegister,()=>{

        });
    }
}