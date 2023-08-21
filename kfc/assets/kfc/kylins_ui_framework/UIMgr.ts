import { _decorator, Node, Prefab, instantiate, Widget, UITransform, view, ResolutionPolicy, assetManager, AssetManager, director, error } from 'cc';
import { UIController } from './UIController';
import { kfcCreateFromMoudle, kfcGetModule } from '../kylins_easy_controller/ModuleClass';
import { ResolutionAutoFit } from '../kylins_base/ResolutionAutoFit';

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

    public resize() {
        //根据屏幕大小决定适配策略
        //想明白原理，请阅读本文 https://blog.csdn.net/qq_36720848/article/details/89742451

        //decide the resolution policy according to the relationship between screen size and design resolution.  go https://blog.csdn.net/qq_36720848/article/details/89742451 (artile in Chinese) for more detail.
        let dr = view.getDesignResolutionSize();
        var s = view.getFrameSize();
        var rw = s.width;
        var rh = s.height;
        var finalW = rw;
        var finalH = rh;

        //
        if ((rw / rh) > (dr.width / dr.height)) {
            //如果更长，则用定高
            //if screen size is longer than design resolution. use fitHeight
            finalH = dr.height;
            finalW = finalH * rw / rh;
        }
        else {
            //如果更短，则用定宽
            //if screen size is shorter than design resolution. use fitWidth.
            finalW = dr.width;
            finalH = rh / rw * finalW;
        }

        //手工修改canvas和设计分辨率，这样反复调用也能生效。
        //we use the code below instead of fitWidth = true or fitHeight = true. so that we can recall this method many times.
        view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);
        let cvs = this._uiCanvas.getComponent(UITransform);
        cvs.width = finalW;
        cvs.height = finalH;
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

        this._uiCanvas.name = '$kfc.UICanvas$';
        director.addPersistRootNode(this._uiCanvas);

        //this.resize();
        let canvas = this._uiCanvas.getComponent(UITransform);
        this._uiCanvas.addComponent(ResolutionAutoFit);

        layerNames ||= [];

        this._uiRoot = this.createFullScreenNode();
        this._uiRoot.name = '$kfc.uiRoot$'
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

    public update() {
        UIController.updateAll();
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
        let bundleName = kfcGetModule(uiCls);
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

        let ui = kfcCreateFromMoudle(uiCls) as UIController;
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
