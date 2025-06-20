import BaseHighCharts from '../../../highcharts-basic/src/utils/BaseHightChart'
class ColumnMixSpineChart extends BaseHighCharts {
  getChartOptions () {
    const {
      data = [], showLabel = true
    } = this.props

    const series = data[0].map((cat, i) => {
      return {
        name: cat,
        data: [[cat, data[1][i]]]
      }
    })
    // [{
    //   name: seriesNames[0],
    //   data: data[0].map((cat, i) => {
    //     return [cat, data[1][i]]
    //   })
    // }]
    return {
      chart: {
        type: 'packedbubble'
      },
      plotOptions: {
        packedbubble: {
          marker: {
            enabled: true
          },
          borderWidth: 1,
          minSize: '30%',
          maxSize: '300%',
          zMin: 0,
          zMax: 1000,
          layoutAlgorithm: {
            splitSeries: false,
            enableSimulation: true,
            gravitationalConstant: 0.02
          },
          dataLabels: showLabel
            ? {
                enabled: true,
                format: '{point.name}',
                style: {
                  color: 'black',
                  textOutline: 'none',
                  fontWeight: 'normal'
                }
              }
            : {
                enabled: false
              }
        }
      },
      series
    }
  }
}

export default ColumnMixSpineChart
