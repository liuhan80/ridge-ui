import _ from 'lodash'

const nextRandom = val => val + _.random(21) - 10

const formatNumber = val => new Intl.NumberFormat().format(val)
const parseNumber = val => parseInt(val.replace(/,/g, ''))
const randomIncrease = (val, inc) => formatNumber(parseNumber(val) + _.random(inc))

export default {
  state: () => {
    const d = new Date()
    let value = 400
    return {
      now: d.toLocaleString(),
      capacity: {
        total: 360000,
        wf: 243000,
        pv: 117000
      },
      // 发电量
      generated: {
        day: 200,
        dayComplete: 80,
        month: 2193,
        monthComplete: 89,
        yearCompared: 15.1, // 同比去年
        sequentialCompared: -12.3, // 环比
        year: 9210,
        yearComplete: 53,
        total: 29812,
        hoursByMonth: [],
        byMonth: _.range(new Date().getMonth() + 1).map(i => 30000 + _.random(5000)), // 按月发电量
        planByMonth: _.range(new Date().getMonth() + 1).map(i => 30000 + _.random(5000)), // 计划发电量
        lastYearByMonth: _.range(12).map(i => 28000 + _.random(2000)) // 去年按月发电量
      },
      map: {
        activeLine: 0,
        current: {
          name: '',
          capacity: 200,
          currentPower: '',
          windSpeed: 4,
          dayGenerated: '1,201',
          monthGenerated: '32,100',
          yearGenerated: '12,102'
        }
      },
      farms: [{
        name: '乾安风电场',
        capacity: 230
      }, {
        name: '巨兴风电场',
        capacity: 80
      }, {
        name: '腰营沟风电场',
        capacity: 540
      }, {
        name: '合龙光伏场',
        capacity: 100
      }, {
        name: '白岩光伏场',
        capacity: 200
      }],
      series: {
        // 计划发电量：按月
        planGeneratedByMonth: _.range(12).map(i => 30000 + _.random(5000)),
        // 实际发电量：截至到当前月
        acturalGeneratedByMonth: _.range(new Date().getMonth() + 1).map(i => 32000 + _.random(5000)),
        // 限功率发电量：截至到当前月
        restrictedPowerByMonth: _.range(new Date().getMonth() + 1).map(i => 10000 + _.random(5000)),
        // 单日实时功率（每分钟）
        dayPowersBy5Minutes: _.range(120).map(i => {
          value = nextRandom(value)
          return value
        }),
        // 单日预测实时功率（每分钟）
        dayPowersPredictBy5Minutes: _.range(120).map(i => {
          value = nextRandom(value)
          return value
        })
      }
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
    this.interval = setInterval(this.perSecond.bind(this), 1000)
    this.mapInterval = setInterval(this.mapInterval.bind(this), 5000)
    this.minInterval = setInterval(this.perMinutes.bind(this), 60000)
    // document.addEventListener('keydown', this.handleKeyDown)
  },

  destory () {
    window.clearInterval(this.interval)
    window.clearInterval(this.minInterval)
    // document.removeEventListener('keydown', this.handleKeyDown)
  },
  watch: {
  },

  actions: {

    mapInterval () {
      this.state.map.activeLine += 1
      if (this.state.map.activeLine >= this.state.farms.length) {
        this.state.map.activeLine = 0
      }

      this.state.map.current.name = this.state.farms[this.state.map.activeLine].name
      this.state.map.current.capacity = this.state.farms[this.state.map.activeLine].capacity
      this.state.map.current.currentPower = _.random(this.state.map.current.capacity)
      this.state.map.current.windSpeed = _.random(7)
      this.state.map.current.dayGenerated = randomIncrease(this.state.map.current.dayGenerated, 100)
      this.state.map.current.monthGenerated = randomIncrease(this.state.map.current.monthGenerated, 100)
      this.state.map.current.yearGenerated = randomIncrease(this.state.map.current.yearGenerated, 100)

      this.state.indicators.acturalPower = formatNumber(500 + _.random(100))
      this.state.indicators.acturalPowerRate = Math.floor((500 + _.random(100)) / 600 * 100)
    },

    perSecond () {
      this.state.now = new Date().toLocaleString()
      const secondGenerated = _.random(0, 200)

      this.state.indicators.dayGenerated = new Intl.NumberFormat().format(parseInt(this.state.indicators.dayGenerated.replace(/,/g, '')) + secondGenerated)
      this.state.indicators.yearGenerated = new Intl.NumberFormat().format(parseInt(this.state.indicators.yearGenerated.replace(/,/g, '')) + secondGenerated)
      this.state.indicators.monthGenerated = new Intl.NumberFormat().format(parseInt(this.state.indicators.monthGenerated.replace(/,/g, '')) + secondGenerated)
      this.state.indicators.accumulateGenerated = new Intl.NumberFormat().format(parseInt(this.state.indicators.accumulateGenerated.replace(/,/g, '')) + secondGenerated)

      this.state.indicators.powerTheory = 300 + _.random(1000) / 10
      this.state.indicators.powerForcast = 200 + _.random(2000) / 10
      this.state.indicators.powerActual = 200 + _.random(3000) / 10
      this.state.indicators.powerLimit24h = 20 + _.random(100) / 10
    },

    perMinutes () {
      this.state.series.dayPowersBy5Minutes.push(400 + _.random(20))
      this.state.series.dayPowersPredictBy5Minutes.push(400 + _.random(20))
    }
  }
}
