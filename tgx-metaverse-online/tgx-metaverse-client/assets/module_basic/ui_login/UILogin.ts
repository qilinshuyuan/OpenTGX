import { tgxUIAlert, tgxUIController, tgxUIMgr, tgxUIWaiting } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { UserLocalCache } from "../scripts/UserLocalCache";
import { UserMgr } from "../scripts/UserMgr";
import { UIRegister } from "../ui_register/UIRegister";
import { Layout_UILogin } from "./Layout_UILogin";
import { SceneDef, SceneUtil } from "../../scripts/SceneDef";
import { NetUtil } from "../../module_metaverse/scripts/models/NetUtil";

export class UILogin extends tgxUIController {
    constructor() {
        super('ui_login/ui_login', GameUILayers.POPUP, Layout_UILogin);
    }

    private _oldAccount = '';
    private _oldPassword = '';

    protected onCreated(): void {
        let layout = this.layout as Layout_UILogin;
        this.onButtonEvent(layout.btnLogin, () => {
            let newAccount = layout.edtAccount.string;
            let newPassword = layout.edtPassword.string;
            if (newAccount != this._oldAccount || newPassword != this._oldPassword) {
                //if account or password has been changed, alert to store.
                tgxUIAlert.show('是否保存账号和密码？', true).onClick((ok: boolean) => {
                    if (ok) {
                        UserLocalCache.inst.storeAccount(layout.edtAccount.string);
                        UserLocalCache.inst.storePassword(layout.edtPassword.string);
                    }
                    this.doLogin(newAccount, newPassword);
                });
            }
            else {
                this.doLogin(newAccount, newPassword);
            }
        });

        this.onButtonEvent(layout.btnRegister, () => {
            this.hide();
            tgxUIMgr.inst.showUI(UIRegister);
        });

        let cachedAccount = UserLocalCache.inst.account;
        if (cachedAccount) {
            layout.edtAccount.string = cachedAccount;
        }

        let cachedPassword = UserLocalCache.inst.password;
        if (cachedPassword) {
            layout.edtPassword.string = cachedPassword;
        }

        //store them for later comparison.
        this._oldAccount = layout.edtAccount.string;
        this._oldPassword = layout.edtPassword.string;
    }

    autoFill(account: string, password: string) {
        let layout = this.layout as Layout_UILogin;
        layout.edtAccount.string = account;
        layout.edtPassword.string = password;
    }

    async doLogin(account: string, password: string) {
        tgxUIWaiting.show('正在登录');
        let ret = await UserMgr.inst.doLogin(account, password);
        tgxUIWaiting.hide();
        if (!ret.isSucc) {
            if (ret.err.message == 'USER_NOT_EXISTS' || ret.err.message == 'PASSWORD_WRONG') {
                tgxUIAlert.show('用户名或者密码错误！');
            }
        }
        else {
            //没有名字，表示还未创建角色，则进入角色创建流程
            if (!UserMgr.inst.name) {
                tgxUIWaiting.show('角色准备中');
                SceneUtil.loadScene(SceneDef.CREATE_ROLE);
            }
            else {
                //有名字，则进入对应场景，如果没有对应场景，则进入默认场景
                tgxUIWaiting.show('进入世界');
                let ret = await NetUtil.callApiFromLobby('EnterSubWorld', { token: UserMgr.inst.token, subWorldId: UserMgr.inst.subWorldId }, { timeout: 10000 });
                tgxUIWaiting.hide();

                if (ret.isSucc) {
                    tgxUIWaiting.show('进入世界');
                    SceneUtil.loadScene(SceneDef.WORLD,{
                        ...ret.res,
                        uid: UserMgr.inst.uid
                    });
                }
            }

        }
    }
}