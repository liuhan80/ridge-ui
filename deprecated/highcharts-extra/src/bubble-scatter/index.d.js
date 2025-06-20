import BubbleScatter from './BubbleScatter'
import { seriesNames, colors, yFormat } from '../../../highcharts-basic/src/utils/props'

export default {
  name: 'BubbleScatter',
  title: '散点图',
  order: 9,
  component: BubbleScatter,
  icon: 'icons/scatter-and-bubble-charts.svg',
  type: 'vanilla',
  description: '表现在XY坐标系下多个点的分布效果, 例如人类按身高/体重的分布情况等',
  splash: 'splash/scatter-charts.svg',
  props: [{
    label: '数据',
    name: 'data',
    type: 'array',
    value: [
      [
        [3.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 3.81],
        [11.0, 8.33],
        [14.0, 7.66]
      ],
      [
        [6.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2]
      ]
    ]
  }, colors, yFormat, seriesNames],
  externals: ['highcharts-more.js'],
  width: 400,
  height: 240
}
