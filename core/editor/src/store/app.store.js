// src/store/useStore.js
import { create } from 'zustand'
import LocalRepoService from '../service/LocalRepoService'
import ApplicationService from '../service/ApplicationService'
import BackUpService from '../service/BackUpService'

const appService = new ApplicationService()
const localRepoService = new LocalRepoService()
const backUpService = new BackUpService(appService)

const useStore = create((set) => ({
  // 初始化状态
  appList: [],
  loadingAppFiles: true,
  currentAppFilesTree: [],

  setScores: scores => set(state => {
    return {
      scores
    }
  }),

  // 定义更新状态的方法（支持同步/异步）
  increment: () => set((state) => ({ count: state.count + 1 })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setUser: (user) => set({ user }),
  // 异步方法（如请求接口获取用户信息）
  fetchUser: async (userId) => {
    const res = await fetch(`/api/user/${userId}`)
    const user = await res.json()
    set({ user })
  },

  initAppStore: async () => {
    const appList = await localRepoService.getLocalAppList()
    if (appList.length === 0) {
      // 创建一个默认应用
      await backUpService.importHelloArchive()
    }
    await appService.updateAppFileTree()

    set({
      loadingAppFiles: false,
      currentAppFilesTree: appService.fileTree
    })
  },

  updateAppList: async () => {
    const appList = localRepoService.getLocalAppList()
    set({
      appList
    })
  }

}))

export { localRepoService, appService }
export default useStore
