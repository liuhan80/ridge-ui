export default {
  name: 'PackageJSONEdit',
  label: '应用包管理',
  dependencies: ['axios'],
  properties: [{
    name: 'package',
    label: '组件包数据',
    type: 'object'
  }],
  events: [{
    name: 'onChange',
    label: '包改变'
  }],
  state: () => {
    return {
      nameValid: true,
      packageJSONObject: { // 应用包
        name: '', // 名称
        version: '', // 版本
        description: '', // 描述
        author: '', // 作者
        dependencies: { // 依赖
        }
      }
    }
  },

  computed: {
    name: { // 包名称
      get: states => {
        const [, , ...rest] = states.packageJSONObject.name.split('-')
        return rest.join('-')
      },
      set: (name, states) => {
        states.packageJSONObject.name = 'ridgebot-app-' + name
      }
    }
  },

  async setup () {
    Object.assign(this.state.packageJSONObject, this.properties.package)
  },

  destory () {
  },

  watch: {
  },

  actions: {
    async checkNameAndVersion () { // 检查名称及版
      // const result = await axios.get(`/api/npm/get/${this.state.packageJSONObject.name}/${this.state.packageJSONObject.version}`)
      const result = await axios.get(`/api/npm/get?name=${this.state.packageJSONObject.name}&version=${this.state.packageJSONObject.version}`)
      if (result.data.ok) {
        return true
      } else {
        return false
      }
    },

    async savePackage () { // 保存
      this.emit('onChange', [this.state.packageJSONObject])
    },

    async publishPackage () { // 发布
      const result = await axios.post(`/api/npm/publish?name=${this.state.packageJSONObject.name}&version=${this.state.packageJSONObject.version}`)
      if (result.data.ok) {
        return true
      } else {
        return false
      }
    }
  }
}
