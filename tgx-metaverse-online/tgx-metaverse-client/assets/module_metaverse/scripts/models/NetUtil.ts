import { WECHAT } from 'cc/env';
import { HttpClient as HttpClient_Browser, WsClient as WsClient_Browser } from 'tsrpc-browser';
import { HttpClient as HttpClient_Miniapp, WsClient as WsClient_Miniapp } from 'tsrpc-miniapp';
import { serviceProto as serviceProto_match } from '../shared/protocols/serviceProto_matchServer';
import { serviceProto as serviceProto_room, ServiceType as ServiceType_Room } from '../shared/protocols/serviceProto_roomServer';
import { FrontConfig } from './FrontConfig';

/** 网络请求相关 */
export class NetUtil {

    /** Match Server */
    static matchClient = new (WECHAT ? HttpClient_Miniapp : HttpClient_Browser)(serviceProto_match, {
        server: FrontConfig.matchServer,
        // json: true,
        logger: console
    });

    /** Room Server */
    static createRoomClient(serverUrl: string): WsClient_Browser<ServiceType_Room> | WsClient_Miniapp<ServiceType_Room> {
        let client = new (WECHAT ? WsClient_Miniapp : WsClient_Browser)(serviceProto_room, {
            server: serverUrl,
            heartbeat: {
                interval: 5000,
                timeout: 5000
            },
            // json: true,
            logger: console,
            logMsg: false
        });

        // FLOWS
        // TODO

        return client;
    }

}

(window as any).NetUtil = NetUtil;