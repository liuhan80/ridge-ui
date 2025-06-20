const collections = require('@iconify/json/collections.json')

class SearchYesiconService {
  constructor (app) {
    this.app = app
  }

  initRoutes (router) {
    router.get('/yesicon/collections', async (ctx, next) => {
      ctx.body = this.getIconsSetList()
      await next()
    })

    router.get('/yesicon/collection/:name', async (ctx, next) => {
      ctx.body = this.getIcons(ctx.params.name)
      await next()
    })
  }

  getIconsSetList () {
    return collections
  }

  getIcons (setName) {
    const setJson = require(`@iconify/json/json/${setName}.json`)
    return setJson
  }
}

module.exports = SearchYesiconService
