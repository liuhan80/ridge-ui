// src/store/useStore.js
import { create } from 'zustand'
import { scores, rankFarmList, provincesList } from './mock'

const API_PREFIX = window.API_PREFIX
// 创建全局store
const useStore = create((set) => ({
  // 初始化状态
  leftShow: true,

  // 设备情况
  statistics: {
    wind_turbine: '--',
    inverter: '--',
    substation: '--'
  },

  setLeftshow: () => set(state => {
    return {
      leftShow: !state.leftShow
    }
  }),
  scores,
  rankFarmList,
  provincesList,

  count: 0,
  theme: 'light',
  user: null,

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

  fetchStatistics: async () => {
    const res = await fetch(`${API_PREFIX}/equipment/statistics`)

    const statistics = await res.json()

    set({ statistics })
  }
}))

export default useStore
