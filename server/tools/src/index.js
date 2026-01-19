const HTConvertService = require('./HTConvertService.js')
const name = require('../package.json').name
const version = require('../package.json').version
const description = require('../package.json').description

module.exports = {
  name,
  description,
  version,

  async ready (app) {
    app.services.htConvertService = new HTConvertService(app)
    await app.services.htConvertService.initRoute(app.router)
  },

  async bootComplete (app) {
  }
}
