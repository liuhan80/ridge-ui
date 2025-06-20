export default {
  name: 'UserPanel',
  description: '用户状态面板',
  externals: {
    axios: 'axios/dist/axios.min.js'
  },
  state: {
    userAvatar: '', // 用户头像
    userId: '',
    loginUserModalVisible: false,
    registerUserModalVisible: false,
    userProfileModalVisible: false,
    uploadAvatarVisible: false, // 上传头像对话框可见
    displayState: ''
  },

  computed: {
  },

  async setup () {
    this.serviceUrl = this.composite.appPackageObject.ridgeServerUrl || ''
    this.checkLoginStatus()
  },

  destory () {
  },

  watch: {
  },

  actions: {
    toast (msg, type = 'success') {
      if (window.SemiUI) {
        const { Toast } = window.SemiUI
        Toast[type](msg)
      }
    },
    openUserProfileModal () { // 打开用户配置
      this.state.userProfileModalVisible = true
    },

    closeRegisterModal () {
      this.state.registerUserModalVisible = false
    },
    closeLoginModal () {
      this.state.loginUserModalVisible = false
    },
    toggleLoginModal () {
      this.state.loginUserModalVisible = true
      this.state.registerUserModalVisible = false
    },
    toggleRegisterModal () {
      this.state.loginUserModalVisible = false
      this.state.registerUserModalVisible = true
    },

    confirm (msg, onOk) {
      if (window.SemiUI) {
        const { Modal } = window.SemiUI
        Modal.confirm({
          zIndex: 10001,
          title: '操作确认',
          content: msg,
          onOk
        })
      } else {
        onOk()
      }
    },

    async checkLoginStatus () { // 检查用户登录状态
      this.closeRegisterModal()
      this.closeLoginModal()
      try {
        const response = (await this.axios.get('/api/user/current', {
          withCredentials: true
        })).data
        
        if (response.data.code === '100404') {
          throw new Error('No API') 
        } else if (response.data.user) {
          this.state.userId = response.data.user.id
          this.userAvatar = '/avatar/' + this.state.userId + '.webp'
          this.state.displayState = 'logon'
          globalThis.ridgeUser = response.data.user
        } else {
          this.state.displayState = 'unlogin'
          globalThis.ridgeUser = null
        }
      } catch (e) {
        this.state.displayState = 'community'
      }
    },

    async logout () { // 退出登录
      this.confirm('确认退出当前用户登录', async () => {
        const response = (await this.axios.post('/api/user/logout', {}, {
          withCredentials: true
        })).data
        this.checkLoginStatus()
      })
    },
    openLoginModal () { // 打开登录框
      this.state.loginUserModalVisible = true
    },

    showUploadAvatarModal () { // 打开上传头像对话框
      this.uploadAvatarVisible = true
    },

    loginConfirmed () { // 登录成功
      this.toast('登录成功')
      this.checkLoginStatus()
    },

    avatarChangeConfirmed() { // 头像修改完
      this.uploadAvatarVisible = false
      this.userAvatar = '/avatar/' + this.state.userId + '.webp'
    },

    profileClose () { // 配置框关闭
      this.state.userProfileModalVisible = false
    }
  }
}
