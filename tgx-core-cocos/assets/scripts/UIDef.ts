import { ModuleDef } from "./ModuleDef";

//define UI classes which are not in the basic bundle but be called by other bundles.

@tgx_class(ModuleDef.EXTRA)
export class UI_AboutMe extends tgx.UIController { }