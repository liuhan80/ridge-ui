import PercentMetric from './PercentMetric.jsx' // 注意路径需和实际文件位置匹配

export default {
  name: 'PercentMetric',
  title: '数字指标',
  component: PercentMetric,
  icon: 'icons/BxTable.svg', // 可根据实际图标路径调整，保持和示例一致暂用此值
  type: 'react',
  props: [
    {
      name: 'value',
      type: 'string',
      label: '主数值',
      default: '5330.13'
    },
    {
      name: 'label',
      type: 'string',
      label: '标签数值',
      default: ''
    }
  ],
  events: [],
  width: 540, // 可根据组件实际展示需求调整，暂沿用示例值
  height: 480
}
