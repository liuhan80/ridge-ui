import BaseHighCharts from '../utils/BaseHightChart'
class PercentDonut extends BaseHighCharts {
  getChartOptions () {
    const {
      innerSize = 75,
      percent,
      color
    } = this.props

    const series = [{
      data: [{
        y: percent,
        color
      }, {
        y: 100 - percent,
        color: '#E5E7E7'
      }]
    }]
    return {
      chart: {
        margin: [0, 0, 0, 0], // 上 20px，右 30px，下 20px，左 30px
        type: 'pie'
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.y}</b>%'
      },
      plotOptions: {
        pie: {
          innerSize: innerSize + '%',
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      series
    }
  }
}

export default PercentDonut
