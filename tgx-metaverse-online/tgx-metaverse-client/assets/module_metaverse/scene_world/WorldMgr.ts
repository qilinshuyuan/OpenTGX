import { WsClient } from "tsrpc-browser";
import { tgxUIAlert } from "../../core_tgx/tgx";
import { SceneDef, SceneUtil } from "../../scripts/SceneDef";
import { NetUtil } from "../scripts/models/NetUtil";
import { ServiceType } from "../../module_basic/shared/protocols/serviceProto_worldServer";
import { SubWorldConfigItem } from "../../module_basic/shared/SubWorldConfig";

let _worldConn: WsClient<ServiceType> = null;
let _worldServerUrl = '';
let _playerNum: number = 0;
let _subWorldId: string;
let _subWorldConfig: SubWorldConfigItem;
let _subWorldDisplayName: string;

export class WorldMgr {
    public static createWorldConnection(worldServerUrl: string) {
        _worldServerUrl = worldServerUrl;
        _worldConn = NetUtil.createWorldClient(worldServerUrl);

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