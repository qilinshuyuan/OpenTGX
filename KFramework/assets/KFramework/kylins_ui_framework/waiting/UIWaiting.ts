import { UIController } from "../UIController";
import { UIMgr } from "../UIMgr";
import { Layout_UIWaiting } from "./Layout_UIWaiting";

const loadingTxtArr = ['Loading.','Loading..','Loading...'];

export class UIWaiting extends UIController{

    protected onCreated(): void {
        
    }

    public static show():UIWaiting{
        return UIMgr.inst.showUI(UIMgr.inst.getImplClass(UIWaiting));
    }

    protected onUpdate() { 
        let layout = this.layout as Layout_UIWaiting;
        if(layout.loadingIcon){
            let euler = layout.loadingIcon.eulerAngles;
            let rot = (Date.now() / 1000) * 90;
            layout.loadingIcon.setRotationFromEuler(euler.x,euler.y,rot);
        }

        if(layout.loadingTxt){
            let idx = (~~(Date.now() / 500))
            layout.loadingTxt.string = loadingTxtArr[idx];
        }
    }
}