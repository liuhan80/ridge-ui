import BaseHighCharts from '../utils/BaseHightChart'
class Column extends BaseHighCharts {
  getChartOptions () {
    const { data } = this.props
    let series = null
    if (Array.isArray(data)) {
      series = [{
        data
      }]
    } else {
      series = [data.series[0]]
    }
    return {
      chart: {
        type: 'column'
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      series
    }
}
}

export default Column
