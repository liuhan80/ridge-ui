import NeCollection from './NeCollection.js'
import Localforge from 'localforage'

export default class LocalRepoService {
  constructor (appService, backupService) {
    this.collection = new NeCollection('ridge.repo.db')
    this.store = Localforge.createInstance({ name: 'ridge-repo' })
    this.appService = appService
    this.backupService = backupService
    this.collection.clean()
  }

  // 持久化保存当前App
  async persistanceCurrentApp () {
    const { appService, backupService } = this
    const existed = await this.collection.findOne({ id: appService.currentAppId })

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
    const zipBlob = await backupService.getAppBlob()
    await this.store.setItem(appService.currentAppId, zipBlob)
  }

  async removeApp (id) {
    if (id == null) return
    if (this.appService.getCurrentAppId() === id) {
      await this.appService.clear()
    }
    await this.collection.remove({
      id
    })
  }

  async renameApp (id, newName) {
    const existed = await this.collection.findOne({ id })
    if (existed) {
      await this.collection.patch({
        id
      }, {
        name: newName
      })
    }
  }

  async getApp (id) {
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
