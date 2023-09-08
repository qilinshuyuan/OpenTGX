
import { Component, Label, _decorator } from 'cc';
import { ResListSubWorlds } from '../../../../module_basic/shared/protocols/masterServer/PtlListSubWorlds';
const { ccclass, property } = _decorator;

export type SubWorldListItemOptions = {
    subWorlds: ResListSubWorlds['subWorlds'][number],
    onClick: (v: {
        serverUrl: string,
        subWorldId: string
    }) => void
};
@ccclass('SubWorldListItem')
export class SubWorldListItem extends Component {

    @property(Label)
    labelName!: Label;
    @property(Label)
    labelInfo!: Label;

    private _options!: SubWorldListItemOptions;
    public get options(): SubWorldListItemOptions {
        return this._options!;
    }
    public set options(v: SubWorldListItemOptions) {
        this._options = v;

        this.labelName.string = v.subWorlds.name;
        this.labelInfo.string = `人数:${v.subWorlds.userNum} ${v.subWorlds.serverUrl}`
    }

    onBtnJoin() {
        this._options.onClick({
            serverUrl: this._options.subWorlds.serverUrl,
            subWorldId: this._options.subWorlds.subWorldId
        })
    }

}
