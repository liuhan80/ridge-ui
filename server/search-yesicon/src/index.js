const name = require('./package.json').name
const version = require('./package.json').version
const description = require('./package.json').description

const debug = require('debug')('ridge:search-yesicon')

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
  },

  async bootComplete (app) {
  }
}
