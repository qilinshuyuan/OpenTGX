
const PROP_MODULE = '__module__name__';
const PROP_IMPL_CLASS = '__impl__class__';

let defaultModule = 'resources';

export class ModuleClass {
    public static setDefaultModule(moduleName) {
        defaultModule = moduleName;
    }

    public static attachModule(cls, moduleName) {
        cls[PROP_MODULE] = moduleName;
    }

    public static getModule(cls) {
        return cls[PROP_MODULE] || defaultModule;
    }

    public static attachImplClass(cls, implCls) {
        cls[PROP_IMPL_CLASS] = implCls;
    }

    public static attachModuleAndImplClass(cls, moduleName, implCls) {
        cls[PROP_MODULE] = moduleName;
        cls[PROP_IMPL_CLASS] = implCls;
    }

    public static getImplClass(cls) {
        return cls[PROP_IMPL_CLASS] || cls;
    }

    public static createFromModule(cls) {
        let implCls = this.getImplClass(cls) || cls;
        return new implCls();
    }
}