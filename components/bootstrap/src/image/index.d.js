import Image from './Image.jsx'
import { image, classList, objectFit, radiogroup } from 'ridge-build/src/props.js'
export default {
  name: 'Image',
  title: '图片',
  component: Image,
  icon: 'bi bi-image',
  type: 'react',
  props: [
    objectFit,
    radiogroup('fitPosition', '裁切位置', [{
      label: '左',
      value: 'left'
    }, {
      label: '中',
      value: 'center'
    }, {
      label: '右',
      value: 'right'
    }]),
    image(),
    classList()
  ],
  events: [{
    label: '点击事件',
    name: 'onClick'
  }],
  fullScreenable: true,
  width: 120,
  height: 36
}
