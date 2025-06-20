import SeriesTimeChart from './SeriesTimeChart.js'
import { boolean } from 'ridge-build/src/props.js'
export default {
  name: 'SeriesTimeChart',
  title: '时间序列图',
  component: SeriesTimeChart,
  icon: 'icons/bubble.svg',
  type: 'vanilla',
  props: [{
    name: 'data',
    type: 'array',
    control: 'json',
    label: '数据',
    connect: true,
    value: []
  }, {
    name: 'start',
    type: 'datetime',
    control: 'datetime',
    label: '开始时间',
    connect: true
  }, {
    name: 'end',
    type: 'datetime',
    control: 'datetime',
    label: '结束时间',
    connect: true
  },
  boolean('xVisible', '显示X轴', true)],
  width: 400,
  height: 160
}
