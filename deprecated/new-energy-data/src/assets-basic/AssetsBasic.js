import _ from 'lodash'

const formatNumber = val => new Intl.NumberFormat().format(val)
const parseNumber = val => parseInt(val.replace(/,/g, ''))

export default {
  state: () => {
    return {
      capacity_power_wf: 430000,
      capacity_power_pv: 370000,
      farms: [{
        name: '乾安风电场',
        capacity: 230000
      }, {
        name: '巨兴风电场',
        capacity: 120000
      }, {
        name: '腰营沟风电场',
        capacity: 80000
      }, {
        name: '合龙光伏场',
        capacity: 160000
      }, {
        name: '白岩光伏场',
        capacity: 210000
      }]
    }
  },

  computed: {
    capacity_pie: (state) => {
      return [parseInt(state.indicators.capacity_wf), parseInt(state.indicators.pv)]
    },
    generateByMonth: (state) => {
      return [
        _.range(12).map(i => (i + 1) + '月'),
        state.series.restrictedPowerByMonth,
        state.series.planGeneratedByMonth,
        state.series.acturalGeneratedByMonth
      ]
    },
    powerCompares: (state) => {
      return [
        state.series.dayPowersBy5Minutes,
        state.series.dayPowersPredictBy5Minutes,
        _.range(24 * 12).map(i => null)
      ]
    }
  },

  async setup () {

  },

  destory () {

  },
  watch: {
  },

  actions: {

  }
}
