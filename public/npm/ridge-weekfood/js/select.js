import {  carbs, vegetables, fruits, protein, nuts } from '../foods.js'

export default {
  name: 'SelectFood',
  properties: [{
    name: 'value',
    label: '已选择',
    type: 'object',
    value: []
  }],
  events: [{
    name: 'onChange',
    label: '选择变化'
  }],
  state: {
    currentPage: 0,
    pageSize: 16,
    filter: '',
    currentPageList: [], // 当前页内列表
    filteredPageList: [], // 过滤后列表
    selectedFoods: [], // 已选择内容
    foods: [...carbs, ...vegetables, ...fruits, ...protein, ...nuts]
  },

  computed: {
    selectedCount: {
      get () {
        return this.value?.length
      },
      dependencies: ['value']
    },
    selectedIconVisible: { // 选择图标可见
      get (scope) {
        return this.value?.indexOf(scope.item.name) > -1
      },
      dependencies: ['value']
    },
    icon: scope => { // 食物图标
      if (scope.item.icon) {
        if (scope.item.icon.indexOf('.') > -1) {
          return 'composite://icons/' + scope.item.icon
        } else {
          return 'composite://icons/' + scope.item.icon + '.svg'
        }
      }
    },

    name: scope => { // 食物名称
      return scope.item.name
    },
    nutritional: scope => { // 主要营养成分
      return scope.item.nutritional.join(',')
    }
  },


  setup () {
    this.updateByFilter()
  },

  watch: {
    filter () {
       this.updateByFilter() 
    }
  },

  actions: {

    updateByFilter () {
      this.currentPage = 0 
      this.filteredPageList = this.foods.filter(food => {
          return food.name.indexOf(this.filter) > -1
      })
      this.currentPageList = this.filteredPageList.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize)
    },
    
    prevPage() {
      if (this.currentPage === 0) {
        return
      }
      this.currentPage = this.currentPage - 1
      this.currentPageList = this.filteredPageList.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize)
    },
    nextPage () {
        if (this.currentPage * this.pageSize > this.filteredPageList.length ) {
          return
        }
        this.currentPage = this.currentPage + 1
        this.currentPageList = this.filteredPageList.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize)
    },
    onItemClick (scope) {
      if (this.value?.indexOf(scope.item.name) === -1 ) {
        this.emit('onChange', [...this.value|| [], scope.item.name])
        // this.selectedFoods.push(scope.item.name)
      } else {
        this.emit('onChange', this.value?.filter(name => name !== scope.item.name))
      }
    }
  }
}
