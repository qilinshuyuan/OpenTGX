import { tgModuleClass, tgUIController } from "../core_tsgds/tsgds";
import { ModuleDef } from "./ModuleDef";

//define UI which are not in basic bundle but be called by other bundles.

export class UI_AboutMe extends tgUIController { }
tgModuleClass.attachImplClass(UI_AboutMe, ModuleDef.EXTRA);