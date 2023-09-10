import { _decorator, game, Prefab, isValid, Button, find, EventHandler, Toggle, ToggleContainer, Node, SkeletalAnimation, Component, EventTouch } from "cc";
const { ccclass, property } = _decorator;
/***
 * @en internal class, used for handling node event.
 * @zh 内部类，用于节点事件监听
 * 
 *  */
@ccclass('tgxNodeEventAgent')
export class __NodeEventAgent__ extends Component {
    /***
     * @en recieve button click event and deliver them to the real handlers.
     * @zh 接受按钮事件，并转发给真正的处理函数
     * */
    onButtonClicked(evt: EventTouch, customEventData) {
        let btn = (evt.target as Node).getComponent(Button);
        let clickEvents = btn.clickEvents;
        for (let i = 0; i < clickEvents.length; ++i) {
            let h = clickEvents[i];
            if (h.customEventData == customEventData) {
                let cb = h['$cb$'];
                let target = h['$target$']
                let args = h['$args$'];
                cb.apply(target, [btn, args]);
            }
        }
    }

    /***
     * @en recieve toggle event and deliver them to the real handlers.
     * @zh 接受Toggle事件，并转发给真正的处理函数
     * */
    onToggleEvent(toggle: Toggle, customEventData) {
        let checkEvents = toggle.checkEvents;
        //if (toggle['_toggleContainer']) {
        //    checkEvents = toggle['_toggleContainer'].checkEvents;
        //}
        for (let i = 0; i < checkEvents.length; ++i) {
            let h = checkEvents[i];
            if (h.customEventData == customEventData) {
                let cb = h['$cb$'];
                let target = h['$target$']
                let args = h['$args$'];
                cb.apply(target, [toggle, args]);
            }
        }
    }

}

/**
 * @en manage event-handlers automatically, will remove all handlers when the ui destroyed.
 * @zh 自动管理事件，将在UI销毁时自动清理
 * */
export class AutoEventHandler {
    private _handlers = [];
    on(event: string, cb: () => void, target?: any, once?: boolean) {
        this._handlers.push({
            event: event,
            cb: cb,
            target: target,
            once: once
        });
        game.on(event, cb, target, once);
    }

    off(event: string, cb: () => void, target?: any, once?: boolean) {
        game.off(event, cb, target);
        for (let i = 0; i < this._handlers.length; ++i) {
            let h = this._handlers[i];
            if (h.event == event && h.cb == cb && h.target == target && h.once == once) {
                this._handlers.splice(i, 1);
                return;
            }
        }
    }

    dispose() {
        for (let i = 0; i < this._handlers.length; ++i) {
            let h = this._handlers[i];
            game.off(h.event, h.cb, h.target);
        }
    }
}

/**
 * @en base class of UI Panel
 * @zh 各类UI面板基类
 * */
export class UIController extends AutoEventHandler {
    private static _idBase = 1000;

    private static _controllers: UIController[] = [];
    private _instId: number = 0;
    private _prefab: string | Prefab;
    private _layer: number;
    private _layout: any;
    protected node: Node;
    constructor(prefab: string | Prefab, layer: number, layoutCls: any) {
        super();
        this._prefab = prefab;
        this._layer = layer;
        this._layout = layoutCls;
        this._instId = UIController._idBase++;
        UIController._controllers.push(this);
    }

    /***
     * @en the instance id to indicate an unique ui panel.
     * @zh 实例ID，用于标记一个唯一面板实例
     *  */
    public get instId(): number {
        return this._instId;
    }

    /***
     * @en url of the prefab used by this ui panel.
     * @zh 本UI使用prefab路径
     *  */
    public get prefab(): string | Prefab {
        return this._prefab;
    }

    /***
     * @en layer of this ui panel.
     * @zh 本UI所在的UI层级
     *  */
    public get layer(): number {
        return this._layer;
    }

    /***
     * @en layout of this ui panel.
     * @zh 本UI所在的UI层级
     *  */
    public get layout(): any {
        return this._layout;
    }

    /***
     * @en hide and destroy all ui panel.
     * @zh 隐藏并销毁所有UI面板
     *  */
    public static hideAll() {
        while (this._controllers.length) {
            this._controllers[0].hide();
        }
    }

    //update all ui, called by UIMgr.
    public static updateAll() {
        for (let i = 0; i < this._controllers.length; ++i) {
            let ctrl = this._controllers[i];
            if (ctrl.node && isValid(ctrl.node)) {
                this._controllers[i].onUpdate();
            }
        }
    }

    //setup this ui,called by UIMgr.
    public setup(node: Node) {
        this.node = node;
        if (this._layout) {
            this._layout = this.node.getComponent(this._layout);
        }
        //结点创建完毕，调用子类的处理函数。
        this.onCreated();
    }

    /**
     * @en hide and destroy this ui panel.
     * @zh 隐藏并销毁此UI面板
     *  */
    public hide() {
        this.node.removeFromParent();
        for (let i = 0; i < UIController._controllers.length; ++i) {
            if (UIController._controllers[i] == this) {
                UIController._controllers.splice(i, 1);
                break;
            }
        }
        this.dispose();
        this.onDispose();
        this.node.destroy();
        this.node = null;
    }

    /**
     * @en add button event handler
     * @zh 添加按钮事件
     * @param relativeNodePath to indicate a button node, can pass `string`|`Node`|`Button` here.
     * @param cb will be called when event emits. method format:(btn:Button,args:any)=>void
     * @param target the `this` argument of `cb`
     *  */
    onButtonEvent(relativeNodePath: string | Node | Button, cb: Function, target?: any, args?: any) {

        let buttonNode: Node = null;
        if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
        }
        else if (relativeNodePath instanceof Button) {
            buttonNode = relativeNodePath.node;
        }
        else {
            buttonNode = find(relativeNodePath, this.node);
        }

        if (!buttonNode) {
            return null;
        }

        //添加转发器
        let agent = this.node.getComponent(__NodeEventAgent__);
        if (!agent) {
            agent = this.node.addComponent(__NodeEventAgent__);
        }

        let btn = buttonNode.getComponent(Button);
        let clickEvents = btn.clickEvents;
        let handler = new EventHandler();
        handler.target = this.node;
        handler.component = 'tgxNodeEventAgent';
        handler.handler = 'onButtonClicked';
        handler.customEventData = '' + UIController._idBase++;

        //附加额外信息 供事件转发使用
        handler['$cb$'] = cb;
        handler['$target$'] = target;
        handler['$args$'] = args;

        clickEvents.push(handler);
        btn.clickEvents = clickEvents;
    }

    /**
     * @en remove button event handler
     * @zh 移除按钮事件
     * @param relativeNodePath to indicate a button node, can pass `string`|`Node`|`Button` here.
     * @param cb will be called when event emits.
     * @param target the `this` argument of `cb`
     *  */
    offButtonEvent(relativeNodePath: string | Node | Button, cb: Function, target: any) {
        let buttonNode: Node = null;
        if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;

        }
        else if (relativeNodePath instanceof Button) {
            buttonNode = relativeNodePath.node;
        }
        else {
            buttonNode = find(relativeNodePath, this.node);
        }

        if (!buttonNode) {
            return; ``
        }

        let agent = this.node.getComponent(__NodeEventAgent__);
        if (!agent) {
            return;
        }
        let btn = buttonNode.getComponent(Button);
        if (!btn) {
            return;
        }
        let clickEvents = btn.clickEvents;
        for (let i = 0; i < clickEvents.length; ++i) {
            let h = clickEvents[i];
            if (h['$cb$'] == cb && h['$target$'] == target) {
                clickEvents.splice(i, 1);
                btn.clickEvents = clickEvents;
                break;
            }
        }
    }

    /**
     * @en add toggle event handler
     * @zh 添加Toggle事件
     * @param relativeNodePath to indicate a button node, can pass `string`|`Node`|`Button` here.
     * @param cb will be called when event emits. method format:(btn:Toggle,args:any)=>void
     * @param target the `this` argument of `cb`
     *  */

    onToggleEvent(relativeNodePath: string | Node | Toggle | ToggleContainer, cb: Function, target?: any, args?: any) {
        let buttonNode: Node = null;
        if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
        }
        else if (relativeNodePath instanceof Toggle) {
            buttonNode = relativeNodePath.node;
        }
        else if (relativeNodePath instanceof ToggleContainer) {
            buttonNode = relativeNodePath.node;
        }
        else {
            buttonNode = find(relativeNodePath, this.node);
        }

        if (!buttonNode) {
            return null;
        }

        //添加转发器
        let agent = this.node.getComponent(__NodeEventAgent__);
        if (!agent) {
            agent = this.node.addComponent(__NodeEventAgent__);
        }

        let btn = buttonNode.getComponent(Toggle) as any;
        if (!btn) {
            btn = buttonNode.getComponent(ToggleContainer) as any;
        }
        let checkEvents = btn.checkEvents;
        let handler = new EventHandler();
        handler.target = this.node;
        handler.component = 'tgxNodeEventAgent';
        handler.handler = 'onToggleEvent';
        handler.customEventData = '' + UIController._idBase++;

        //附加额外信息 供事件转发使用
        handler['$cb$'] = cb;
        handler['$target$'] = target;
        handler['$args$'] = args;

        checkEvents.push(handler);
        btn.checkEvents = checkEvents;
    }

    /**
     * @en remove toggle event handler
     * @zh 移除Toggle事件
     * @param relativeNodePath to indicate a button node, can pass `string`|`Node`|`Button` here.
     * @param cb will be called when event emits. method format:(btn:Toggle,args:any)=>void
     * @param target the `this` argument of `cb`
     *  */
    offToggleEvent(relativeNodePath: string | Node | Toggle | ToggleContainer, cb: Function, target: any) {
        let buttonNode: Node = null;
        if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
        }
        else if (relativeNodePath instanceof Toggle) {
            buttonNode = relativeNodePath.node;
        }
        else if (relativeNodePath instanceof ToggleContainer) {
            buttonNode = relativeNodePath.node;
        }
        else {
            buttonNode = find(relativeNodePath, this.node);
        }

        if (!buttonNode) {
            return null;
        }

        //添加转发器
        let agent = this.node.getComponent(__NodeEventAgent__);
        if (!agent) {
            return;
        }
        let btn = buttonNode.getComponent(Toggle) as any;
        if (!btn) {
            btn = buttonNode.getComponent(ToggleContainer) as any;
        }
        let checkEvents = btn.checkEvents;
        for (let i = 0; i < checkEvents.length; ++i) {
            let h = checkEvents[i];
            if (h['$cb$'] == cb && h['$target$'] == target) {
                checkEvents.splice(i, 1);
                btn.checkEvents = checkEvents;
                break;
            }
        }
    }

    /***
     * @en the extra resource needed by this ui panel.the ui will not be created until these res loaded.
     * @zh 本UI使用的依赖资源.UI会等这些资源加载完成后才创建。
     *  */
    public getRes(): [] {
        return [];
    }

    //子类的所有操作，需要在这个函数之后。
    protected onCreated() { }
    //销毁
    protected onDispose() { }
    //
    protected onUpdate() { }
}