import { tgModuleContext, tgUIController } from "../core_tsgds/tsgds";
import { ModuleDef } from "./ModuleDef";

//define UI classes which are not in the basic bundle but be called by other bundles.

export class UI_AboutMe extends tgUIController { }
tgModuleContext.attachModule(UI_AboutMe, ModuleDef.EXTRA);