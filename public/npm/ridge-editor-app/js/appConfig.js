import { getStoreStatus, fullscreenLoading, showAlert, showConfirm, showMessage, uploadAppPackage, selectFile } from '/npm/ridge-common/js/utils.js'

export default {
  name: 'RidgeAppConfig',
  externals: {
    axios: 'axios/dist/axios.min.js'
  },
  state: {
    packageName: '',
    packageIcon: '',
    packageCover: '', // 覆盖图
    packageVersion: '',
    packageAuthor: '',
    packageDescription: '',
    homeMobile: '',
    homeDesktop: '',
    homeTablet: '',
    packageListData: [],
    packageKeywords: [],
    packageHomePage: '',
    publishOnSave: [],    // 选择保存同时发布
    collectRequest: [],   // 选择发布并收录
    publishErrorMsg: '',
    publishDisabled: true,
    dialogAppConfig: false,
    dialogAppPublish: false,
    userStoreStatus: {},
    showLocalRecoverDialog: false, // 显示恢复本地地址对话框
    userAppTree: [], // 用户应用列表树
    appPublishing: false, // 应用发布中
    dialogOpenApp: false, // 打开应用对话框
    openAppName: '', // 当前打开应用名称
    openingApp: false, // 打开应用中
    cloudEnabled: false, // 启用云功能    
    homePages: { // 首页支持
      mobileEnabled: false,
      desktopEnabled: false,
      tabletEnabled: false,
      homeMobile: 'index', // 移动端首页
      homeDesktop: 'index', // 桌面首页
      homeTablet: 'index'  // 平板首页
    },
  },
  computed: {
    collectionDisabled () {
      return this.publishOnSave.length === 0
    },
    scopedPackageIcon (scoped) { // Scope-组件包-图标
      return this.composite.context.baseUrl + '/' + scoped.item.name + '/' + scoped.item.logo
    },
    scopedPackageName: scoped => { // Scope-组件包-名称
      return scoped.item.name
    },
    scopedPackageDesc: scoped => { // Scope-组件包-描述
      return scoped.item.description
    },
    scopedPackageVersion: scoped => { // Scope-组件包-版本
      return scoped.item.version
    }
  },

  async setup () {
    this.appService = this.composite.context.services.appService
    this.updateState()
  },

  destory () {
  },

  watch: {
  },

  actions: {
    async initUserStore () {
      this.userStoreStatus = await getStoreStatus()
      if (this.userStoreStatus == null) {
        this.cloudEnabled = false
      } else {
        this.cloudEnabled = true
        this.publishDisabled = !this.userStoreStatus.allowPublish
        this.userAppTree = this.userStoreStatus.userAppTree
      }
    },

    async updateState () {
      const packageObject = await this.appService.getPackageJSONObject()
      this.packageObject = packageObject
      this.state.packageName = packageObject.name ?? ''
      this.state.packageIcon = packageObject.icon ?? 'icon.png'
      this.state.packageCover = packageObject.cover ?? 'cover.png'
      this.state.packageVersion = packageObject.version ?? ''
      this.state.packageAuthor = packageObject.author ?? ''
      this.state.packageDescription = packageObject.description ?? ''

      if (packageObject.ridgeEntries) {
        this.homePages = {
          mobileEnabled: packageObject.ridgeEntries.mobile ? true: false,
          desktopEnabled: packageObject.ridgeEntries.desktop ? true: false,
          tabletEnabled: packageObject.ridgeEntries.tablet ? true: false,
          homeMobile: packageObject.ridgeEntries.mobile, // 移动端首页
          homeDesktop: packageObject.ridgeEntries.desktop, // 桌面首页
          homeTablet: packageObject.ridgeEntries.tablet  // 平板首页
        }
      }

      this.state.packageListData = []
      for (const packageName in packageObject.dependencies || {}) {
        const object = await this.composite.context.loader.getPackageJSON(packageName)
        if (object) {
          this.state.packageListData.push(object)
        }
      }
    },

    async resetApp () {
      if (await showConfirm('重置应用会覆盖现有工作区内容，请提前做好备份。是否继续?')) {
        this.appService.reset()
      }
    },

    async publishApp () { // 发布应用
      const cancel = fullscreenLoading()
      const appService = this.composite.context.services.appService
      const result = await uploadAppPackage(await this.getPackageObject(), await appService.getAppFileBlob(), this.publishOnSave.length > 0, this.collectRequest.length > 0)
      cancel()
      if (result === '1') {
        showMessage('应用包上传到云端成功')
        this.dialogAppPublish = false
      } else {
        this.publishErrorMsg = result
      }
    },

    async importAppZip () { // 导入应用
      if (await showConfirm('导入应用将会覆盖现有工作区内容，请提前做好备份。是否继续?')) {
        const file = await selectFile()
        if (file) {
          await this.appService.importAppArchive(file)
          await showAlert('导入完成，点击确认刷新页面')
          location.reload()   
        }
      }
    },

    async exportAppZip () { // 导出应用
      await this.appService.exportAppArchive()
    },

    async getPackageObject () {
      const packageObject = await this.appService.getPackageJSONObject()

      const ridgeEntries = {
      }

      if (this.homePages.mobileEnabled) {
        ridgeEntries.mobile = this.homePages.homeMobile
      }
      if (this.homePages.desktopEnabled) {
        ridgeEntries.desktop = this.homePages.homeDesktop
      }
      if (this.homePages.tabletEnabled) {
        ridgeEntries.tablet = this.homePages.homeTablet
      }
      
      return Object.assign({}, packageObject, {
        name: this.state.packageName,
        icon: this.state.packageIcon,
        cover: this.state.packageCover,
        version: this.state.packageVersion,
        author: this.state.packageAuthor,
        description: this.state.packageDescription,
        keywords: this.state.packageKeywords,
        ridgeEntries,
        dependencies: this.packageObject.dependencies
      })
    },

    async save () { // 保存到浏览器存储
      await this.appService.savePackageJSONObject(await this.getPackageObject())
      showMessage('应用配置已经保存到浏览器本地存储')
    },

    openConfigDialog () {
      this.state.dialogAppConfig = true
      this.initUserStore()
    },

    async openOpenAppDialog () { // 打开选择应用对话框
      if (!this.userStoreStatus.id) {
        showAlert('您需要成为注册用户')
        return
      }
      this.dialogOpenApp = true
    },

    async openPublishDialog () { // 保存并发布到云
      if (!this.userStoreStatus.id) {
        showAlert('您需要成为注册用户才能保存到云端，要保存工作可以导入/导出应用') 
        return
      }
      await this.save()
      this.publishErrorMsg = ''
      this.dialogAppPublish = true
    },

    async deleteDependency (scope) { // 删除依赖
      delete this.packageObject.dependencies[scope.item.name]

      this.state.packageListData = this.state.packageListData.filter(p => p.name !== scope.item.name)
    },

    openBilibili() {
      window.open('https://space.bilibili.com/621457166', '_blank')
    },
    openHelpDoc() {
      window.open('https://ridgeui.com/#/pages/document', '_blank')
    },

    openHistoryDialog() { // 打开本地历史对话框
      this.showLocalRecoverDialog = true
    },

    closeConfigDialog () {
      this.state.dialogAppConfig = false
    }
  }
}
