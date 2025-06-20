import BaseHighCharts from '../../../highcharts-basic/src/utils/BaseHightChart'
class ColumnMixSpineChart extends BaseHighCharts {
  getChartOptions () {
    const {
      data = [],
      seriesNames = []
    } = this.props

    const xAxis = {
      categories: data[0]
    }
    const series = data.slice(1).map((itm, i) => {
      if (Array.isArray(itm)) {
        return {
          name: seriesNames[i + 1],
          data: itm
        }
      } else {
        return itm
      }
    })
    return {
      chart: {  
        type: 'column',  
        options3d: {  
            enabled: true,  
            alpha: 15,  
            beta: 15,  
            depth: 50,  
            viewDistance: 25  
        }  
      },  
      xAxis,
      plotOptions: {  
        column: {  
            depth: 25  
        }  
      },  
      tooltip: {
        shared: true
      },
      yAxis: {
        gridLineDashStyle: 'dash'
      },
      series
    }
  }
}

export default ColumnMixSpineChart
