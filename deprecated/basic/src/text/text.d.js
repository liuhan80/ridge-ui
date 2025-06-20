import Text from './Text.js'

export default {
  name: 'text',
  component: Text,
  icon: 'icons/text.svg',
  description: '提供基础文本内容展示功能',
  title: 'Text',
  type: 'vanilla',
  order: 3,
  width: 260,
  height: 40,
  props: [{
    name: 'text',
    type: 'string',
    label: 'HTML',
    connect: true,
    value: '内容'
  }, {
    name: 'classList',
    label: '样式',
    type: 'style',
    value: []
  }]
}
