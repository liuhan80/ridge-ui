import Div from './Div.jsx'
import { string, classList, image, color, number, boolean, effect } from 'ridge-build/src/props.js'
export default {
  name: 'Div',
  title: '矩形',
  component: Div,
  icon: 'bi bi-aspect-ratio',
  type: 'react',
  props: [
    string('text', '文本'),
    color('color', '文字颜色'),
    color('bgcolor', '背景色'),
    image('mask', '遮罩'),
    boolean('center', '居中对齐', false),
    effect(),
    classList()
  ],
  events: [{
    label: '点击',
    name: 'onClick'
  }, {
    label: '鼠标按下',
    name: 'onMouseDown'
  }],
  width: 160,
  height: 120
}
