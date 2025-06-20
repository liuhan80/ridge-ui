export default {
  name: 'YesIcon',
  label: 'Yesicon图标',

  state: () => {
    return {
      globalLoading: true, // 初始化中,
      iconsLoading: true, // 图标加载中
      collections: [], // 图标库列表
      current: '', // 当前库
      icons: [], // 当前图标列表
      query: '' // 查询条件
    }
  },

  computed: {
    collectionName: (scope) => { // 列表项-图标库名称
      return scope.name
    },
    collectionCount: (scope) => { // 列表项-图标库数量
      return scope.total
    }
  },

  async setup () {
    const json = (await this.axios.get('https://unpkg.com/@iconify/json/collections.json')).data
    this.state.globalLoading = false
    this.state.collections = Object.keys(json).map(name => {
      return {
        key: name,
        ...json[name]
      }
    })
  },

  actions: {
    async fetchIcons () {
      this.state.iconsLoading = true
      this.state.current = this.scope.__key
      const json = await this.axios.get(`https://unpkg.com/@iconify/json/json/${this.scope.__key}.json`)
      this.icons = json
    }
  }
}
