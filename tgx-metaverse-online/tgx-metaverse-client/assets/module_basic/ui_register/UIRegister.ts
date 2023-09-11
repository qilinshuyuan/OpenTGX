
import { UIMgr } from "../../core_tgx/easy_ui_framework/UIMgr";
import { tgxUIAlert, tgxUIController, tgxUIMgr, tgxUIWaiting } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { NetUtil } from "../scripts/NetUtil";
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
            if(layout.edtAccount.string.length < 4){
                tgxUIAlert.show('用户名至少需要 4 个字符！');
                return;
            }
            if(layout.edtPassword.string.length < 6){
                tgxUIAlert.show('密码至少需要 6 个字符！');
                return;
            }
            if(layout.edtPassword.string != layout.edtPasswordConfirm.string){
                tgxUIAlert.show('两次密码不一样！');
                return;
            }

            this.doRegister(layout.edtAccount.string, layout.edtPassword.string);
        });
    }

    async doRegister(account:string,password:string){
        tgxUIWaiting.show('注册中');
        let ret = await NetUtil.callApiFromLobby('Register', {account:account,password:password});
        tgxUIWaiting.hide();
        if (!ret.isSucc) {
            if(ret.err.message == 'USER_HAS_BEEN_EXIST'){
                tgxUIAlert.show('用户名已被使用！');
            }
            return;
        }

        tgxUIAlert.show('注册成功，返回登录').onClick(()=>{
            this.hide();
            UIMgr.inst.showUI(UILogin,((ui:UILogin)=>{
                ui.autoFill(account,password);
            }));
        });
    }
}
