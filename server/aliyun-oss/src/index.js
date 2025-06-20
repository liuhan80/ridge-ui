const AppStorageService = require('./AppStorageService.js')
const CloudNPMService = require('./CloudNpmService.js')
const RepoService = require('./RepoService.js')
const name = require('../package.json').name
const version = require('../package.json').version
const description = require('../package.json').description

module.exports = {
  name,
  description,
  version,

  async ready (app) {
    app.services.appStorageService = new AppStorageService(app)
    await app.services.appStorageService.initRoutes()
    app.services.cloudNpmService = new CloudNPMService(app)
    app.services.repoService = new RepoService(app)
    await app.services.repoService.initRoute(app.router)
  },

  async bootComplete (app) {
  }
}
