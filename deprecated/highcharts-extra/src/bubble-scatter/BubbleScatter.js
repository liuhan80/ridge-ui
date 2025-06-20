import BaseHighCharts from '../../../highcharts-basic/src/utils/BaseHightChart'
class ColumnMixSpineChart extends BaseHighCharts {
  getChartOptions () {
    const {
      data = [], seriesNames = []
    } = this.props

    const series = data.map((itm, i) => {
      return {
        name: seriesNames[i] ?? '系列' + (i + 1),
        data: itm
      }
    })

    return {
      chart: {
        type: 'scatter'
      },
      plotOptions: {
        scatter: {
          borderWidth: 1,
          marker: {
            enabled: true,
            radius: 8,
            symbol: 'circle',
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          }
        }
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        startOnTick: true,
        endOnTick: true,
        min: 0 // 设置
      },
      yAxis: {
        min: 0,
        gridLineDashStyle: 'dash'
      },
      series
    }
  }
}

export default ColumnMixSpineChart
