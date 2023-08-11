import { UIController } from "../KFramework/kylins_ui_framework/UIController";
import { UIMgr } from "../KFramework/kylins_ui_framework/UIMgr";
import { UIAlert } from "../KFramework/kylins_ui_framework/alert/UIAlert";


function addUI(uiBaseCls,module:string){
    UIMgr.inst.attachModule(uiBaseCls,module);
}

export class UIModule{
    public static UI_Base = 'ui_base';
    public static UI_Module_Basic = 'ui_modules_basic';
    public static UI_Module_Extra = 'ui_modules_extra';

    public static attachImplClass(uiBaseCls, uiImplCls:any){
        UIMgr.inst.attachImplClass(uiBaseCls,uiImplCls);
    }
}

addUI(UIAlert,UIModule.UI_Base);

export class UI_HUD extends UIController{}

addUI(UI_HUD,UIModule.UI_Module_Basic);



export class UI_AboutMe extends UIController{}

addUI(UI_AboutMe,UIModule.UI_Module_Extra);