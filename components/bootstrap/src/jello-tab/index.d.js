import { radiogroup, string, optionConfig, classList } from 'ridge-build/src/props.js'
import JelloTab from './JelloTab.jsx'
import { size } from '../props.js'
export default {
  name: 'JelloTab',
  component: JelloTab,
  title: '滑动标签',
  icon: 'bi bi-segmented-nav',
  type: 'react',
  props: [
    optionConfig('tabs', '页签项'),
    string('value', '取值', 4, true),
    radiogroup('size', '尺寸', size, 'normal', false),
    classList('containerClassList', '容器样式'),
    classList('gliderClassList', '滑块样式')
  ],
  events: [{
    label: '值改变',
    name: 'onChange'
  }],
  width: 80,
  height: 32
}
