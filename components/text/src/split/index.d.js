import TextSplit from './TextSplit.jsx'
import { boolean, classList, color, effect, number, onClick, radiogroup, select, string } from 'ridge-build/src/props.js'
export default {
  name: 'TextSplit',
  title: '文本分割',
  component: TextSplit,
  icon: 'bi bi-fonts',
  type: 'react',
  props: [
    string('text', '内容', '文本'),
    effect('effectIn', '进入效果', ''),
    effect('effectOut', '进入效果', ''),
    number('fontSize', '文字大小', 24),
    number('gap', '间距', 8),
    color('color', '颜色'),
    radiogroup('direction', '方向', [{
      label: '横向',
      value: 'column'
    }, {
      label: '纵向',
      value: 'row'
    }], 'column'),
    classList()
  ],
  events: [onClick],
  width: 100,
  height: 22
}
