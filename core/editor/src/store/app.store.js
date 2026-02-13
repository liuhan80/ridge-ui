// src/store/useStore.js
import { create } from 'zustand'
import LocalRepoService from '../service/LocalRepoService'
import ApplicationService from '../service/ApplicationService'
import BackUpService from '../service/BackUpService'

const appService = new ApplicationService()
const backUpService = new BackUpService(appService)
const localRepoService = new LocalRepoService(appService, backUpService)

const useStore = create((set, get) => ({
  // 初始化状态
  appList: [],
  loadingAppFiles: true,
  currentAppName: '',
  currentAppFilesTree: [],

  persistanceCurrentApp: async () => {
    await localRepoService.persistanceCurrentApp()
  },

  openApp: async id => {
    const appInfo = await localRepoService.getApp(id)

    if (appInfo) {
      await appService.importAppArchive(appInfo.blob)
      appService.setCurrentAppInfo(id, appInfo.name)
      await appService.updateAppFileTree()
      set({
        currentAppName: appInfo.name,
        currentAppFilesTree: appService.fileTree
      })
    }
  },

  removeApp: async id => {
    await localRepoService.removeApp(id)
  },

  initAppStore: async () => {
    const appList = await localRepoService.getLocalAppList()
    set({
      loadingAppFiles: true,
      appList
    })
    if (appList.length === 0) {
      // 创建一个默认应用
      await backUpService.importHelloArchive()
      await localRepoService.persistanceCurrentApp()
    }
    const currentAppId = await appService.getCurrentAppId()
    if (currentAppId) {
      const appInfo = await localRepoService.getApp(currentAppId)
      set({
        currentAppName: appInfo.name,
        currentAppFilesTree: await appService.getAppFileTree(),
        loadingAppFiles: false
      })
    } else {
      // 没有应用打开
    }
  },

  updateAppList: async () => {
    const appList = localRepoService.getLocalAppList()
    set({
      appList
    })
  },

  createFolder: async (parentId, name) => {
    try {
      await appService.createDirectory(parentId, name)
      await get().initAppStore()
      return true
    } catch (e) {
      return false
    }
  },

  fileRename: async (fileId, name) => {
    const renamed = await appService.rename(fileId, name)
    if (renamed === 1) {
      await get().initAppStore()
    }
    return renamed
  }
}))

export { localRepoService, appService }
export default useStore
