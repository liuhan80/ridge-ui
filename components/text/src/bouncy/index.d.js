import Bouncy from './Bouncy.jsx'
import { boolean, classList, color, number, onClick, string } from 'ridge-build/src/props.js'
export default {
  name: 'Bouncy',
  title: '滑动切换',
  component: Bouncy,
  icon: 'bi bi-fonts',
  type: 'react',
  props: [
    string('text', '内容', '文本'),
    color('color', '文字颜色'),
    color('bgcolor', '背景色'),
    number('fontSize', '字号', 14),
    classList()
  ],
  events: [onClick],
  width: 100,
  height: 22
}
