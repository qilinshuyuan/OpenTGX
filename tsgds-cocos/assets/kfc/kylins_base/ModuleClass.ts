
    const PROP_MODULE = '__module__name__';
    const PROP_IMPL_CLASS = '__impl__class__';

    let defaultModule = 'resources';

    export function kfcSetDefaultModule(moduleName){
        defaultModule = moduleName;
    }

    export function kfcAttachModule(cls, moduleName) {
        cls[PROP_MODULE] = moduleName;
    }

    export function kfcGetModule(cls) {
        return cls[PROP_MODULE] || defaultModule;
    }

    export function kfcAttachImplClass(cls, implCls) {
        cls[PROP_IMPL_CLASS] = implCls;
    }

    export function kfcAttachModuleAndImplClass(cls,moduleName,implCls){
        cls[PROP_MODULE] = moduleName;
        cls[PROP_IMPL_CLASS] = implCls;
    }

    function kfcGetImplClass(cls) {
        return cls[PROP_IMPL_CLASS] || cls;
    }

    export function kfcCreateFromModule(cls){
        let implCls = kfcGetImplClass(cls) || cls;
        return new implCls();
    }