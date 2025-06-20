import BaseHighCharts from '../../../highcharts/src/utils/BaseHightChart'

class PercentDonutChart extends BaseHighCharts {
  getChartOptions () {
    const { innerSize = 75, percent, color } = this.props
    return {
      chart: {
        type: 'pie'
      },
      plotOptions: {
        pie: {
          innerSize: innerSize + '%',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        borderWidth: 0,
        colors: [color, 'transparent'],
        data: [
          percent,
          100 - percent
        ]
      }]
    }
  }
}
export default PercentDonutChart
