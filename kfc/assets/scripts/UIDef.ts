import { kfcAttachModule, kfcUIAlert, kfcUIController, kfcUIMgr, kfcUIWaiting } from "../kfc/kfc";

export class SubModule{
    public static Base = 'base';
    public static UI_Common = 'ui_common';
}

//=============base===============
kfcAttachModule(kfcUIAlert,SubModule.Base);
kfcAttachModule(kfcUIWaiting,SubModule.Base);

export class UI_DemoList extends kfcUIController{
    showCloseBtn(){}
}
kfcAttachModule(UI_DemoList, SubModule.Base);

//================common================
export class UI_HUD extends kfcUIController{}
kfcAttachModule(UI_HUD,SubModule.UI_Common);

export class UI_AboutMe extends kfcUIController{}
kfcAttachModule(UI_AboutMe,SubModule.UI_Common);