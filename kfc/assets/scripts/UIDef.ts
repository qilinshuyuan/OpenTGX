import { kfcAttachModule, kfcUIAlert, kfcUIController, kfcUIWaiting } from "../kfc/kfc";
import { ModuleDef } from "./ModuleDef";

//=============base===============
kfcAttachModule(kfcUIAlert, ModuleDef.UI);
kfcAttachModule(kfcUIWaiting, ModuleDef.UI);

export class UI_DemoList extends kfcUIController {
    showCloseBtn() { }
}
kfcAttachModule(UI_DemoList, ModuleDef.UI);

//================common================
export class UI_HUD extends kfcUIController { }
kfcAttachModule(UI_HUD, ModuleDef.UI);

export class UI_AboutMe extends kfcUIController { }
kfcAttachModule(UI_AboutMe, ModuleDef.UI);