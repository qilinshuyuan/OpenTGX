module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'match-server',
      script    : 'matchServer.js',
      env: {
        PORT: '3200'
      }
    },
    {
      name      : 'room-server-1',
      script    : 'roomServer.js',
      env: {
        PORT: '3201',
        MATCH_SERVER_URL: 'http://127.0.0.1:3200',
        THIS_SERVER_URL: 'wss://你的域名:3201'
      }
    },
    {
      name      : 'room-server-2',
      script    : 'roomServer.js',
      env: {
        PORT: '3202',
        MATCH_SERVER_URL: 'http://127.0.0.1:3200',
        THIS_SERVER_URL: 'wss://你的域名:3202'
      }
    },
  ]
};
