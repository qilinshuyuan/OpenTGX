import { instantiate, RichText } from "cc";
import { tgxModuleContext, tgxUIController } from "../../core_tgx/tgx";
import { GameUILayers } from "../../scripts/GameUILayers";
import { ModuleDef } from "../../scripts/ModuleDef";
import { WorldMgr } from "../scene_world/WorldMgr";
import { Layout_UIChat } from "./Layout_UIChat";

export class UIChat extends tgxUIController{
    constructor(){
        super('ui_chat/ui_chat',GameUILayers.HUD,Layout_UIChat);
    }
    protected onCreated(): void {
        WorldMgr.worldConn.listenMsg('s2cMsg/Chat', v => {
            this._pushChatMsg(`<outline width=2><color=#00C113>${v.user.name}</color> <color=#000000>${v.content}</color></o>`);
        });

        WorldMgr.worldConn.listenMsg('s2cMsg/UserJoin', v => {
            this._pushChatMsg(`<outline width=2><color=#00C113>${v.user.name}</color> <color=#999999>加入了房间</color></o>`);
        });
        WorldMgr.worldConn.listenMsg('s2cMsg/UserExit', v => {
            this._pushChatMsg(`<outline width=2><color=#00C113>${v.user.name}</color> <color=#999999>离开了房间</color></o>`);
        });

        let layout = this.layout as Layout_UIChat;
        layout.cbInputChatReturn = this.onInputChatReturn.bind(this);

        layout.cbBtnSendChat = this.onBtnSendChat.bind(this);
    }

    protected onDispose(): void {
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/Chat');
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/UserJoin');
        WorldMgr.worldConn.unlistenMsgAll('s2cMsg/UserExit');
    }

    async onBtnSendChat() {
        let layout = this.layout as Layout_UIChat;
        if (!layout.inputChat.string) {
            return;
        }

        const content = layout.inputChat.string;
        layout.inputChat.string = '';
        let ret = await WorldMgr.worldConn.callApi('SendChat', {
            content: content
        });
        layout.inputChat.string = '';

        if (!ret.isSucc) {
            this._pushChatMsg(`<color=#999999>消息发送失败，请重试!</color></o>`);
            layout.inputChat.string = content;
            return;
        }
    }
    async onInputChatReturn() {
        let layout = this.layout as Layout_UIChat;
        await this.onBtnSendChat();
        layout.inputChat.focus();
    }

    private _pushChatMsg(richText: string) {
        let layout = this.layout as Layout_UIChat;
        let node = instantiate(layout.prefabChatMsgItem);
        layout.chatMsgs.addChild(node);
        node.getComponent(RichText)!.string = richText;

        // 最多保留 7 条记录
        while (layout.chatMsgs.children.length > 7) {
            layout.chatMsgs.children[0].removeFromParent();
        }
    }
}

tgxModuleContext.attachModule(UIChat,ModuleDef.METAVERSE);