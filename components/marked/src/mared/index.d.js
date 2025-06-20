import Marked from './Marked.js'
import { boolean, classList, number } from 'ridge-build/src/props.js'
export default {
  name: 'Marked',
  component: Marked,
  title: 'MarkDown',
  icon: 'icons/logo-black.svg',
  type: 'react',
  props: [{
    name: 'mdfile',
    label: 'md文件',
    type: 'file',
    fileType: 'markdown',
    connect: true
  }, {
    name: 'mdstring',
    label: 'md文本',
    type: 'string',
    connect: true
  },
  boolean('transparent', '背景透明', true),
  number('baseFontSize', '字体大小', 14),
  classList()
  ],
  events: [],
  width: 480,
  height: 64
}
