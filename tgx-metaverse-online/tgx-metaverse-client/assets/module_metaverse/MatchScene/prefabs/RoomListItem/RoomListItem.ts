
import { Component, Label, _decorator } from 'cc';
import { ResListRooms } from '../../../../scripts/shared/protocols/matchServer/PtlListRooms';
const { ccclass, property } = _decorator;

export type RoomListItemOptions = {
    room: ResListRooms['rooms'][number],
    onClick: (v: {
        serverUrl: string,
        roomId: string
    }) => void
};
@ccclass('RoomListItem')
export class RoomListItem extends Component {

    @property(Label)
    labelName!: Label;
    @property(Label)
    labelInfo!: Label;

    private _options!: RoomListItemOptions;
    public get options(): RoomListItemOptions {
        return this._options!;
    }
    public set options(v: RoomListItemOptions) {
        this._options = v;

        this.labelName.string = v.room.name;
        this.labelInfo.string = `人数:${v.room.userNum} ${v.room.serverUrl}`
    }

    onBtnJoin() {
        this._options.onClick({
            serverUrl: this._options.room.serverUrl,
            roomId: this._options.room.roomId
        })
    }

}
