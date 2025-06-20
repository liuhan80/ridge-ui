import PolarLineChart from './PolarLineChart'
import { colors, data } from '../utils/props'
export default {
  name: 'PolarLineChart',
  title: '极坐标图',
  description: '极坐标图实际是极坐标系下的折线图。 通常用于评估数量不多的几个指标的综合情况，当围绕的面积大时，体现综合能力更强',
  component: PolarLineChart,
  icon: 'icons/more-chart-types.svg',
  splash: 'splash/radar-chart.svg',
  type: 'vanilla',
  props: [data, {
    label: '显示分类',
    name: 'showXLabel',
    type: 'boolean',
    value: true
  }, colors],
  externals: ['highcharts-more.js'],
  width: 400,
  height: 240
}
