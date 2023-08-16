import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_AboutMe')
export class Layout_AboutMe extends Component {
    @property(Button)
    btnClose:Button;
}