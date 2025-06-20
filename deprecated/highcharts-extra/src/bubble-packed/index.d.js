import BubblePacked from './BubblePacked'
import { colors, data, seriesNames } from '../../../highcharts-basic/src/utils/props'

export default {
  name: 'BubblePacked',
  title: '气泡图',
  component: BubblePacked,
  icon: 'icons/scatter-and-bubble-charts.svg',
  type: 'vanilla',
  order: 8,
  description: '气泡图可以体现多个数据值大小对比关系，与饼图的区别在于其不关注占整体百分比,另外多个可以对多个数据进行分类。',
  splash: 'splash/pack-bubble-chart.svg',
  props: [data, {
    name: 'showLabel',
    label: '标签',
    type: 'boolean'
  }, colors, seriesNames],
  externals: ['highcharts-more.js'],
  width: 400,
  height: 240
}
