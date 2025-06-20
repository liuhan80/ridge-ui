import Text from './Text.jsx'
import { boolean, classList, color, number, onClick, effect, string } from 'ridge-build/src/props.js'
export default {
  name: 'Text',
  title: '文本',
  component: Text,
  icon: 'bi bi-fonts',
  type: 'react',
  props: [
    string('text', '内容', '文本'),
    color('color', '文字颜色'),
    color('bgcolor', '背景色'),
    number('fontSize', '字号', 14),
    boolean('autoFontSize', '自动缩小', false),
    {
      name: 'fontFamily',
      label: '字体',
      type: 'string',
      control: () => import('ridgejs-editor/control/WebFontSelectControl.jsx'),
      value: ''
    },
    boolean('ellipsis', '超出省略', true),
    number('clamp', '行数', 1),
    boolean('center', '居中对齐', false),
    effect(),
    classList()
  ],
  events: [onClick],
  width: 100,
  height: 22
}
