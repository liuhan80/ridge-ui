import LegendMetric from './LegendMetric.jsx' // 注意路径需和实际文件位置匹配

export default {
  name: 'LegendMetric',
  title: '图例指标展示',
  component: LegendMetric,
  icon: 'icons/BxTable.svg', // 可根据实际图标路径调整，保持和示例一致暂用此值
  type: 'react',
  props: [
    {
      name: 'boxColor',
      type: 'color',
      label: '图例方块颜色',
      default: '#00AAFF' // 补充默认值，更贴合组件实际定义
    },
    {
      name: 'legendText',
      type: 'string',
      label: '图例文本',
      default: '总装机容量  万kW'
    },
    {
      name: 'value',
      type: 'string',
      label: '主数值',
      default: '5330.13'
    },
    {
      name: 'tagValue',
      type: 'string',
      label: '标签数值',
      default: ''
    },
    {
      name: 'tagUnit',
      type: 'string',
      label: '标签单位',
      default: '万kW'
    }
  ],
  events: [],
  width: 540, // 可根据组件实际展示需求调整，暂沿用示例值
  height: 480
}