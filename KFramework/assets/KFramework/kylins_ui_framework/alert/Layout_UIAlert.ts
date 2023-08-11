import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_UIAlert')
export class Layout_UIAlert extends Component {

    @property(Label)
    title:Label;

    @property(Label)
    content:Label;

    @property(Button)
    btnOK:Button;

    @property(Button)
    btnCancel:Button;
}

