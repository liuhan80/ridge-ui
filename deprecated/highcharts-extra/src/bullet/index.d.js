import BulletChart from './BulletChart'

export default {
  name: 'BulletChart',
  title: '子弹图',
  component: BulletChart,
  icon: 'icons/flags-and-technical-indicators.svg',
  description: '对进度条的增强，除了显示百分比进度外，还提供了挑战值标志，表达了除了完成预定目标外，又额外完成了多少任务。例如设置120挑战值，表示是否达到或超过百分之120的程度',
  splash: 'splash/bullet-chart.svg',
  type: 'vanilla',
  props: [{
    label: '当前值',
    name: 'value',
    type: 'number',
    value: 80
  }, {
    label: '挑战值',
    name: 'target',
    type: 'number',
    value: 120
  }, {
    label: '颜色',
    name: 'barColor',
    type: 'color',
    value: '#4A90E2'
  }, {
    label: '背景1',
    name: 'bg1',
    type: 'color',
    value: '#9BBEE6'
  }, {
    label: '背景2',
    name: 'bg2',
    type: 'color',
    value: '#E6ECF4'
  }],
  externals: ['bullet.js'],
  width: 400,
  height: 240
}
