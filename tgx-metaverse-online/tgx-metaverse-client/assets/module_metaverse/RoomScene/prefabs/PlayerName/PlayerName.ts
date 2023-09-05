
import { Camera, Component, Label, Node, tween, TweenSystem, UITransform, Vec3, view, _decorator } from 'cc';
const { ccclass, property } = _decorator;

const v3_1 = new Vec3;

export interface PlayerNameOptions {
    namePosNode: Node,
    camera3D: Camera,
    nickname: string
}

@ccclass('PlayerName')
export class PlayerName extends Component {

    @property(Node)
    chatMsg!: Node;
    @property(Label)
    labelChatMsg!: Label;

    private _options!: PlayerNameOptions;
    public get options(): PlayerNameOptions {
        return this._options;
    }
    public set options(v: PlayerNameOptions) {
        this._options = v;

        this.getComponent(Label)!.string = v.nickname;
    }

    showChatMsg(content: string) {
        this.labelChatMsg.string = content;
        this.chatMsg.active = true;
        this.chatMsg.setScale(0, 0, 0);
        this.chatMsg.setPosition(0, this.node.getComponent(UITransform)!.height + 10, 0);

        // 10 秒后消失
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.chatMsg);
        tween(this.chatMsg).to(0.2, { scale: Vec3.ONE }, { easing: 'backOut' })
            .delay(10).to(0.2, { scale: Vec3.ZERO }, { easing: 'backIn' }).call(() => {
                this.chatMsg.active = false
            }).start();
    }

}