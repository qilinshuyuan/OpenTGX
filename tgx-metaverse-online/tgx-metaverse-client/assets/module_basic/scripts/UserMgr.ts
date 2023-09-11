import { tgxUIWaiting, tgxUIAlert } from "../../core_tgx/tgx";
import { NetUtil } from "../../module_metaverse/scripts/models/NetUtil";
import { ModuleDef } from "../../scripts/ModuleDef";
import { SceneUtil, SceneDef } from "../../scripts/SceneDef";
import { SubWorldConfig } from "../shared/SubWorldConfig";

export class UserMgr {
    private static _inst: UserMgr;
    public static get inst(): UserMgr {
        if (!this._inst) {
            this._inst = new UserMgr();
        }
        return this._inst;
    }

    private _token: string;

    private _uid: string;
    private _name: string;
    private _visualId: number;
    private _subWorldId: string;

    public get token(): string {
        return this._token;
    }

    public get uid(): string {
        return this._uid;
    }

    public get name(): string {
        return this._name;
    }

    public get visualId(): number {
        return this._visualId;
    }

    public get subWorldId(): string {
        return this._subWorldId;
    }

    async doLogin(account: string, password: string) {
        let ret = await NetUtil.callApiFromLobby('Login', { account: account, password: password });
        if (ret.isSucc) {
            this._token = ret.res.token;
            this._uid = ret.res.uid;
            this._name = ret.res.name;
            this._visualId = ret.res.visualId;
            this._subWorldId = ret.res.subWorldId;
        }
        return ret;
    }

    async doCreateRole(name: string, visualId: number) {
        let ret = await NetUtil.callApiFromLobby('CreateRole', { token: this._token, name: name, visualId: visualId });
        if (ret.isSucc) {
            this._name = ret.res.name;
            this._visualId = ret.res.visualId;
            this._subWorldId = ret.res.subWorldId;
        }
        return ret;
    }

    async doEnterSubWorld(subWorldId: string) {
        tgxUIWaiting.show('进入世界');
        let ret = await NetUtil.callApiFromLobby('EnterSubWorld', { token: UserMgr.inst.token, subWorldId: subWorldId }, { timeout: 10000 });
        tgxUIWaiting.hide();

        if (ret.isSucc) {
            tgxUIWaiting.show('进入世界');
            //有名字，则进入对应场景，如果没有对应场景，则进入默认场景
            let config = SubWorldConfig.getSubWorldConfig(subWorldId);
            if (!config) {
                tgxUIWaiting.show('未找到子世界配置');
                return;
            }
            let sceneInfo = { name: config.scene, bundle: ModuleDef.METAVERSE };
            SceneUtil.loadScene(sceneInfo, {
                ...ret.res,
                uid: UserMgr.inst.uid
            });
        }
        else {
            tgxUIAlert.show(ret.err.message);
        }
    }
}