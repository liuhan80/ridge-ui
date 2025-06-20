import BaseHighCharts from '../utils/BaseHightChart'

class BulletChart extends BaseHighCharts {
  getChartOptions () {
    const { value, target, barColor, bg1 = '#666', bg2 = '#bbb' } = this.props
    return {
      chart: {
        inverted: true,
        type: 'bullet'
      },
      plotOptions: {
        series: {
          color: barColor,
          borderWidth: 0,
          marker: {
            enabled: false
          }
        }
      },
      yAxis: {
        gridLineWidth: 0,
        tickAmount: 0,
        showFirstLabel: false,
        showLastLabel: false,
        plotBands: [{
          from: 0,
          to: 100,
          color: bg1
        }, {
          from: 100,
          to: 9e9,
          color: bg2
        }],
        title: null
      },
      series: [{
        data: [{
          y: value,
          target
        }]
      }]
    }
  }
}

export default BulletChart
