import { getUserStatus, logout } from '/npm/ridge-common/js/utils.js'
const ridgeBaseUrl = window.RIDGE_HOST ?? ''

export default {
  name: 'BootStrapThemes',
  events: [{
    name: 'darkChange',
    label: '黑白切换'
  }],
  state: {
    userLogon: false, // 用户是否登录
    displayState: 'unlogin', // 登录状态面板值 logon/unlogin
    userAvatarUrl: ridgeBaseUrl + '/avatar/avatar.svg', // 用户头像地址
    userCover: '', // 用户背景，暂时不用
    userId: '', // 用户账号（手机号码）
    isDark: false, // 暗色模式
    themes: [{ // 配色选项
      label: '默认',
      value: '/npm/bootstrap/dist/css/bootstrap.min.css'
    }, {
      label: 'journal',
      value: '/npm/bootswatch/dist/journal/bootstrap.min.css',
    }, {
      label: 'lumen',
      value: '/npm/bootswatch/dist/lumen/bootstrap.min.css'
    },{ 
      label: 'minty',
      value: '/npm/bootswatch/dist/minty/bootstrap.min.css'
    },{
      label: 'pulse',
      value: '/npm/bootswatch/dist/pulse/bootstrap.min.css'
    }, {
      label: 'sandstone',
      value: '/npm/bootswatch/dist/sandstone/bootstrap.min.css'
    }, {
      label: 'cerulean',
      value: '/npm/bootswatch/dist/cerulean/bootstrap.min.css'
    }]
  },

  async setup () {
    if (localStorage.getItem("data-bs-theme") === 'dark') {
      document.querySelector('html').setAttribute("data-bs-theme", 'dark')
      this.isDark = true
    }
    if (localStorage.getItem('data-bs-color')) {
      this.setTheme(localStorage.getItem('data-bs-color'))
    }
    this.checkLoginStatus()
  },

  destory () {
  },

  watch: {
    isDark () {
      this.toggleColorMode()
    }
  },

  actions: {
    async checkLoginStatus () { // 检查用户登录状态
      const userInfo = await getUserStatus()
      if (userInfo && userInfo.id) {
        this.userLogon = true
        this.userId = userInfo.id
        this.userAvatarUrl = ridgeBaseUrl + '/avatar/' + userInfo.id + '.webp'
        this.displayState = 'logon'
      } else {
        this.userLogon = false
        this.userAvatarUrl = ridgeBaseUrl + '/avatar/avatar.svg'
        this.displayState = 'unlogin'
      }
    },
    
    _removeCss (contains) {
      const links = Array.from(document.head.children).filter(node => node.tagName.toLowerCase() === 'link')
      for (const link of links) {
        if (link.href.indexOf(contains) > -1) {
          document.head.removeChild(link)
        }
      }
    },

    async _loadCss (href) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = href
      document.getElementsByTagName('HEAD')[0].appendChild(link)
    },

    setTheme(themeValue) { // 设置配色
      this._removeCss('bootstrap.min.css')
      this._loadCss(themeValue)
      localStorage.setItem('data-bs-color', themeValue)
    },
    toggleColorMode () {  // 切换黑白
      if (this.isDark) {
        document.querySelector('html').setAttribute("data-bs-theme", 'dark')
        localStorage.setItem("data-bs-theme", 'dark')
        this.emit('darkChange', 'dark')
      } else {
        document.querySelector('html').setAttribute("data-bs-theme", 'light')
        localStorage.setItem("data-bs-theme", 'light')
        this.emit('darkChange', 'light')
      }
    },
    async logout () { // 退出登录
      await logout()
      await this.checkLoginStatus()
      this.emit('logout')
    }
  }
}
