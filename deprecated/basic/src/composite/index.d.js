import Composite from './CompositeWrapper'

export default {
  name: 'composite',
  component: Composite,
  title: '子页面',
  icon: 'icons/composite.svg',
  type: 'vanilla',
  width: 520,
  height: 400,
  props: [{
    name: 'classList',
    label: '样式',
    type: 'style',
    value: []
  }],
  events: []
}
