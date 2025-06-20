export default {
  name: 'RidgeAppConfig',
  externals: {
    axios: 'axios/dist/axios.min.js'
  },
  state: {
    packageName: '',
    packageVersion: '',
    packageAuthor: '',
    packageDescription: '',
    packageListData: [],
    packageKeywords: [],
    packageHomePage: '',
    publishOnSave: [],
    publishErrorMsg: '',
    publishDisabled: true,
    dialogAppConfig: false,
    dialogAppPublish: false,
    userStoreStatus: {},
    appPublishing: false, // 应用发布中
    dialogOpenApp: false, // 打开应用对话框
    openAppName: '', // 当前打开应用名称
    openingApp: false, // 打开应用中
    cloudEnabled: false, // 启用云功能
    appListOptions: [],
    moreButtons: [  // 更多按钮列表
      {
        "label": "导出",
        "icon": "IconExport",
        "value": "export"
      },
      {
        "label": "导入",
        "icon": "IconImport",
        "value": "import"
      },
      {
        "label": "清空应用",
        "icon": "IconRefresh",
        "value": "reset"
      },
      {
        "label": "上传应用",
        "icon": "IconCloudUploadStroked",
        "value": "upload"
      },
      {
        "label": "打开我的应用..",
        "icon": "IconFolderOpen",
        "value": "open"
      }
    ],
    exporting: false,
    importting: false
  },
  computed: {
    scopedPackageIcon (scoped) { // Scope-组件包-图标
      return this.composite.context.baseUrl + '/' + scoped.item.name + '/' + scoped.item.icon
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
    this.axios.defaults.withCredentials = true
    this.serverUrl = this.composite.appPackageObject.ridgeServerUrl || 'http://localhost'
    this.appService = this.composite.context.services.appService

    // this.initUserStore()
  },

  destory () {
  },

  watch: {
  },

  actions: {
    getServerUrl () {
      return this.composite.appPackageObject.ridgeServerUrl || 'http://localhost'
    },

    async initUserStore () {
      try {
        const res = (await this.axios.get(this.serverUrl + '/api/app/storage/status')).data
        if (res.code === '100404') {
          throw new Error('AU')
        } else if (res.code === '0') {
          this.userStoreStatus = res.data
          this.publishDisabled = !this.userStoreStatus.rule.npm
        } else {
          
        }
      } catch (e) {
        console.error('initUserStore error', e)
        this.moreButtons = [{
          "label": "导出",
          "icon": "IconExport",
          "value": "export"
        },
        {
          "label": "导入",
          "icon": "IconImport",
          "value": "import"
        },
        {
          "label": "清空应用",
          "icon": "IconRefresh",
          "value": "reset"
        }]
        // 网络错误等
        this.publishDisabled = true
      }
    },

    async updateState () {
      const packageObject = await this.appService.getPackageJSONObject()
      this.packageObject = packageObject
      this.state.packageName = packageObject.name ?? ''
      this.state.packageVersion = packageObject.version ?? ''
      this.state.packageAuthor = packageObject.author ?? ''
      this.state.packageDescription = packageObject.description ?? ''

      this.state.packageListData = []
      for (const packageName in packageObject.dependencies || {}) {
        const object = await this.composite.context.loader.getPackageJSON(packageName)
        if (object) {
          this.state.packageListData.push(object)
        }
      }
    },

    toast (msg, type = 'success') {
      if (window.SemiUI) {
        const { Toast } = window.SemiUI
        Toast[type](msg)
      }
    },

    async confirm (msg, onOk) {
      if (window.SemiUI) {
        const { Modal } = window.SemiUI
        Modal.confirm({
          zIndex: 10001,
          title: '操作确认',
          content: msg,
          onOk
        })
      }
    },

    async onDropDownMenuClick (key) {
      switch (key) {
        case 'save':
          this.save()
          break
        case 'upload':
          this.openPublishDialog()
          break
        case 'export':
          this.exportAppZip()
          break
        case 'import':
          this.importAppZip()
          break
        case 'reset':
          this.resetApp()
          break
        case 'open':
          this.openOpenAppDialog()
          break
        case 'explore':
          this.dialogExploreApp = true
          break
        default:
          break
      }
    },

    async resetApp () {
      this.confirm('重置应用会覆盖现有工作区内容，请提前做好备份。是否继续?', () => {
        this.appService.reset()
      })
    },

    async publishApp () { // 发布应用
      if (this.appPublishing === true) { return }
      this.toast('应用正在发布中，请稍候.... ')

      this.appPublishing = true
      const appService = this.composite.context.services.appService
      const formData = new FormData()
      formData.append('file', await appService.getAppFileBlob())
      formData.append('npmPackage', JSON.stringify(await this.getPackageObject()))
      formData.append('publish', this.state.publishOnSave.length ? 'true' : 'false')

      try {
        const res = (await this.axios.post(this.serverUrl + '/api/app/storage/put', formData)).data

        if (res.code === '100401') {
          this.toast('请登录后再保存')
          return
        }
        if (res.code === '0') {
          if (res.data.error) {
            this.toast(res.data.error)
          } else {
            // 保存成功
            this.toast('应用包上传到云端成功')
          }
          // 发布到npm
          if (res.data.publishQueue) {
            if (!res.data.publishQueue.onwerShip) {
              this.publishErrorMsg = '发布失败: 与公用包重名或您未拥有当前包所有权'
            } else {
              this.state.dialogAppPublish = false
            }
          } else {
            this.state.dialogAppPublish = false
          }
        }
      } catch (e) {
        this.toast('未知异常')
      } finally {
        this.appPublishing = false
      }
      // this.toast('应用已经保存到服务端，位置：/public/npm/' + packageJsonObject.name)
    },

    async importAppZip () { // 导入应用
      const that = this
      this.confirm('导入应用将会覆盖现有工作区内容，请提前做好备份。是否继续?', () => {
        // 创建input元素
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.style.display = 'none'
        // 为文件选择框添加change事件监听，用于获取文件对象并处理
        fileInput.addEventListener('change', function (e) {
          const files = e.target.files
          if (files.length > 0) {
            const selectedFile = files[0]
            console.log('用户选择的文件是：', selectedFile)
            // 在这里可以对选择的文件进行进一步的操作，比如读取文件内容等
            that.appService.importAppArchive(selectedFile).then(() => {
              that.confirm('导入完成，点击确认刷新页面', () => {
                location.reload()
              })
            })
          }
          // 文件处理完成后，删除文件选择框元素
          fileInput.parentNode.removeChild(fileInput)
        })
        // 将文件选择框添加到页面的body元素中，使其显示出来并可用
        document.body.appendChild(fileInput)
        // 触发文件选择框的点击事件，弹出选择框让用户选择文件
        fileInput.click()
      })
    },

    async exportAppZip () { // 导出应用
      if (this.state.exporting) {
        return
      }
      this.toast('正在导出应用，请稍侯...')
      this.state.exporting = true
      await this.appService.exportAppArchive()
      this.state.exporting = false
    },

    async getPackageObject () {
      const packageObject = await this.appService.getPackageJSONObject()
      return Object.assign({}, packageObject, {
        name: this.state.packageName,
        version: this.state.packageVersion,
        author: this.state.packageAuthor,
        description: this.state.packageDescription,
        keywords: this.state.packageKeywords,
        dependencies: this.packageObject.dependencies
      })
    },

    async save () {
      await this.appService.savePackageJSONObject(await this.getPackageObject())
      this.toast('应用配置已经保存到浏览器本地存储')
    },
    openConfigDialog () {
      this.state.dialogAppConfig = true
      this.updateState()
      this.initUserStore()
    },

    async openOpenAppDialog () {
      this.ridgeUser = globalThis.ridgeUser
      if (!this.ridgeUser) {
        this.toast('请先登录', 'warning')
        return
      }
      this.dialogOpenApp = true
      const res = (await this.axios.get(this.serverUrl + '/api/app/storage/status')).data
      this.appListOptions = res.data.storeList.map(app => {
        return {
          label: app.name,
          value: app.name
        }
      })
    },

    async openPublishDialog () {
      this.ridgeUser = globalThis.ridgeUser
      if (!this.ridgeUser) {
        this.toast('您需要成为注册用户才能保存到云端，要保存工作可以导入/导出应用', 'warning')
      } else {
        await this.save()
        this.publishErrorMsg = ''
        this.dialogAppPublish = true
      }
    },

    async doOpenApp () { // 执行打开应用动作
      this.openingApp = true
      try {
        if (!this.openAppName) {
          this.toast('请先选择应用', 'error')
          return
        }
        const zipData = (await this.axios.get(this.serverUrl + '/api/app/storage/download/' + this.openAppName, {
          responseType: 'arraybuffer'
        })).data
        await this.appService.importAppArchive(zipData)
        this.confirm('应用已经导入，点击确认刷新页面', () => {
          location.reload()
        })
      } catch (e) {
        this.toast('打开出错！')
        this.openingApp = false
      }
    },

    async deleteDependency (scope) { // 删除依赖
      console.log('delete dep:' + scope.item.name)
      delete this.packageObject.dependencies[scope.item.name]

      this.state.packageListData = this.state.packageListData.filter(p => p.name !== scope.item.name)
      // await this.appService.savePackageJSONObject(this.getPackageObject())
    },

    closeConfigDialog () {
      this.state.dialogAppConfig = false
    }
  }
}
