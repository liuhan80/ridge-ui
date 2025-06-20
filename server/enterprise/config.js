const path = require('path')

module.exports = {
  bootPath: path.resolve(__dirname),
  npmRegistry: 'https://registry.npmmirror.com',
  session: {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: false, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
    secure: false, /** (boolean) secure cookie */
    sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */
  },
  rateLimit: {
    driver: 'memory',
    db: new Map(),
    duration: 8 * 60 * 60 * 1000,
    whitelist: ctx => {
      return !ctx.path.startsWith('/api') || ctx.path.startsWith('/api/user/current')
    },
    max: 200
  }
}
