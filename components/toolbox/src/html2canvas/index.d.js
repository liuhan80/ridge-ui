import Html2Canvas from './Html2canvas.jsx'
import { boolean, slot } from 'ridge-build/src/props.js'
export default {
  name: 'html2canvas',
  title: '截图',
  component: Html2Canvas,
  icon: 'icons/upload.svg',
  type: 'react',
  props: [
    {
      name: 'targetElement',
      label: '目标元素',
      type: 'element'
    },
    slot('renderContent', '自定义内容'),
    boolean('saveOnClick', '下载保存')
  ],
  externals: [
    '/html2canvas/dist/html2canvas.min.js'
  ],
  width: 72,
  height: 72
}
