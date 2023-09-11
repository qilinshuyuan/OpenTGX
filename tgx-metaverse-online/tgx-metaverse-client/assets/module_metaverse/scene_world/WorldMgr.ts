import { WsClient } from "tsrpc-browser";
import { tgxUIAlert } from "../../core_tgx/tgx";
import { SceneDef, SceneUtil, SubWorldSceneParams } from "../../scripts/SceneDef";
import { ServiceType } from "../../module_basic/shared/protocols/serviceProto_worldServer";
import { SubWorldConfig, SubWorldConfigItem } from "../../module_basic/shared/SubWorldConfig";
import { SubWorldData } from "../../module_basic/shared/types/SubWorldData";
import { UserInfo } from "../../module_basic/shared/types/UserInfo";
import { UserMgr } from "../../module_basic/scripts/UserMgr";
import { ResJoinSubWorld } from "../../module_basic/shared/protocols/worldServer/PtlJoinSubWorld";
import { NetUtil } from "../../module_basic/scripts/NetUtil";

let _worldConn: WsClient<ServiceType> = null;
let _worldServerUrl = '';
let _playerNum: number = 0;
let _subWorldId: string;
let _subWorldConfig: SubWorldConfigItem;
let _subWorldDisplayName: string;

let _params: SubWorldSceneParams;
let _currentUser: UserInfo;
let _subWorldData: SubWorldData;

export class WorldMgr {
    public static createWorldConnection(params:SubWorldSceneParams) {
        _params = params;
        _worldServerUrl = params.worldServerUrl;
        _worldConn = NetUtil.createWorldClient(_worldServerUrl);
        _subWorldConfig = SubWorldConfig.getSubWorldConfig(_params.subWorldConfigId);

        _worldConn.flows.postDisconnectFlow.push(v => {
            if(v.reason == 'normal'){
                return;
            }
            if (!v.isManual) {
                this.backToLogin();
            }
            return v;
        });
    }

    public static backToLogin() {
        tgxUIAlert.show("链接已断开，请重新登录").onClick(() => {
            SceneUtil.loadScene(SceneDef.LOGIN);
        });
    }

    public static async ensureConnected(): Promise<ResJoinSubWorld> {
        let ret = await this._connect();
        if (!ret.isSucc) {
            tgxUIAlert.show(ret.errMsg).onClick(() => {
                this.backToLogin();
            });
            return new Promise(rs => { });
        }
        return ret.res;
    }
    private static async _connect(): Promise<{ isSucc: boolean, res?: ResJoinSubWorld, errMsg?: string }> {
        // Connect
        let resConnect = await WorldMgr.worldConn.connect();
        if (!resConnect.isSucc) {
            return { isSucc: false, errMsg: '连接到服务器失败: ' + resConnect.errMsg };
        }

        // JoinSubWorld
        let retJoin = await WorldMgr.worldConn.callApi('JoinSubWorld', {
            token: _params.token,
            uid: UserMgr.inst.uid,
            time: _params.time,
            subWorldId: _params.subWorldId,
        });
        if (!retJoin.isSucc) {
            return { isSucc: false, errMsg: '加入房间失败: ' + retJoin.err.message };
        }

        _currentUser = retJoin.res.currentUser;
        _subWorldData = retJoin.res.subWorldData;

        return { isSucc: true, res: retJoin.res };
    }

    public static get params(): SubWorldSceneParams{
        return _params;
    }
    public static get currentUser(): UserInfo{
        return _currentUser;
    }

    public static get subWorldData(): SubWorldData{
        return _subWorldData;
    }

    public static set playerNum(v: number) {
        _playerNum = v;
    }

    public static get playerNum() {
        return _playerNum;
    }

    public static get worldConn() {
        return _worldConn;
    }

    public static get worldServerUrl() {
        return _worldServerUrl;
    }

    public static set subWorldId(v: string) {
        _subWorldId = v;
    }

    public static get subWorldId(): string {
        return _subWorldId;
    }

    public static set subWorldConfig(v: SubWorldConfigItem) {
        _subWorldConfig = v;
    }

    public static get subWorldConfig() {
        return _subWorldConfig;
    }

    public static set subWorldDisplayName(v: string) {
        _subWorldDisplayName = v;
    }

    public static get subWorldDisplayName() {
        return this.subWorldDisplayName;
    }
}