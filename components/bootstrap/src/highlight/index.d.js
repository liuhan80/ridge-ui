import Highlight from './Highlight.jsx'
import { classList, number, json, string } from 'ridge-build/src/props.js'
export default {
  name: 'Highlight',
  title: '高亮',
  component: Highlight,
  icon: 'bi bi-fonts',
  type: 'react',
  props: [
    string('text', '内容', '文本'),
    number('fontSize', '字号', 14),
    json('searchWords', '高亮文本', ['高效', '快速']),
    classList()
  ],
  events: [],
  width: 100,
  height: 22
}
