import { deepmerge } from './deepmerge'

import { colors } from '../utils/chart-colors'
class BaseHighCharts {
  constructor (props) {
    this.props = props ?? {}
  }

  getSeries (dataIndex = 1) {
    const {
      seriesNames = [],
      data = []
    } = this.props

    return data.slice(dataIndex).map((d, i) => {
      return {
        name: seriesNames[i] ?? '',
        data: d
      }
    })
  }

  getMaxData () {
    const {
      data = []
    } = this.props

    let max = 0

    for (const ar of data) {
      for (const n of ar) {
        if (parseInt(n) && parseInt(n) > max) {
          max = parseInt(n)
        }
      }
    }
    return max
  }

  getAxis () {
    const { data, showXLabel = true } = this.props
    const xAxis = {
      categories: data[0],
      visible: true
    }
    return showXLabel
      ? xAxis
      : {
          visible: false
        }
  }

  getBasicOptions () {
    const { xAxisLine = true, yAxisLine = true, xLabel = true, yLabel = true, yFormat = '{value}', colorScheme = 0 } = this.props

    const colorValues = colors[colorScheme]
    return {
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      chart: {
        backgroundColor: 'transparent'
      },
      legend: {
        enabled: false
      },
      colors: colorValues.curves,
      plotOptions: {
        series: {
          borderWidth: 0,
          marker: {
            enabled: false
          }
        }
      },
      yAxis: {
        min: 0,
        gridLineColor: colorValues.gridColor,
        gridLineWidth: yAxisLine ? 1 : 0,
        lineColor: colorValues.axisColor,
        lineWidth: yAxisLine ? 1 : 0,
        title: {
          text: ''
        },
        labels: {
          format: yFormat,
          style: {
            color: colorValues.labelColor
          }
        }
      },
      xAxis: {
        gridLineColor: colorValues.gridColor,
        lineColor: colorValues.axisColor,
        lineWidth: xAxisLine ? 1 : 0,
        labels: {
          style: {
            color: colorValues.labelColor
          }
        }
      }
    }
  }

  getChartOptions () {}

  mount (el) {
    this.el = el
    this.update()
  }

  getChartMethod () {
    const { Highcharts } = window

    return Highcharts.chart
  }

  update (props) {
    if (props) {
      this.props = props
    }
    const opt = this.getChartOptions()

    if (opt.then) {
      opt.then(resolv => {
        const merged = deepmerge(this.getBasicOptions(), resolv)
        if (this.chart) {
          this.chart.update(merged)
        } else {
          this.chart = this.getChartMethod()(this.el, merged)
        }
      })
    } else {
      const merged = deepmerge(this.getBasicOptions(), opt)

      if (this.chart) {
        this.chart.update(merged, true, false, false)
      } else {
        this.chart = this.getChartMethod()(this.el, merged)
        this.chart.redraw(false)
      }
    }
  }
}
export default BaseHighCharts
