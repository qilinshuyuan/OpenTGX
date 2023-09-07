import { _decorator, Component, Node, EditBox, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_UIChat')
export class Layout_UIChat extends Component {
    @property(EditBox)
    inputChat!: EditBox;

    @property(Prefab)
    prefabChatMsgItem!: Prefab;

    @property(Node)
    chatMsgs!: Node;


    cbInputChatReturn:Function;
    async onInputChatReturn(){
        if(this.cbInputChatReturn){
            this.cbInputChatReturn();
        }
    }
    
    cbBtnSendChat:Function;
    async onBtnSendChat(){
        if(this.cbBtnSendChat){
            await this.cbBtnSendChat();
        }
    }
}


