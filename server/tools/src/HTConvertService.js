const { BadRequestError, NotFoundError, ForBiddenError, ConflictError } = require('ridge-http')
const fsExtra = require('fs-extra')
const path = require('path')
const debug = require('debug')('ridge:ht-convt')
const Parser = require('./ht_page_render.js')
/**
 */
module.exports = class HtConvertService {
  constructor (app) {
    this.app = app
    this.freRoot = app.freRoot || path.resolve(app.config.serverRootDir, './')
  }

  init () {
  }

  async initRoute (router) {
    router.get('/ht/page/:app/:page', async (ctx, next) => {
      const { app, page } = ctx.params

      ctx.body = await this.getAndConvertPageJSON(app, page)
      await next()
    })
  }

  async getAndConvertPageJSON (app, page) {
    const db = await this.app.dataBaseProducer.getDb('D:/apps/' + app + '/project')
    const coll = await db.getCollection('pages')

    const doc = await coll.findOne({
      id: page
    })
    if (doc && doc.pcInstances) {
      doc.content = JSON.parse(doc.pcInstances)
    }

    const parser = new Parser({
      ...doc.jsonFileOther,
      d: doc.content
    })
    parser.interprete()

    const { a, p } = parser.pageConfig
    const finalPageJSON = {
      version: '1.4.1',
      cssFiles: [],
      jsFiles: [],
      name: doc.name,
      children: [],
      style: {
        width: a.width,
        height: a.height
      }
    }
    if (p.background) {
      finalPageJSON.style.background = p.background
    }
    return finalPageJSON
  }
}
