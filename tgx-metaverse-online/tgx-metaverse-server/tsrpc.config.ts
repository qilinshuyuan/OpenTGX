import { CodeTemplate, TsrpcConfig } from 'tsrpc-cli';

const tsrpcConf: TsrpcConfig = {
    // Generate ServiceProto
    proto: [
        {
            ptlDir: 'src/shared/protocols/masterServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_masterServer.ts', // Path for generated ServiceProto
            apiDir: 'src/MasterServer/api',   // API dir
            docDir: 'docs/masterServer',     // API documents dir
            // ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
        {
            ptlDir: 'src/shared/protocols/worldServer', // Protocol dir
            output: 'src/shared/protocols/serviceProto_worldServer.ts', // Path for generated ServiceProto
            apiDir: 'src/WorldServer/api',   // API dir
            docDir: 'docs/worldServer',     // API documents dir
            ptlTemplate: CodeTemplate.getExtendedPtl(),
            // msgTemplate: CodeTemplate.getExtendedMsg(),
        },
    ],
    // Sync shared code
    sync: [
        {
            from: 'src/shared',
            to: '../tgx-metaverse-client/assets/module_basic/shared',
            type: 'symlink'     // Change this to 'copy' if your environment not support symlink
        }
    ],
    // Dev server
    dev: {
        autoProto: true,        // Auto regenerate proto
        autoSync: true,         // Auto sync when file changed
        autoApi: true,          // Auto create API when ServiceProto updated
        watch: 'src',           // Restart dev server when these files changed
        entry: 'src/index.ts',  // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,        // Auto generate proto before build
        autoSync: true,         // Auto sync before build
        autoApi: true,          // Auto generate API before build
        outDir: 'dist',         // Clean this dir before build
    }
}
export default tsrpcConf;