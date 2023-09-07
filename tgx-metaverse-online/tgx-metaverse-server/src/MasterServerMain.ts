import { MasterServer } from "./MasterServer/MasterServer";

// 环境变量配置
// 程序运行的端口 默认 3000
const port = parseInt(process.env['PORT'] || '3000');

export const masterServer = new MasterServer({
    port: port
});

// Entry function
async function main() {
    await masterServer.init();
    await masterServer.start();
}
main();

