import { UIMgr } from "../KFramework/kylins_ui_framework/UIMgr";

let _currentModule = '';
function setCurrentModule(module:string){

}
function addUI(name:string){
    UIMgr.inst.registerUI(name,_currentModule);
}

export class UIModule{
    public static UI_Module_Basic = 'ui_module_basic';
    public static UI_Module_Extra = 'ui_module_extra';

    public static addUIClass(name:string, uiCls:any){
        UIMgr.inst.attachUIClass(name,uiCls);
    }
}

export class UIDef{
    //============= ui module basic ==============
    public static UI_HUD:string = 'UI_HUD';


    //============= ui module extra ==============
    public static UI_ABOUT_ME:string = 'UI_ABOUT_ME';
}

setCurrentModule(UIModule.UI_Module_Basic);
addUI(UIDef.UI_HUD);

setCurrentModule(UIModule.UI_Module_Extra);
addUI(UIDef.UI_ABOUT_ME);