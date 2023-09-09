import { director } from "cc";
import { tgxModuleContext, tgxUIController } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { SceneUtil, SceneDef } from "../../scripts/SceneDef";
import { Layout_UIWorldHUD } from "./Layout_UIWorldHUD";
import { WsClientStatus } from 'tsrpc-base-client';
import { ModuleDef } from "../../scripts/ModuleDef";
import { WorldMgr } from "../scene_world/WorldMgr";

export class UIWorldHUD extends tgxUIController {
    constructor() {
        super('ui_world_hud/ui_world_hud', GameUILayers.GAME, Layout_UIWorldHUD);
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_UIWorldHUD;


        // Clean
        layout.labelTitle.string = layout.labelState.string = '';
        layout.labelServerUrl.string = WorldMgr.worldServerUrl;
        layout.labelTitle.string = WorldMgr.subWorldConfig.name;


        this.onButtonEvent(layout.btnBack, () => {
            WorldMgr.worldConn.disconnect();
            SceneUtil.loadScene(SceneDef.LOGIN);
        });

        this.onButtonEvent(layout.btnWave, () => {
            director.getScene().emit('event_player_action','wave');
        });

        this.onButtonEvent(layout.btnPunch, () => {
            director.getScene().emit('event_player_action','punch');
        });

        this.onButtonEvent(layout.btnDance, () => {
            director.getScene().emit('event_player_action','dance');
        });


        layout.schedule(() => { this._resetSubWorldState() }, 3);
    }

    private _resetSubWorldState() {
        let layout = this.layout as Layout_UIWorldHUD;
        if (WorldMgr.worldConn.status === WsClientStatus.Opened) {
            layout.labelState.string = `人数: ${WorldMgr.playerNum}\nPing: ${WorldMgr.worldConn.lastHeartbeatLatency}ms`
        }
        else {
            layout.labelState.string = '连接中...'
        }
    }
}
tgxModuleContext.attachModule(UIWorldHUD, ModuleDef.METAVERSE);


