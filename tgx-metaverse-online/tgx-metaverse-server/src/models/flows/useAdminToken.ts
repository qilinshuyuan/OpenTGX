import { BaseServer } from "tsrpc";
import { BackConfig } from "../BackConfig";

/** admin 目录下的接口，校验 adminToken */
export function useAdminToken(server: BaseServer<any>) {
    server.flows.preApiCallFlow.push(call => {
        if (call.service.name.startsWith('admin/')) {
            if ((call.req as any).adminToken !== BackConfig.adminToken) {
                call.error('adminToken error');
                return undefined;
            }
        }

        return call;
    })
}