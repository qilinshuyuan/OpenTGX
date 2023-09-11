import { WECHAT } from 'cc/env';
import { ApiReturn, HttpClientTransportOptions, HttpClient as HttpClient_Browser, TsrpcError, WsClient as WsClient_Browser } from 'tsrpc-browser';
import { HttpClient as HttpClient_Miniapp, WsClient as WsClient_Miniapp } from 'tsrpc-miniapp';
import { ServiceType, serviceProto as serviceProto_master } from '../shared/protocols/serviceProto_masterServer';
import { serviceProto as serviceProto_world, ServiceType as ServiceType_World } from '../shared/protocols/serviceProto_worldServer';
import { FrontConfig } from './FrontConfig';

/** 网络请求相关 */
export class NetUtil {

    private static _globalErrorFilters = {};

    static addErrorFilter(error: string, cb: Function, target?: any) {
        this._globalErrorFilters[error] = { cb: cb, target: target };
    }

    /** Master Server */
    static masterConn = new (WECHAT ? HttpClient_Miniapp : HttpClient_Browser)(serviceProto_master, {
        server: FrontConfig.masterServer,
        // json: true,
        logger: console
    });

    public static async callApiFromLobby<T extends keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req'], options?: HttpClientTransportOptions): Promise<ApiReturn<ServiceType['api'][T]['res']>> {
        let ret = await this.masterConn.callApi(apiName, req, options);
        if (!ret.isSucc) {
            let filter = this._globalErrorFilters[ret.err.message];
            if (filter && filter.cb) {
                filter.cb.call(filter.target);
            }
        }
        return ret;
    }
    public static async sendMsgToLobby<T extends keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T], options?: HttpClientTransportOptions): Promise<{
        isSucc: true;
    } | {
        isSucc: false;
        err: TsrpcError;
    }> {
        return this.masterConn.sendMsg(msgName, msg, options);
    }

    /** World Server */
    static createWorldClient(serverUrl: string): WsClient_Browser<ServiceType_World> | WsClient_Miniapp<ServiceType_World> {
        let client = new (WECHAT ? WsClient_Miniapp : WsClient_Browser)(serviceProto_world, {
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