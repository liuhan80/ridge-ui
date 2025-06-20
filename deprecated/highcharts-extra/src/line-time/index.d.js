import CurveChartDay from './CurveChartDay'
import { data, seriesNames, colors } from '../../../highcharts-basic/src/utils/props'
export default {
  name: 'CurveChartDay',
  title: '时间曲线',
  component: CurveChartDay,
  description: '曲线图的一个子类，横坐标是时间格式，用于显示一个随时间变化的数据系列',
  splash: 'splash/line-chart.png',
  icon: 'icons/line-charts.svg',
  type: 'vanilla',
  props: [data, seriesNames, colors, {
    name: 'pointStart',
    label: '开始时间',
    type: 'number'
  }, {
    name: 'pointInterval',
    label: '数据点间隔时间',
    type: 'number'
  }],
  width: 400,
  height: 240
}
