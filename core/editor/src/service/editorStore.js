import { create } from 'zustand'

export const editorStore = create((set, get) => ({
  theme: '',
  isLight: true,

  openedFileContentMap: {},

  setIsLight: isLight => set(state => {
    if (isLight === false || isLight === 'false') {
      document.body.setAttribute('theme-mode', 'dark')
    } else {
      document.body.setAttribute('theme-mode', 'light')
    }
    return {
      isLight
    }
  }),

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  fetchStatistics: async () => {
    const res = await fetch('/equipment/statistics')

    const statistics = await res.json()

    set({ statistics })
  }
}))
