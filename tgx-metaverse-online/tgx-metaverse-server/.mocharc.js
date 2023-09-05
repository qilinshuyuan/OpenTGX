module.exports = {
    require: [
        'ts-node/register',
    ],
    timeout: 999999,
    exit: true,
    spec: [
        './test/**/*.test.ts'
    ],
    'preserve-symlinks': true
}