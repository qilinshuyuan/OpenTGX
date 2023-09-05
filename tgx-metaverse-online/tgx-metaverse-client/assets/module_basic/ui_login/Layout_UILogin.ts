import { _decorator, Component, Node, EditBox, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_UILogin')
export class Layout_UILogin extends Component {

    @property(EditBox)
    edtAccount:EditBox;

    @property(EditBox)
    edtPassword:EditBox;

    @property(Button)
    btnRegister:Button;

    @property(Button)
    btnLogin:Button;
}


