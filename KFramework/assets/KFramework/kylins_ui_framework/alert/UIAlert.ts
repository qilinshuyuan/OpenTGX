import { Vec3, v3 } from "cc";
import { UIController } from "../UIController";
import { UILayer, UIMgr } from "../UIMgr";
import { Layout_UIAlert } from "./Layout_UIAlert";

export class UIAlertOptions{
    title?:string;
    content?:string;
    showCancel?:boolean;
    onClick?:Function;
    onClickThisArg?:Function
}

export class UIAlert extends UIController{
    private _options:UIAlertOptions;

    public static show(options:UIAlertOptions){
        let implCls = UIMgr.inst.getImplClass(UIAlert);
        if(implCls){
            UIMgr.inst.showUI(implCls,(alert:UIAlert)=>{
                alert.init(options);
            });
        }
    }

    private init(options:UIAlertOptions){
        this._options = options;
        let layout = this.layout as Layout_UIAlert;
        if(options.hasOwnProperty('title')){
            layout.title.string = options.title || '';
        }

        layout.content.string = options.content || '';
        layout.btnCancel.node.active = options.showCancel;
        if(!options.showCancel){
            let pos = layout.btnOK.node.position;
            layout.btnOK.node.setPosition(0,pos.y,pos.z);
        }
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_UIAlert;
        this.onButtonEvent(layout.btnOK,()=>{
            this.hide();
            if(this._options.onClick){
                this._options.onClick.call(this._options.onClickThisArg,true);
            }
        });

        this.onButtonEvent(layout.btnCancel,()=>{
            this.hide();
            if(this._options.onClick){
                this._options.onClick.call(this._options.onClickThisArg,false);
            }
        });
    }
}