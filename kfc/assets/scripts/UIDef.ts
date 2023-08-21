import { kfcAttachModule, kfcUIController } from "../kfc/kfc";
import { ModuleDef } from "./ModuleDef";

//define UI which are not in basic bundle but be called by other bundles.

export class UI_AboutMe extends kfcUIController {}
kfcAttachModule(UI_AboutMe, ModuleDef.EXTRA);