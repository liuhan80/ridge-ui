import BaseHighCharts from '../utils/BaseHightChart'

class SeriesTimeChart extends BaseHighCharts {
  getChartOptions () {
    const {
      data = [],
      xVisible = true,
      start = new Date(),
      end = new Date()
    } = this.props

    const startTime = start.getTime ? start.getTime() : new Date(start).getTime()
    const endTime = end.getTime ? end.getTime() : new Date(end).getTime()
    const series = data.reduce((acc, item) => {
      if (acc.indexOf(item[0]) === -1) {
        acc.push(item[0])
      }
      return acc
    }, []).map(name => {
      return {
        name,
        data: [],
        color: data.find(d => d[0] === name)[3]
      }
    })

    if (startTime < endTime) {
      let time = startTime

      while (time < endTime) {
        time += 60 * 1000

        const found = data.find(item => {
          if (item[1] < time && item[2] > time) {
            return true
          } else {
            return false
          }
        })
        if (found) {
          for (const serie of series) {
            if (serie.name === found[0]) {
              serie.data.push([time, 1])
            } else {
              serie.data.push([time, null])
            }
          }
        }
      }
    }

    return {
      chart: {
        type: 'area',
        margin: [0, 0, 0, 0]
      },
      xAxis: {
        type: 'datetime',
        visible: xVisible,
        // 自定义刻度定位器函数
        tickPositioner: function () {
          const min = this.min
          const max = this.max
          const range = max - min
          const step = range / 4
          const positions = []
          for (let i = 0; i <= 4; i++) {
            positions.push(min + i * step)
          }
          return positions
        },
        labels: {
          formatter: function () {
            const d = new Date(this.value)
            return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
          }
        },
        min: startTime,
        max: endTime
      },
      yAxis: {
        visible: false,
        min: 0,
        max: 1
      },
      tooltip: {
        formatter: function () {
          const d = new Date(this.x)
          return '<b>' + d.getHours() + ':' + d.getMinutes() + '</b>' + this.series.name
        }
      },
      plotOptions: {
        area: {
          lineWidth: 1,
          marker: {
            enabled: false
          },
          step: true,
          lineColor: null,
          fillOpacity: 0.5
        }
      },
      series
    }
  }
}
export default SeriesTimeChart
