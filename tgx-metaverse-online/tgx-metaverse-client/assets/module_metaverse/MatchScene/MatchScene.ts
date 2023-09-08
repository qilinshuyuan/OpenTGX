
import { Component, EditBox, instantiate, Label, Node, Prefab, ScrollView, UITransform, view, _decorator } from 'cc';
import { NetUtil } from '../scripts/models/NetUtil';
import { tgxUIWaiting } from '../../core_tgx/tgx';
import { SceneDef, SceneUtil } from '../../scripts/SceneDef';
import { SubWorldListItem } from './prefabs/SubWorldListItem/SubWorldListItem';
const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {

    @property([Node])
    autoShrinkWidthNodes: Node[] = [];
    @property(EditBox)
    inputNickname!: EditBox;
    @property(ScrollView)
    subWorldList!: ScrollView;
    @property(Label)
    labelSummary!: Label;
    @property(Node)
    labelEmpty!: Node;

    @property(Prefab)
    prefabSubWorldListItem!: Prefab;

    onLoad() {
        // Clean
        this.labelSummary.string = '';
        this.labelEmpty.active = false;

        // 因为是按高度适配，所以在屏幕宽度小于设计宽度时，自动缩窄 UI
        const visibleSize = view.getVisibleSize();
        if (visibleSize.width < 750) {
            this.autoShrinkWidthNodes.forEach(v => {
                v.getComponent(UITransform)!.width -= 750 - visibleSize.width;
            })
        }

        // 轮询刷新房间列表
        this.schedule(() => {
            this._reloadSubWorldList();
        }, 1);
        this._reloadSubWorldList();
    }

    /** 刷新房间列表 */
    private async _reloadSubWorldList() {
        let ret = await NetUtil.callApiFromLobby('ListSubWorlds', {});
        if (!ret.isSucc) {
            return;
        }

        // Labels
        this.labelEmpty.active = ret.res.subWorlds.length === 0;
        this.labelSummary.string = `${ret.res.subWorlds.sum(v => v.userNum)} 人在线`

        // List
        this.subWorldList.content!.removeAllChildren();
        for (let subWorldInfo of ret.res.subWorlds) {
            let node = instantiate(this.prefabSubWorldListItem);
            this.subWorldList.content!.addChild(node);
            node.getComponent(SubWorldListItem)!.options = {
                subWorlds: subWorldInfo,
                onClick: v => {
                    tgxUIWaiting.show('加入房间中');
                    SceneUtil.loadScene(SceneDef.WORLD, {
                        ...v,
                    });
                }
            };
        }
    }

    async onBtnCreateSubWorld() {
        if (!this.inputNickname.string) {
            return alert('先给自己取个名字吧~');
        }

        tgxUIWaiting.show('创建房间中')
        let ret = await NetUtil.callApiFromLobby('CreateSubWorld', {
            subWorldName: `${this.inputNickname.string}的房间`
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
