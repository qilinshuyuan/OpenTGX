import { AssetManager, assetManager, Color, Component, director, instantiate, Label, Node, Prefab, Quat, tween, TweenSystem, Vec2, _decorator, quat } from 'cc';
import { tgxEasyController, tgxEasyControllerEvent, tgxThirdPersonCameraCtrl, tgxUIAlert, tgxUIMgr } from '../../core_tgx/tgx';
import { SceneUtil} from '../../scripts/SceneDef';
import { WorldMgr } from './WorldMgr';
import { UIChat } from '../ui_chat/UIChat';
import { Player } from '../prefabs/Player/Player';
import { PlayerName } from '../prefabs/PlayerName/PlayerName';
import { UIWorldHUD } from '../ui_world_hud/UIWorldHUD';
import { SubWorldUserState } from '../../module_basic/shared/types/SubWorldUserState';
const { ccclass, property } = _decorator;

const tmpQuat = quat();

@ccclass('SubWorldScene')
export class SubWorldScene extends Component {

    selfPlayer?: Player
    @property(Node)
    players!: Node;
    @property(tgxThirdPersonCameraCtrl)
    followCamera!: tgxThirdPersonCameraCtrl;

    @property(Prefab)
    prefabPlayer!: Prefab;

    private _playerLastState: string = '';

    async start() {
        // Init
        this._initClient();

        // 开始连接
        await WorldMgr.ensureConnected();

        // 定时向服务器上报状态
        this.schedule(() => {
            if (!this.selfPlayer) {
                return;
            }

            let curState = this.selfPlayer.aniState;
            if (curState == 'walking' || curState != this._playerLastState) {
                WorldMgr.worldConn.sendMsg('c2sMsg/UserState', {
                    aniState: this.selfPlayer.aniState,
                    pos: this.selfPlayer.node.position,
                    rotation: this.selfPlayer.node.rotation
                });
                this._playerLastState = curState;
            }
        }, 0.1);

        tgxEasyController.on(tgxEasyControllerEvent.MOVEMENT, this.onMovement, this);
        tgxEasyController.on(tgxEasyControllerEvent.MOVEMENT_STOP, this.onMovmentStop, this);

        tgxUIMgr.inst.showUI(UIWorldHUD);
        tgxUIMgr.inst.showUI(UIChat);

        director.getScene().on('event_player_action', (act: 'wave' | 'punch' | 'dance') => {
            this.onPlayerAction(act);
        });
    }

    onMovement(degree: number, strengthen: number) {
        if (!this.selfPlayer) {
            return;
        }
        this.selfPlayer.aniState = 'walking';
        this.selfPlayer.node.setWorldRotationFromEuler(0, degree + this.followCamera.node.eulerAngles.y + 90, 0);
    }

    onMovmentStop() {
        if (!this.selfPlayer) {
            return;
        }
        this.selfPlayer.aniState = 'idle';
    }

    private _initClient() {

        WorldMgr.createWorldConnection(SceneUtil.sceneParams);

        let levelData = WorldMgr.subWorldConfig.levelData;
        if(levelData && levelData.bundle && levelData.prefab){
            assetManager.loadBundle(levelData.bundle,(err,bundle:AssetManager.Bundle)=>{
                bundle.load(levelData.prefab,(err,prefab:Prefab)=>{
                    director.getScene().addChild(instantiate(prefab));
                });
            });
        }

        WorldMgr.worldConn.listenMsg('s2cMsg/Chat', v => {
            let playerName = this.players.getChildByName(v.user.uid)?.getComponent(PlayerName);
            if (playerName) {
                playerName.showChatMsg(v.content);
            }
        })
        WorldMgr.worldConn.listenMsg('s2cMsg/UserStates', v => {
            for (let uid in v.userStates) {
                this._updateUserState(v.userStates[uid]);
            }
            WorldMgr.playerNum = this.players.children.length;
        })
        WorldMgr.worldConn.listenMsg('s2cMsg/UserJoin', v => {
            WorldMgr.subWorldData.users.push({
                ...v.user
            });
            WorldMgr.playerNum = this.players.children.length;
        })
        WorldMgr.worldConn.listenMsg('s2cMsg/UserExit', v => {
            WorldMgr.subWorldData.users.remove(v1 => v1.uid === v.user.uid);
            this.players.getChildByName(v.user.uid)?.removeFromParent();
            WorldMgr.playerNum = this.players.children.length;
        });
    }

    onPlayerAction(state: 'wave' | 'punch' | 'dance') {
        if (!this.selfPlayer) {
            return;
        }
        this.selfPlayer.aniState = state;
    }

    private _updateUserState(state: SubWorldUserState) {
        let node = this.players.getChildByName(state.uid);

        // Create Player
        if (!node) {
            // Player
            node = instantiate(this.prefabPlayer);
            node.name = state.uid;
            this.players.addChild(node);
            node.setPosition(state.pos.x, state.pos.y, state.pos.z);
            node.setRotation(state.rotation.x, state.rotation.y, state.rotation.z, state.rotation.w);
            const player = node.getComponent(Player)!;
            player.aniState = state.aniState;
            let userInfo = WorldMgr.subWorldData.users.find(v => v.uid === state.uid);
            if (userInfo) {
                let color = new Color();
                Color.fromUint32(color, userInfo.visualId);
                player.mesh.material?.setProperty('mainColor', color);
            }

            player.lblName.string = userInfo?.name || '???';

            // Set selfPlayer
            if (state.uid === WorldMgr.currentUser.uid) {
                this.selfPlayer = player;
                this.selfPlayer.node['_isMyPlayer_'] = true;
                this.followCamera.target = node.getChildByName('focusTarget')!;
            }

            return;
        }

        // 简单起见：自己以本地状态为主，不从服务端同步
        if (state.uid === WorldMgr.currentUser.uid) {
            return;
        }

        // 插值其它 Player 的状态
        node.getComponent(Player)!.aniState = state.aniState;
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(node.position as any);
        tween(node.position).to(0.1, state.pos, {
            onUpdate: (v, ratio) => {
                node!.position = node!.position;
                node!.rotation = Quat.slerp(tmpQuat, node!.rotation, state.rotation, ratio!)
            }
        }).tag(99).start();
    }

    onDestroy() {
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/Chat');
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/UserStates');
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/UserJoin');
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/UserExit');
        WorldMgr.worldConn.disconnect(3456,'normal');
        TweenSystem.instance.ActionManager.removeAllActionsByTag(99);
    }

}