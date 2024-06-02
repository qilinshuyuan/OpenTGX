import { DoubleList, DoubleListItem } from "../base/DoubleList";

/**
 * @en the classes inherit from class:EventDispatcher will have the ability to dispatch events.
 * @zh 事件派发器，继承自EventDispatcher的类将拥有事件派发能力
 * 
 *  */
export class EventDispatcher {
    private _handlersMap:{[key:string]:DoubleList} = {};
    public on(event: string, cb: Function, thisArg?: any, args?: [], once?: boolean) {
        if(!event || !cb){
            return;
        }
        
        let handlers = this._handlersMap[event];
        if (!handlers) {
            handlers = this._handlersMap[event] = new DoubleList();
        }

        handlers.addToTail({
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

        handlers.forEach(v=>{
            let h = v.data;
            if (h.cb == cb && h.thisArg == thisArg && h.once == once) {
                v.dispose();
                return true;
            }
        });
    }

    public clearAll(event?: string) {
        if (event) {
            let handlers = this._handlersMap[event];
            handlers?.clear();
            delete this._handlersMap[event];
        }
        else {
            for(let k in this._handlersMap){
                let handlers = this._handlersMap[k];
                handlers?.clear();
            }
            this._handlersMap = {};
        }
    }

    public emit(event: string, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) {

        let handlers = this._handlersMap[event];
        if (!handlers || handlers.isEmpty) {
            return;
        }
        let args = [arg0, arg1, arg2, arg3, arg4];
        handlers.forEach(v=>{
            let h = v.data;
            if (h.event == event) {
                h.cb.apply(h.thisArg, args);
            }
        });
    }
}