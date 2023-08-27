export class InputMgr{
    private STATE_NORMAL = 1;
    private STATE_KEEP = 2;

    private static _inst:InputMgr = null;
    private _flags = {};
    private _flagsMeta = {};
    public static get inst():InputMgr{
        if(!this._inst){
            this._inst = new InputMgr();
        }
        return this._inst;
    }

    public setFlag(flag:string,keep?:boolean,meta?:any){
        this._flags[flag] = keep? this.STATE_KEEP:this.STATE_NORMAL;
        if(meta != null){
            this._flagsMeta[flag] = meta;
        }
    }

    public removeFlag(flag:string){
        delete this._flags[flag];
    }

    public hasFlag(flag:string):boolean{
        return !!this._flags[flag];
    }

    public getMetaByFlag(flag:string):any{
        return this._flagsMeta[flag];
    }

    public update(){
        for(let k in this._flags){
            if(this._flags[k] != this.STATE_KEEP){
                this._flags[k] = 0;
            }
        }
    }
}