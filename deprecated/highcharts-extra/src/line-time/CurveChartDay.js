import BaseHighCharts from '../../../highcharts-basic/src/utils/BaseHightChart'

class CurveChartDay extends BaseHighCharts {
  getChartOptions () {
    const {
      data = [], seriesNames = [], pointInterval = 5 * 60 * 1000, pointStart = 0
    } = this.props

    const series = data.map((item, i) => {
      return {
        name: seriesNames[i],
        data: item
      }
    })

    return {
      series,
      xAxis: {
        type: 'datetime'
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        enabled: true
      },
      plotOptions: {
        series: {
          pointInterval,
          pointStart
        }
      }
    }
  }
}

export default CurveChartDay
