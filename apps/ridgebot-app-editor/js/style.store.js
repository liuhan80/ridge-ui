export default {
  name: 'StyleStore',
  title: '样式选择',
  properties: [{
    name: 'value',
    label: '已选样式',
    type: 'object',
    value: []
  }],
  state: () => {
    return {
      selectedValues: [], // 已选样式
      packageList: [], // 组件包列表
      currentPackage: '', // 当前组件包
      currentGroup: '', // 当前样式组
      groupSelected: {} // 已选择索引
    }
  },

  computed: {
    currentPackageStyleGroup: { // 样式组列表
      get () {
        const pkgFound = this.packageList.filter(n => n.value === this.currentPackage)
        return pkgFound.length ? pkgFound[0].styleList : []
      },
      dependencies: ['currentPackage']
    },
    currentGroupClassList: { // 样式列表
      get () {
        const groupFound = this.currentPackageStyleGroup.filter(n => n.value === this.currentGroup)
        return groupFound.length ? groupFound[0].children : []
      },
      dependencies: ['currentPackageStyleGroup', 'currentGroup']
    },
    currentGroupSelected: { // 当前组选定样式
      get () {
        return this.groupSelected[this.currentGroup]
      },
      dependencies: ['groupSelected', 'currentGroup']
    },
    styleTitle: scope => { // 样式组标题
      return scope.item.label
    },
    classPreviewHTML: scope => { // 类样式预览
      return scope.item.html
    },
    itemClassName: scope => { // 已选择-单选内容
      return scope.item.split('/')[1]
    }
  },

  async setup () {
    for (const pkg of ridge.loadAppPackages ?? []) {
      if (pkg.ridgeDev) {
        const devLoaded = (await import(ridge.baseUrl + '/' + pkg.name + '/' + pkg.ridgeDev)).default
        this.packageList.push({
          label: pkg.description,
          value: pkg.name,
          styleList: devLoaded
        })
      }
    }
    if (this.packageList.length) {
      this.currentPackage = this.packageList[0].value
      this.currentGroup = this.currentPackageStyleGroup[0].value
    }
    if (this.properties.value) {
      this.selectedValues = this.properties.value
    }
    this.buildSelectedGroup()
  },

  destory () {
  },

  watch: {
  },

  actions: {
    onClassItemClick (i, data) { // 单击样式
      const groupFound = this.currentPackageStyleGroup.filter(n => n.value === this.currentGroup)[0]
      if (!groupFound) return

      if (!this.groupSelected[this.currentGroup]) {
        this.groupSelected[this.currentGroup] = []
      }

      if (!groupFound.multiple) { // 仅单选
        if (this.groupSelected[this.currentPackage][this.currentGroup][0] === i) {
          // 如果当前选中的就是这一项，则取消选择
          this.groupSelected[this.currentPackage][this.currentGroup] = []
        } else {
          // 选择新的项
          this.groupSelected[this.currentPackage][this.currentGroup] = [i]
        }
      } else { // 多选情况
        // 多选逻辑
        // 如果已存在选中项，则进行切换
        const index = this.groupSelected[this.currentPackage][this.currentGroup].indexOf(i)
        if (index > -1) {
          // 取消选择
          this.groupSelected[this.currentPackage][this.currentGroup].splice(index, 1)
        } else {
          // 添加选择
          this.groupSelected[this.currentPackage][this.currentGroup].push(i)
        }
      }
      this.selectedValues = this.getSelectedKeys()
      this.emit('input', this.selectedValues)
    },

    getSelectedKeys () { // 从分组信息生成选值
      const keys = []
      for (const pkgName in this.groupSelected) {
        for (const groupName in this.groupSelected[pkgName]) {
          const groupFound = this.currentPackageStyleGroup.find(n => n.value === groupName)
          for (const i of this.groupSelected[pkgName][groupName]) {
            keys.push(pkgName + '/' + groupFound.children[i].key)
          }
        }
      }
      return keys
    },

    buildSelectedGroup () { // 从选值回写到分组
      for (const pkg of this.packageList) {
        this.groupSelected[pkg.value] = {}
        for (const groupListing of pkg.styleList) {
          this.groupSelected[pkg.value][groupListing.value] = []
          for (let i = 0; i < groupListing.children.length; i++) {
            if (this.selectedValues.includes(pkg.value + '/' + groupListing.children[i].key)) {
              this.groupSelected[pkg.value][groupListing.value].push(i)
            }
          }
        }
      }
    }
  }
}
