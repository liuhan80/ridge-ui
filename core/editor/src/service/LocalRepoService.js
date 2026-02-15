import NeCollection from './NeCollection.js'
import Localforge from 'localforage'

export default class LocalRepoService {
  constructor (appService, backupService) {
    this.collection = new NeCollection('ridge.repo.db')
    this.store = Localforge.createInstance({ name: 'ridge-repo' })
    this.appService = appService
    this.collection.clean()
    this.currentAppId = null
    this.currentAppName = null
  }
  

  // 保存App内容
  async saveApp(id, name, blob) {
      const existed = await this.collection.findOne({ id })

      if (!existed) {
        await this.collection.insert({
          id,
          name
        })
      } else {
         await this.collection.update({
          id
        }, {
          name
        })
      }
      await this.store.setItem(id, blob)
  },

  // 持久化保存当前App
  async persistanceCurrentApp () {
    const { appService } = this
    if (this.currentAppId) {
      const existed = await this.collection.findOne({ id: this.currentAppId })

      if (!existed) {
        await this.collection.insert({
          id: this.currentAppId,
          name: this.currentAppName
        })
      } else {
        await this.collection.update({
          id: this.currentAppId
        }, {
          name: this.currentAppName
        })
      }
      const zipBlob = await appService.getAppBlob()
      await this.store.setItem(this.currentAppId, zipBlob)
    }
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
