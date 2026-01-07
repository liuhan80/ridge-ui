import IconMetric from './IconMetric.jsx' // 请根据实际文件路径调整

export default {
  name: 'IconMetric',
  title: '图标指标展示',
  component: IconMetric,
  icon: 'icons/BxTable.svg', // 可根据实际图标资源路径调整
  type: 'react',
  props: [
    {
      name: 'url',
      type: 'image',
      label: '图标图片地址',
      required: true // url是必传项，需明确标注
    },
    {
      name: 'label',
      type: 'string',
      label: '指标标签',
      default: '完整性'
    },
    {
      name: 'value',
      type: 'string',
      label: '指标数值',
      default: '98.23%'
    },
    {
      name: 'unit',
      type: 'string',
      label: '指标单位',
      default: '台'
    }
  ],
  events: [],
  width: 540, // 可根据组件实际展示尺寸调整
  height: 480
}
