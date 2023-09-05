import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_UI_HUD')
export class Layout_UI_HUD extends Component {
    @property(Button)
    btnScenes;

    @property(Button)
    btnToggleStats;

    @property(Button)
    btnAbout;
}


