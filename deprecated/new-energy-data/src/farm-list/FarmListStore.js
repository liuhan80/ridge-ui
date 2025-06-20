import _ from 'lodash'
export default {
  state: () => {
    const farms = [{
      name: '乾安风电场',
      type: 'wf',
      capacity: 230
    }, {
      name: '巨兴风电场',
      type: 'wf',
      capacity: 80
    }, {
      name: '腰营沟风电场',
      type: 'wf',
      capacity: 540
    }, {
      name: '合龙光伏场',
      type: 'pv',
      capacity: 100
    }, {
      name: '白岩光伏场',
      type: 'pv',
      capacity: 200
    }, {
      name: '瓜州安北风电场',
      type: 'wf'
    }, {
      name: '酒泉瓜州干六风电场',
      type: 'wf'
    }, {
      name: '桥西三扶贫光伏',
      type: 'pv'
    }, {
      name: '酒泉金塔光伏电站',
      type: 'pv'
    }, {
      name: '张掖高台光伏电站',
      type: 'pv'
    }, {
      name: '武威民勤光伏电站',
      type: 'pv'
    }, {
      name: '酒泉瓜州北四风电场',
      type: 'wf'
    }].map(farm => {
      return Object.assign(farm, {
        capacity: 10 * (30 + _.random(50)),
        dayGeneration: (20 + _.random(200) / 10),
        currentPower: (200 + _.random(400) / 20),
        monthGeneration: (400 + _.random(2000) / 10),
        yearGeneration: (3000 + _.random(4000)),
        monthCompleted: 60 + _.random(40),
        yearCompleted: 40 + _.random(20),
        hoursYear: 1000 + _.random(2000)
      })
    })
    return {
      farms,
      currentFarmIndex: 0,
      currentFarm: {
        capacity: 0,
        name: '',
        currentPower: 0,
        hoursYear: 0,
        powerSeries: []
      }
    }
  },

  computed: {
    farmOrderIndex: scope => scope.i + 1,
    farmName: scope => scope.item.name,
    farmDayGeneration: scope => scope.item.dayGeneration,
    farmMonthGeneration: scope => scope.item.monthGeneration,
    farmYearGeneration: scope => scope.item.yearGeneration,
    monthCompleted: scope => scope.item.monthCompleted,
    yearCompleted: scope => scope.item.yearCompleted,
    hoursYear: scope => scope.item.hoursYear
  },

  async setup () {
    this.interval5()
    this.intervals = setInterval(this.interval5.bind(this), 5000)
  },

  destory () {
    window.clearInterval(this.intervals)
  },
  watch: {
  },

  actions: {
    interval5 () {
      this.state.currentFarmIndex += 1
      if (this.state.currentFarmIndex > this.state.farms.length - 1) {
        this.state.currentFarmIndex = 0
      }
      Object.assign(this.state.currentFarm, this.state.farms[this.state.currentFarmIndex])

      let startPower = 100 + _.random(300) / 10
      const number = _.random(200)
      this.state.currentFarm.powerSeries = []
      for (let i = 0; i < 200; i++) {
        if (i < number) {
          this.state.currentFarm.powerSeries.push(startPower)
        } else {
          this.state.currentFarm.powerSeries.push(null)
        }
        startPower += 15 - _.random(300) / 10
      }
    }
  }
}
