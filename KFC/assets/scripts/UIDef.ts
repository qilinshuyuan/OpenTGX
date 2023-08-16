import { kfcUIAlert, kfcUIController, kfcUIMgr, kfcUIWaiting } from "../kfc/kfc";

function addUI(uiBaseCls,module:string){
   kfcUIMgr.inst.attachModule(uiBaseCls,module);
}

export class SubModule{
    public static Base = 'base';
    public static UI_Common = 'ui_common';

    public static attachImplClass(uiBaseCls, uiImplCls:any){
        kfcUIMgr.inst.attachImplClass(uiBaseCls,uiImplCls);
    }
}

//=============base===============
addUI(kfcUIAlert,SubModule.Base);
addUI(kfcUIWaiting,SubModule.Base);

export class UI_DemoList extends kfcUIController{
    showCloseBtn(){}
}
addUI(UI_DemoList, SubModule.Base);

//================common================
export class UI_HUD extends kfcUIController{}
addUI(UI_HUD,SubModule.UI_Common);

export class UI_AboutMe extends kfcUIController{}
addUI(UI_AboutMe,SubModule.UI_Common);