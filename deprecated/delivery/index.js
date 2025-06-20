const name = require('./package.json').name
const version = require('./package.json').version
const description = require('./package.json').description

const DeliverService = require('./src/DeliverService.js')
const debug = require('debug')('ridge:delivery')

module.exports = {
  name,
  description,
  version,
  async prepareBoot (app) {
    app.config = Object.assign({
      npmUrlPath: '/npm',
      npmHomeDir: './npm',
      npmRegistry: 'https://registry.npmjs.org'
      // npmRegistry: 'https://registry.npmmirror.com'
    }, app.config)
  },

  async ready (app) {
    app.services.deliverService = new DeliverService(app)
  },

  async bootComplete (app) {
    const { npmUrlPath } = app.config
    app.use(async (ctx, next) => {
      try {
        if (ctx.path.startsWith(npmUrlPath + '/@')) { // scoped
          const [, packageName, file] = ctx.path.split('@')
          if (file) {
            const newPath = '/npm/@' + packageName + '/' + file
            ctx.redirect(newPath)
            return
          }
        } else if (ctx.path.indexOf('@') > -1) {
          const newPath = ctx.path.replace('@', '/')
          ctx.redirect(newPath)
          return
        }
        await next()
        // 对托管的静态页面 /index.html的页内前端路由的支持，都发送到index.html
        if (ctx.status === 404) {
          if (ctx.path.startsWith(npmUrlPath)) {
            await app.services.deliverService.handleNotFound(ctx)
          }
        }
      } catch (err) {
        debug('delvery error', err)
      }
    })
  }
}
