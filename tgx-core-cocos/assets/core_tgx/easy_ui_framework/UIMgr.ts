import { _decorator, Node, Prefab, instantiate, Widget, UITransform, view, ResolutionPolicy, assetManager, AssetManager, director, error, Component } from 'cc';
import { UIController } from './UIController';
import { ModuleContext } from '../base/ModuleContext';
import { ResolutionAutoFit } from '../base/ResolutionAutoFit';

const { ccclass, property } = _decorator;

@ccclass('tgxUIMgr.UIUpdater')
class UIUpdater extends Component {
    update() {
        UIController.updateAll();
    }
}

/**
 * @en the `User Interface Manager`, handles some stuffs like the ui loads,ui layers,resizing etc.
 * @zh UI管理器，处理UI加载，层级，窗口变化等
 * 
 * */
export class UIMgr {

    private static _inst: UIMgr;
    public static get inst(): UIMgr {
        if (this._inst == null) {
            this._inst = new UIMgr();
        }
        return this._inst;
    }

    private _uiCanvas: Node;
    private _uiRoot: Node;

    private createFullScreenNode() {
        let canvas = this._uiCanvas.getComponent(UITransform);
        let node = new Node();
        node.layer = this._uiCanvas.layer;
        let uiTransform = node.addComponent(UITransform);
        uiTransform.width = canvas.width;
        uiTransform.height = canvas.height;

        let widget = node.addComponent(Widget);
        widget.isAlignBottom = true;
        widget.isAlignTop = true;
        widget.isAlignLeft = true;
        widget.isAlignRight = true;

        widget.left = 0;
        widget.right = 0;
        widget.top = 0;
        widget.bottom = 0;
        return node;
    }

    /**
     * @en setup this UIMgr,`don't call more than once`.
     * @zh 初始化UIMgr,`不要多次调用`
     *  */
    public setup(uiCanvas: Node | Prefab, maxLayers: number, layerNames?: Array<string>) {
        if (this._uiCanvas) {
            return;
        }

        if (!uiCanvas) {
            throw error('uiCanvas must be a Node or Prefab');
        }
        if (uiCanvas instanceof Node) {
            this._uiCanvas = uiCanvas;
        }
        else {
            this._uiCanvas = instantiate(uiCanvas);
            director.getScene().addChild(this._uiCanvas);
        }

        this._uiCanvas.name = '$tgxUICanvas$';
        director.addPersistRootNode(this._uiCanvas);

        if (!this._uiCanvas.getComponent(UIUpdater)) {
            this._uiCanvas.addComponent(UIUpdater);
        }

        //this.resize();
        let canvas = this._uiCanvas.getComponent(UITransform);
        this._uiCanvas.addComponent(ResolutionAutoFit);

        layerNames ||= [];

        this._uiRoot = this.createFullScreenNode();
        this._uiRoot.name = 'ui_root'
        canvas.node.addChild(this._uiRoot);

        //create layers
        for (let i = 0; i < maxLayers; ++i) {
            let layerNode = this.createFullScreenNode();
            layerNode.name = 'ui_layer_' + (layerNames[i] ? layerNames[i] : i);
            this._uiRoot.addChild(layerNode);
        }
    }

    public getLayerNode(layerIndex: number): Node {
        return this._uiRoot.children[layerIndex] || this._uiRoot;
    }

    public hideAll() {
        UIController.hideAll();
    }

    public getUI<T extends UIController>(uiCls): T {
        let allControllers = (UIController as any)._controllers;
        for (let i = 0; i < allControllers.length; ++i) {
            let c = allControllers[i];
            if (c instanceof uiCls) {
                return c;
            }
        }
        return null;
    }

    public isShowing(uiCls: any): boolean {
        let allControllers = (UIController as any)._controllers;
        for (let i = 0; i < allControllers.length; ++i) {
            if (allControllers[i] instanceof uiCls) {
                return true;
            }
        }
        return false;
    }

    /***
     * @en show ui by the given parameters.
     * @zh 显示UI
     * @param uiCls the class, must inherits from the class `UIController`.
     * @param cb will be called after ui created.
     * @param thisArg the this argument for param `cb`.
     * @returns the instance of `uiCls`
     *  */
    public showUI(uiCls: any, cb?: Function, thisArg?: any): any {
        let bundleName = ModuleContext.getClassModule(uiCls);
        if (bundleName) {
            let bundle = assetManager.getBundle(bundleName);
            if (!bundle) {
                assetManager.loadBundle(bundleName, null, (err, loadedBundle) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        this.showUI(uiCls, cb, thisArg);
                    }
                });
                return;
            }
        }

        let ui = ModuleContext.createFromModule(uiCls) as UIController;
        let resArr = ui.getRes() || [];
        if (typeof (ui.prefab) == 'string') {
            resArr.push(ui.prefab as never);
        }

        let fnLoadAndCreateFromBundle = (bundle: AssetManager.Bundle) => {
            bundle.load(resArr, (err, data) => {
                if (err) {
                    console.log(err);
                }
                let node: Node = null;
                let prefab: Prefab = ui.prefab as Prefab;
                if (typeof (ui.prefab) == 'string') {
                    prefab = bundle.get(ui.prefab) as Prefab;
                }
                if (prefab) {
                    node = instantiate(prefab);
                }
                else {
                    //special for empty ui
                    node = this.createFullScreenNode();
                }

                let parent = UIMgr.inst.getLayerNode(ui.layer);
                parent.addChild(node);
                ui.setup(node);
                if (cb) {
                    cb.apply(thisArg, [ui]);
                }
            });
            return ui;
        }

        bundleName = bundleName || 'resources';
        let bundle = assetManager.getBundle(bundleName);
        return fnLoadAndCreateFromBundle(bundle);
    }
}
