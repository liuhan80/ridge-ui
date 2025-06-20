export default {
  name: 'Avatar',
  externals: {
    axios: 'axios/dist/axios.min.js'
  },
  events: [{
    label: '保存成功',
    name: 'save-success'
  }],
  state: () => {
    return {
      confirmDisabled: true,
      upload: null,
      croppedDataUrl: ''
    }
  },
  computed: {
    confirmDisabled: state => state.croppedDataUrl === ''
  },

  setup() {
     this.serviceBaseUrl = ''
  },
  actions: {
    setCroppedDataUrl (payload) { // 设置剪裁后图片
      this.croppedDataUrl = payload
    },
    async saveUserAvatar() { // 保存用户头像
      if (this.croppedDataUrl) {
        const formData = new FormData()
        formData.append('avatar', await (await fetch(this.croppedDataUrl)).blob())
        const res = (await this.axios.post(this.serviceBaseUrl + '/api/user/avatar/set', formData)).data
        this.emit('save-success')
      }
    }
  }
}
