import { UIController } from "../KFramework/kylins_ui_framework/UIController";
import { UIMgr } from "../KFramework/kylins_ui_framework/UIMgr";


function addUI(uiBaseCls,module:string){
    UIMgr.inst.attachModule(uiBaseCls,module);
}

export class UIModule{
    public static UI_Module_Basic = 'ui_modules_basic';
    public static UI_Module_Extra = 'ui_modules_extra';

    public static attachImplClass(uiBaseCls, uiImplCls:any){
        UIMgr.inst.attachImplClass(uiBaseCls,uiImplCls);
    }
}

export class UI_HUD extends UIController{}

addUI(UI_HUD,UIModule.UI_Module_Basic);



export class UI_AboutMe extends UIController{}

addUI(UI_AboutMe,UIModule.UI_Module_Extra);