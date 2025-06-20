import PercentDonutChart from './PercentDonutChart.js'
export default {
  name: 'PercentDonutChart',
  title: '百分比图',
  component: PercentDonutChart,
  icon: 'splash/percent-pie-chart.svg',
  splash: 'splash/percent-pie-chart.svg',
  description: '用环形图形式展示一个百分比信息',
  type: 'vanilla',
  props: [{
    label: '百分比',
    name: 'percent',
    type: 'number',
    connect: true,
    value: 75
  }, {
    label: '内径',
    name: 'innerSize',
    type: 'number',
    value: 75
  }, {
    label: '颜色',
    name: 'color',
    type: 'color',
    value: '#15aeeb'
  }],
  width: 200,
  height: 200
}
