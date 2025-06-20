import Image from './Image.js'
import { classList } from 'ridge-build/src/props.js'
export default {
  name: 'image',
  component: Image,
  icon: 'icons/image.svg',
  title: '图片',
  description: '按HTML5 <img> 规范显示一张图片',
  type: 'vanilla',
  order: 3,
  width: 260,
  height: 160,
  props: [{
    name: 'src',
    type: 'image',
    label: '地址',
    connect: true,
    value: ''
  }, {
    name: 'objectFit',
    label: '自适应',
    type: 'string',
    control: 'select',
    optionList: [{
      label: '拉伸填充',
      value: 'fill'
    }, {
      label: '裁剪填充',
      value: 'cover'
    }, {
      label: '按比例缩放',
      value: 'contain'
    }, {
      label: '原尺寸',
      value: 'none'
    }],
    value: 'cover'
  },
  classList()]
}
