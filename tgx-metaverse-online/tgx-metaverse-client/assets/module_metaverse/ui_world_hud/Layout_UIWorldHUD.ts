import { _decorator, Component, Node, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_UIWorldHUD')
export class Layout_UIWorldHUD extends Component {
    @property(Button)
    btnWave:Button;

    @property(Button)
    btnPunch:Button;

    @property(Button)
    btnDance:Button;

    @property(Button)
    btnBack:Button;

    @property(Label)
    labelTitle!: Label;
    @property(Label)
    labelState!: Label;
    @property(Label)
    labelServerUrl!: Label;
}


