export default {
  name: 'BigScreenBasic', // 风电集控中心
  label: '风电集控中心基础数据',
  state: () => {
    const d = new Date()

    return {
      now: d.toLocaleString(),
      capacity: {
        total: 360000, // 总装机容量
        wf: 243000, // 风电装机容量
        pv: 117000 // 光伏装机容量
      },
      // 发电量
      generated: {
        day: 200, // 日发电量
        dayComplete: 80, // 日发电量完成率
        month: 2193, // 月发电量
        monthComplete: 89, // 月发电量完成率
        monthPlaned: 3499, // 月计划发电量
        yearCompared: 15.1, // 按月同比
        sequentialCompared: -12.3, // 按月环比
        yearTotal: 9210, // 年发电量
        yearPlanned: 89000, // 年计划发电量
        yearLimit: 12000, // 年限电量
        yearComplete: 53, // 年发电量完成率
        total: 29812, // 累计发电量
        hoursByMonth: [], // 每月等效小时
        theoreticalGeneration: _.range(new Date().getMonth() + 1).map(i => 30000 + _.random(5000)), // 理论发电量（系列）
        actualGeneration: _.range(new Date().getMonth() + 1).map(i => 30000 + _.random(5000)), // 实际发电量 （系列）
        plannedGeneration: _.range(new Date().getMonth() + 1).map(i => 30000 + _.random(5000)), // 计划发电量 （系列）
        lastYearGeneration: _.range(12).map(i => 28000 + _.random(2000)) // 去年按月发电量 （系列）
      },
      // 功率
      power: {
        total: 408.2, // 理论功率
        current: 356, // 实时功率,
        predict: 365.2, // 预测功率
        predictSerie: _.range(120).map(i => 250 + _.random(20)), // 5分钟预测曲线
        acturalSerie: _.range(120).map(i => 380 - _.random(40)) // 5分钟实际功率曲线
      }
    }
  },

  computed: {
    generationCompare: (state) => { // 按月发电量对比（去年、理论、实际）
      return [
        _.range(12).map(i => i + '月'),
        state.generated.lastYearGeneration,
        state.generated.theoreticalGeneration,
        state.generated.actualGeneration
      ]
    },
    capacityPie: state => { // 装机容量构成
      return [['风电', '光伏'], [state.capacity.wf, state.capacity.pv]]
    },
    powerCompare: state => { // 24h功率曲线
      return [
        _.range(24 * 12).map(i => null),
        state.power.predictSerie,
        state.power.acturalSerie
      ]
    }
  },

  async setup () {
    this.perMinutes()
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

  formatter: {
    toLocale: num => { // 千分位格式
      return num != null && num.toLocaleString && num.toLocaleString()
    }
  },
  watch: {
  },

  actions: {
    mapInterval () {
    },

    perSecond () {
      this.state.generated.day += _.random(4)
      this.state.generated.month += _.random(4)
      this.state.power.current += 10 - _.random(20)
      this.state.power.predict += 10 - _.random(20)
    },

    perMinutes () {

    }
  }
}
