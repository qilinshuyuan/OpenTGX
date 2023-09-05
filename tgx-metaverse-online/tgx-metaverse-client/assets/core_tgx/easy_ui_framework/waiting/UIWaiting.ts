
import { UIController } from "../UIController";
import { UIMgr } from "../UIMgr";
import { Layout_UIWaiting } from "./Layout_UIWaiting";

const loadingTxtArr = ['.', '..', '...'];

let _inst = null;

export class UIWaiting extends UIController {

    private _contentStr: string = 'Loading';
    protected onCreated(): void {

    }

    public static show(contentStr?: string): UIWaiting {
        if (!_inst) {
            _inst = UIMgr.inst.showUI(UIWaiting);
        }
        _inst._contentStr = contentStr;
        return _inst;
    }

    public static hide(): void {
        if (_inst) {
            _inst.hide();
            _inst = null;
        }
    }

    protected onUpdate() {
        let layout = this.layout as Layout_UIWaiting;
        if (layout.loadingIcon) {
            let euler = layout.loadingIcon.eulerAngles;
            let rot = (Date.now() / 1000) * 90;
            layout.loadingIcon.setRotationFromEuler(euler.x, euler.y, rot);
        }

        if (layout.loadingTxt) {
            let idx = Math.floor(Date.now() / 500) % 3;
            layout.loadingTxt.string = this._contentStr + loadingTxtArr[idx];
        }
    }

    onDispose() {
        _inst = null;
    }
}