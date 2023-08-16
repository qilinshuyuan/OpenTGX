import { _decorator, Component, Node, Button, EventTouch, Toggle } from 'cc';
const { ccclass, property } = _decorator;

/***
 * @en internal class, used for handling node event.
 * @zh 内部类，用于节点事件监听
 * 
 *  */
@ccclass('__NodeEventAgent__')
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
        if (toggle['_toggleContainer']) {
            checkEvents = toggle['_toggleContainer'].checkEvents;
        }
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
