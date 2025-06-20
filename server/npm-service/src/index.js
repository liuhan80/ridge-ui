const name = require('../package.json').name
const version = require('../package.json').version
const description = require('../package.json').description

const NPMService = require('./NpmService.js')

module.exports = {
  name,
  description,
  version,
  type: 'node',
  async created (app) {
  },
  async ready (app) {
    app.services.npmService = new NPMService(app)
    await app.services.npmService.initRoute(app.router)
  }
}
