import _ from 'lodash'

const nextRandom = val => val + _.random(21) - 10

const formatNumber = val => new Intl.NumberFormat().format(val)
const parseNumber = val => parseInt(val.replace(/,/g, ''))
const randomIncrease = (val, inc) => formatNumber(parseNumber(val) + _.random(inc))

// const config = {
//     pvList:[
//         {
//             id:1,
//             name:'桥西三扶贫光伏',
//             x: 284,
//             y: 181,
//             w: 32,
//             h: 32,
//             online:true,
//             speed: 0
//         },
//         {
//             id:2,
//             name:'酒泉玉门光伏电站',
//             x: 398,
//             y: 227,
//             w: 32,
//             h: 32,
//             online:true,
//             speed: 10
//         },
//         {
//             id:3,
//             name:'酒泉金塔光伏电站',
//             x: 438,
//             y: 222,
//             w: 32,
//             h: 32,
//             online:false,
//             speed: 10
//         },
//         {
//             id:5,
//             name:'张掖高台光伏电站',
//             x: 474,
//             y: 286,
//             w: 32,
//             h: 32,
//             online:false,
//             speed: 10
//         },
//         {
//             id:6,
//             name:'武威民勤光伏电站',
//             x: 571,
//             y: 320,
//             w: 32,
//             h: 32,
//             online:false,
//             speed: 10
//         },
//         {
//             id:7,
//             name:'武威凉州光伏电站',
//             x: 601,
//             y: 333,
//             w: 32,
//             h: 32,
//             online:false,
//             speed: 10
//         }
//     ],
//     wfList:[{
//             id:8,
//             name:'酒泉瓜州干六风电场',
//             x: 230,
//             y: 152,
//             w: 48,
//             h: 64,
//             online:true,
//             speed: 10
//         },
//         {
//             id:9,
//             name:'酒泉瓜州干五风电场',
//             x: 244,
//             y: 157,
//             w: 48,
//             h: 64,
//             online:true,
//             speed: 10
//         },
//         {
//             id:10,
//             name:'酒泉瓜州北四风电场',
//             x: 264,
//             y: 146,
//             w: 48,
//             h: 64,
//             online:false,
//             speed: 10
//         },
//         {
//             id:11,
//             name:'瓜州安北风电场',
//             x: 311,
//             y: 147,
//             w: 48,
//             h: 64,
//             online:false,
//             speed: 10
//         }],
//     org: {
//         x: 670,
//         y: 420,
//         w: 77,
//         h: 64
//     }
// }

export default {
  state: () => {
    const d = new Date()
    let value = 400
    return {
      当前时间: d.toLocaleString(),
      发电量信息: {
        日发电量: 0,
        月发电量: 0,
        年发电量: 0,
        月计划发电量: 0,
        年计划发电量: 0,
        年发电量按月统计: [],
        年发电量按月计划: []
      },
      功率24h: {
        实时功率: 0,
        理论功率: 0,
        预测功率: 0,
        计划功率: 0,
        实时功率每5分钟: [],
        预测功率每5分钟: []
      },
      设备信息: {

      },

      indicators: {
        capacity_wf: '360,000',
        capacity_pv: '210,000',
        accumulateGenerated: '2,345,231',
        yearGenerated: '240,000',
        monthGenerated: '23,345',
        dayGenerated: '1,022',
        monthIncRate: '1.23%',
        monthPlanned: '670,000',
        yearPlanned: '2,240,000',
        yearLimitted: '23,000',
        yearLimittedRate: '9%',
        h24PowerLimit: '130.21',
        forcastPower: '266.34',
        acturalPower: '265.2',
        acturalPowerRate: 82,
        predictAccuracy: '93.3%',
        agcCtrlAccuracy: '89.2%',
        powerAccuracy: '96.3%'
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
    },

    perMinutes () {
      this.state.series.dayPowersBy5Minutes.push(400 + _.random(20))
      this.state.series.dayPowersPredictBy5Minutes.push(400 + _.random(20))
    }
  }
}
