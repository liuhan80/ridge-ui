import Column3d from './Column3d'
import { seriesNames, colors, data, yFormat } from '../../../highcharts-basic/src/utils/props'

export default {
  name: 'Column3d',
  title: '3D柱状图',
  component: Column3d,
  icon: 'icons/column-and-bar-charts.svg',
  type: 'vanilla',
  description: '柱状图的3D形式',
  splash: 'splash/column-3d-charts.svg',
  props: [data, colors, yFormat, seriesNames],
  externals: ['highcharts-3d.js'],
  width: 400,
  height: 240
}
