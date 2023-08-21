
    export function kfcAttachModule(cls, moduleName) {
        cls['__module__name__'] = moduleName;
    }

    export function kfcGetModule(cls) {
        return cls['__module__name__'] || 'resources';
    }

    export function kfcAttachImplClass(cls, implCls) {
        cls['__impl__class__'] = implCls;
    }

    function kfcGetImplClass(cls) {
        return cls['__impl__class__'] || cls;
    }

    export function kfcCreateFromMoudle(cls){
        let implCls = kfcGetImplClass(cls) || cls;
        return new implCls();
    }