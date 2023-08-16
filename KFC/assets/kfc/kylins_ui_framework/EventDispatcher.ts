/**
 * @en the classes inherit from class:EventDispatcher will have the ability to dispatch events.
 * @zh 事件派发器，继承自EventDispatcher的类将拥有事件派发能力
 * 
 *  */
export class EventDispatcher {
    private _handlersMap:any = {};
    public on(event: string, cb: Function, thisArg?: any, args?: [], once?: boolean) {
        if(!event || !cb){
            return;
        }
        
        let handlers = this._handlersMap[event];
        if (!handlers) {
            handlers = this._handlersMap[event] = [];
        }

        handlers.push({
            event: event,
            cb: cb,
            thisArg: thisArg,
            once: once,
            args: args
        });
    }

    public once(event: string, cb: Function, thisArg: any, args: []) {
        this.on(event, cb, thisArg, args, true);
    }

    public off(event: string, cb: Function, thisArg?: any, once?: boolean) {
        let handlers = this._handlersMap[event];
        if (!handlers) {
            return;
        }
        for (let i = 0; i < handlers.length; ++i) {
            let h = handlers[i];
            if (h.cb == cb && h.thisArg == thisArg && h.once == once) {
                handlers.splice(i, 1);
                return;
            }
        }
    }

    public clearAll(event?: string) {
        if (event) {
            delete this._handlersMap[event];
        }
        else {
            this._handlersMap = {};
        }
    }

    public emit(event: string, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) {

        let handlers = this._handlersMap[event];
        if (!handlers || !handlers.length) {
            return;
        }
        let args = [arg0, arg1, arg2, arg3, arg4];
        for (let i = 0; i < handlers.length; ++i) {
            let h = handlers[i];
            if (h.event == event) {
                h.cb.apply(h.thisArg, args);
            }
        }
    }
}