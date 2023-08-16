import { kfc } from "../KFC/KFC";

function addUI(uiBaseCls,module:string){
   kfc.uiMgr.attachModule(uiBaseCls,module);
}

export class SubModule{
    public static Base = 'base';
    public static UI_Basic = 'ui_basic';
    public static UI_Extra = 'ui_extra';

    public static attachImplClass(uiBaseCls, uiImplCls:any){
        kfc.uiMgr.attachImplClass(uiBaseCls,uiImplCls);
    }
}

//base
addUI(kfc.UIAlert,SubModule.Base);
addUI(kfc.UIWaiting,SubModule.Base);

export class UI_DemoList extends kfc.UIController{
    showCloseBtn(){}
}
addUI(UI_DemoList, SubModule.Base);

//basic
export class UI_HUD extends kfc.UIController{}

addUI(UI_HUD,SubModule.UI_Basic);



//extra
export class UI_AboutMe extends kfc.UIController{}

addUI(UI_AboutMe,SubModule.UI_Extra);