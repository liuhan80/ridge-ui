import { getStoreStatus, fullscreenLoading, showAlert, showConfirm, showMessage, uploadAppPackage, selectFile } from '/npm/ridge-common/js/utils.js'

export default {
  name: 'RidgeAppShare',
  state: {
    packageName: '',
    publishOnSave: [],    // 选择保存同时发布
    collectRequest: [],   // 选择发布并收录
    publishErrorMsg: '',
    publishDisabled: true,
    userAppTree: [], // 用户应用列表树
    appPublishing: false, // 应用发布中
    openAppName: '', // 当前打开应用名称
    cloudEnabled: false, // 启用云功能    
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

    openConfigDialog () {
      this.state.dialogAppConfig = true
      this.initUserStore()
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
