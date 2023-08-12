import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_DemoList')
export class Layout_DemoList extends Component {
    @property(Node)
    contentRoot:Node;
}

