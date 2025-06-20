import BaseHighCharts from '../../../highcharts-basic/src/utils/BaseHightChart'

class Donuts3DChart extends BaseHighCharts {
  getChartOptions () {
    const { alpha = 60, depth = 30, innerSize = 75, data } = this.props

    const series = [{
      data: data[0].map((cat, i) => {
        return [cat, data[1][i]]
      })
    }]
    return {
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        options3d: {
          enabled: true,
          alpha
        }
      },
      plotOptions: {
        pie: {
          innerSize: innerSize + '%',
          depth,
          dataLabels: {
            enabled: false
          }
        }
      },
      series
    }
  }
}
export default Donuts3DChart
