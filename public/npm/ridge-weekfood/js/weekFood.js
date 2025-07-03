import { carbs, vegetables, fruits, protein, nuts } from '../foods.js'
const foods = [...carbs.map(item => {
  return { ...item, cat: 'cron' }
}), [...vegetables, ...fruits].map(item => {
  return { ...item, cat: 'vf' }
}), ...protein, ...nuts]

/**
 * 获取指定年和周的详细信息，包含当前周数据及上下周翻页信息
 * @param {number} [year] - 目标年份（默认当前年）
 * @param {number} [week] - 目标周序号（默认当前周，从1开始）
 * @returns {Object} 包含当前周信息及上下周翻页数据
 */
function getWeekInfo (year, week) {
  // 辅助函数：计算指定日期所在周的年和周（周一为周首）
  function getYearWeek (date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0) // 清除时间部分
    const day = d.getDay() || 7 // 转换为：1=周一，7=周日
    const monday = new Date(d)
    monday.setDate(d.getDate() - (day - 1)) // 计算本周一

    // 计算当年1月的第一个周一
    const jan1 = new Date(monday.getFullYear(), 0, 1)
    const jan1Day = jan1.getDay() || 7
    const firstMonday = new Date(jan1)
    firstMonday.setDate(jan1.getDate() - (jan1Day - 1))

    // 处理跨年的周一（如1月1日的周一可能在上一年）
    if (monday < firstMonday) {
      const prevYear = monday.getFullYear() - 1
      const prevJan1 = new Date(prevYear, 0, 1)
      const prevJan1Day = prevJan1.getDay() || 7
      const prevFirstMonday = new Date(prevJan1)
      prevFirstMonday.setDate(prevJan1.getDate() - (prevJan1Day - 1))
      const diffDays = (monday - prevFirstMonday) / (24 * 3600 * 1000)
      return { year: prevYear, week: Math.floor(diffDays / 7) + 1 }
    }

    // 计算当前周序号
    const diffDays = (monday - firstMonday) / (24 * 3600 * 1000)
    return { year: monday.getFullYear(), week: Math.floor(diffDays / 7) + 1 }
  }

  // 处理默认参数（当前年和周）
  const now = new Date()
  const defaultYW = getYearWeek(now)
  const targetYear = year ?? defaultYW.year
  const targetWeek = week ?? defaultYW.week

  // 计算目标周的周一日期
  const firstMondayOfYear = (() => {
    const jan1 = new Date(targetYear, 0, 1)
    const jan1Day = jan1.getDay() || 7
    const firstMonday = new Date(jan1)
    firstMonday.setDate(jan1.getDate() - (jan1Day - 1))
    return firstMonday
  })()
  const targetMonday = new Date(firstMondayOfYear)
  targetMonday.setDate(firstMondayOfYear.getDate() + (targetWeek - 1) * 7)

  // 生成周一到周日的7天数据
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(targetMonday)
    date.setDate(targetMonday.getDate() + i)
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // 月份1-12
      date: date.getDate(), // 日
      dayOfWeek: i + 1, // 1=周一，7=周日
      formatted: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    }
  })

  // 计算上一周的年和周（翻页用）
  const prevMonday = new Date(targetMonday)
  prevMonday.setDate(targetMonday.getDate() - 7)
  const prevYW = getYearWeek(prevMonday)

  // 计算下一周的年和周（翻页用）
  const nextMonday = new Date(targetMonday)
  nextMonday.setDate(targetMonday.getDate() + 7)
  const nextYW = getYearWeek(nextMonday)

  return {
    // 当前周基本信息
    current: {
      year: targetYear, // 当前周所属年
      week: targetWeek, // 当前周序号
      monday: targetMonday.toISOString().split('T')[0], // 本周一格式化日期
      days // 周一到周日详细数据
    },
    // 上一周翻页信息
    prev: {
      year: prevYW.year,
      week: prevYW.week
    },
    // 下一周翻页信息
    next: {
      year: nextYW.year,
      week: nextYW.week
    }
  }
}

export default {
  name: 'WeekFood',
  state: {
    currentTabIndex: 0,
    currentDate: '', // 当前时间
    days: [],
    mondayMonth: 1,
    totalWeeks: 0,
    currentDateFoods: [], // 当前选择的水果
    foodRecords: [{ // 所有日期选择记录，需要持久化
      date: '2025-07-02',
      foods: ['苹果']
    }],
    foodForSelect: [], // 提供给选择器食物
    listCrons: [],
    listVegFruits: [],
    listMeats: [],
    listNutOils: []
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
    }
  },

  setup () {

  },

  actions: {
    openSelect () { // 打开选择页
      this.foodForSelect = JSON.parse(JSON.stringify(this.currentDateFoods))
      this.currentTabIndex = 1
    },

    doCancelFoodSelect () { // 取消选择
      this.currentTabIndex = 0
    },
    doFoodConfirm () { // 确认食物选择
      this.currentDateFoods = JSON.parse(JSON.stringify(this.foodForSelect))
      this.extractSeparateList(this.currentDateFoods)
      this.currentTabIndex = 0
    },
    onFoodSelect (foods) {
      this.foodForSelect = foods
    },
    extractSeparateList (foods = ['苹果']) {
      // 重置状态列表
      this.state.listCrons = []
      this.state.listVegFruits = []
      this.state.listMeats = []
      this.state.listNutOils = []

      // 从每个食物分类中筛选匹配的食物
      foods.forEach(foodName => {
        // 检查碳水化合物
        const cronItem = carbs.find(item => item.name === foodName)
        if (cronItem) {
          this.state.listCrons.push({ ...cronItem, cat: 'cron' })
          return
        }

        // 检查蔬菜和水果
        const vegItem = vegetables.find(item => item.name === foodName)
        if (vegItem) {
          this.state.listVegFruits.push({ ...vegItem, cat: 'vf' })
          return
        }

        const fruitItem = fruits.find(item => item.name === foodName)
        if (fruitItem) {
          this.state.listVegFruits.push({ ...fruitItem, cat: 'vf' })
          return
        }

        // 检查蛋白质
        const proteinItem = protein.find(item => item.name === foodName)
        if (proteinItem) {
          this.state.listMeats.push(proteinItem)
          return
        }

        // 检查坚果和油脂
        const nutItem = nuts.find(item => item.name === foodName)
        if (nutItem) {
          this.state.listNutOils.push(nutItem)
        }
      })
    }
  }

}
