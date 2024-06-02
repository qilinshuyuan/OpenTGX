globalThis.tgx_class = (moduleName, superCls) => {
    const PROP_MODULE = '__module__name__';
    const PROP_IMPL_CLASS = '__impl__class__';
    return function(cls){
        if(superCls){
            superCls[PROP_MODULE] = moduleName;
            superCls[PROP_IMPL_CLASS] = cls;
        }
        else{
            cls[PROP_MODULE] = moduleName;
        }
    }
}