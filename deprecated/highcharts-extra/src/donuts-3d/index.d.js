import Donuts3DChart from './Donuts3DChart.js'
import { colors, data } from '../../../highcharts-basic/src/utils/props.js'
export default {
  name: 'Donuts3DChart',
  title: '3D环形图',
  splash: 'splash/donut-3d.png',
  description: '用3D方式呈现环形图，用于体现各个组成部分的百分比对比情况',
  component: Donuts3DChart,
  icon: 'icons/3d-charts.svg',
  type: 'vanilla',
  props: [data, {
    label: '角度',
    name: 'alpha',
    type: 'number',
    value: 60
  }, {
    label: '厚度',
    name: 'depth',
    type: 'number',
    value: 30
  }, {
    label: '内径',
    name: 'innerSize',
    type: 'number',
    value: 75
  }, colors],
  externals: ['highcharts-3d.js'],
  width: 200,
  height: 200
}
