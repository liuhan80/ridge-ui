import {  carbs, vegetables, fruits, protein, nuts } from '../foods.js'

export default {
  name: 'Hello',
  state: {
    foods: [...carbs, ...vegetables, ...fruits, ...protein, ...nuts]
  },

  computed: {
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
    }    
  }
}
