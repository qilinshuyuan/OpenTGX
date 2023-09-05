
import { tgxUIAlert, tgxUIController, tgxUIMgr } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { UIRegister } from "../ui_register/UIRegister";
import { Layout_UILogin } from "./Layout_UILogin";

export class UILogin extends tgxUIController {
    constructor() {
        super('ui_login/ui_login', GameUILayers.POPUP, Layout_UILogin);
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_UILogin;
        this.onButtonEvent(layout.btnLogin,()=>{
            tgxUIAlert.show('密码不正确!');
        });

        this.onButtonEvent(layout.btnRegister,()=>{
            this.hide();
            tgxUIMgr.inst.showUI(UIRegister);
        });
    }
}