import { _decorator, Component, Node, Button, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Layout_UIRegister')
export class Layout_UIRegister extends Component {
    @property(EditBox)
    edtAccount:EditBox;

    @property(EditBox)
    edtPassword:EditBox;

    @property(EditBox)
    edtPasswordConfirm:EditBox;

    @property(Button)
    btnRegister:Button;

    @property(Button)
    btnBackToLogin:Button;
}


