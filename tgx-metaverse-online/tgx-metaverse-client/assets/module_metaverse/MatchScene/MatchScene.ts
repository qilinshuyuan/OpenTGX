
import { Component, EditBox, instantiate, Label, Node, Prefab, ScrollView, UITransform, view, _decorator } from 'cc';
import { RoomListItem } from './prefabs/RoomListItem/RoomListItem';
import { NetUtil } from '../scripts/models/NetUtil';
import { tgxUIWaiting } from '../../core_tgx/tgx';
import { SceneDef, SceneUtil } from '../../scripts/SceneDef';
const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {

    @property([Node])
    autoShrinkWidthNodes: Node[] = [];
    @property(EditBox)
    inputNickname!: EditBox;
    @property(ScrollView)
    roomList!: ScrollView;
    @property(Label)
    labelRoomSummary!: Label;
    @property(Node)
    labelNoRoom!: Node;

    @property(Prefab)
    prefabRoomListItem!: Prefab;

    onLoad() {
        // Clean
        this.labelRoomSummary.string = '';
        this.labelNoRoom.active = false;

        // 因为是按高度适配，所以在屏幕宽度小于设计宽度时，自动缩窄 UI
        const visibleSize = view.getVisibleSize();
        if (visibleSize.width < 750) {
            this.autoShrinkWidthNodes.forEach(v => {
                v.getComponent(UITransform)!.width -= 750 - visibleSize.width;
            })
        }

        // 轮询刷新房间列表
        this.schedule(() => {
            this._reloadRoomList();
        }, 1);
        this._reloadRoomList();
    }

    /** 刷新房间列表 */
    private async _reloadRoomList() {
        let ret = await NetUtil.callApiFromLobby('ListRooms', {});
        if (!ret.isSucc) {
            return;
        }

        // Labels
        this.labelNoRoom.active = ret.res.rooms.length === 0;
        this.labelRoomSummary.string = `${ret.res.rooms.sum(v => v.userNum)} 人在线`

        // List
        this.roomList.content!.removeAllChildren();
        for (let roomInfo of ret.res.rooms) {
            let node = instantiate(this.prefabRoomListItem);
            this.roomList.content!.addChild(node);
            node.getComponent(RoomListItem)!.options = {
                room: roomInfo,
                onClick: v => {
                    tgxUIWaiting.show('加入房间中');
                    SceneUtil.loadScene(SceneDef.WORLD, {
                        ...v,
                    });
                }
            };
        }
    }

    async onBtnCreateRoom() {
        if (!this.inputNickname.string) {
            return alert('先给自己取个名字吧~');
        }

        tgxUIWaiting.show('创建房间中')
        let ret = await NetUtil.callApiFromLobby('CreateRoom', {
            roomName: `${this.inputNickname.string}的房间`
        });
        tgxUIWaiting.hide()

        if (!ret.isSucc) {
            alert(ret.err.message);
            return;
        }

        tgxUIWaiting.show('加入房间中');
        SceneUtil.loadScene(SceneDef.WORLD, {
            ...ret.res,
        });
    }

    async onBtnMatch() {
        tgxUIWaiting.show('匹配中');
        let ret = await NetUtil.callApiFromLobby('StartMatch', {}, { timeout: 10000 });
        tgxUIWaiting.hide();

        if (!ret.isSucc) {
            return alert('暂时没有可加入的房间，稍后再试试吧~');
        }

        tgxUIWaiting.show('加入房间中');
        SceneUtil.loadScene(SceneDef.WORLD, {
            ...ret.res,
        });
    }

}
