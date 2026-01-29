import NeCollection from './NeCollection.js'
import Localforge from 'localforage'

export default class LocalRepoService {
  constructor () {
    this.collection = new NeCollection('ridge.repo.db')
    this.store = Localforge.createInstance({ name: 'ridge-repo' })
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
