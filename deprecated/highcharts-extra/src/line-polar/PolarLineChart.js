import BaseHighCharts from '../../../highcharts-basic/src/utils/BaseHightChart'
class PolarLineChart extends BaseHighCharts {
  getChartOptions () {
    return {
      chart: {
        polar: true,
        type: 'line'
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        gridLineColor: '#ccc',
        min: 20,
        max: this.getMaxData(),
        lineWidth: 0
      },
      xAxis: Object.assign(this.getAxis(), {
        tickmarkPlacement: 'on',
        lineWidth: 0
      }),
      series: this.getSeries()
    }
  }
}

export default PolarLineChart
