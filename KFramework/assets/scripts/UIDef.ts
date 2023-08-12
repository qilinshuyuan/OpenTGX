import { UIController } from "../KFramework/kylins_ui_framework/UIController";
import { UIMgr } from "../KFramework/kylins_ui_framework/UIMgr";
import { UIAlert } from "../KFramework/kylins_ui_framework/alert/UIAlert";
import { UIWaiting } from "../KFramework/kylins_ui_framework/waiting/UIWaiting";


function addUI(uiBaseCls,module:string){
    UIMgr.inst.attachModule(uiBaseCls,module);
}

export class SubModule{
    public static Base = 'base';
    public static UI_Basic = 'ui_basic';
    public static UI_Extra = 'ui_extra';

    public static attachImplClass(uiBaseCls, uiImplCls:any){
        UIMgr.inst.attachImplClass(uiBaseCls,uiImplCls);
    }
}

addUI(UIAlert,SubModule.Base);
addUI(UIWaiting,SubModule.Base);

export class UI_HUD extends UIController{}

addUI(UI_HUD,SubModule.UI_Basic);



export class UI_AboutMe extends UIController{}

addUI(UI_AboutMe,SubModule.UI_Extra);