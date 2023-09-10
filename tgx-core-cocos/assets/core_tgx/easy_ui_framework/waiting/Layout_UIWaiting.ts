import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('tgxLayout_UIWaiting')
export class Layout_UIWaiting extends Component {
    @property(Node)
    loadingIcon:Node;

    @property(Label)
    loadingTxt:Label;
}

