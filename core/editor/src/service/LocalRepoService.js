import NeCollection from './NeCollection.js'
import Localforge from 'localforage'

export default class LocalRepoService {
  constructor (appService, backupService) {
    this.collection = new NeCollection('ridge.repo.db')
    this.store = Localforge.createInstance({ name: 'ridge-repo' })
    this.appService = appService
    this.backupService = backupService
  }

  // 持久化保存当前App
  async persistanceCurrentApp () {
    const { appService, backupService } = this
    const existed = await this.collection.findOne({ id: appService.currentAppId })
    const zipBlob = await backupService.getAppBlob()

    if (!existed) {
      await this.collection.insert({
        id: appService.currentAppId,
        name: appService.currentAppName
      })
    } else {
      await this.collection.update({
        id: appService.currentAppId
      }, {
        name: appService.currentAppName
      })
    }
    await this.store.setItem(appService.currentAppId, zipBlob)
  }

  async insertLocalApp (id, name, meta, zipBlob) {
    const existed = await this.collection.findOne({ id })
    if (existed) {
      return false
    }
    await this.collection.insert({
      id,
      name,
      meta
    })
    await this.store.setItem(id, zipBlob)
  }

  async updateLocalApp (id, name, meta, zipBlob) {
    const existed = await this.collection.findOne({ id })
    if (!existed) {
      return false
    }
    await this.collection.patch({ id }, {
      name,
      meta
    })

    await this.store.setItem(id, zipBlob)
  }

  async getCurrentApp () {

  }

  async loadAndSetCurrentApp (id) {
    const existed = await this.collection.findOne({ id })
    if (existed) {
      return {
        ...existed,
        blob: await this.store.getItem(id)
      }
    }
  }

  async getLocalAppList () {
    return await this.collection.find({})
  }
}
