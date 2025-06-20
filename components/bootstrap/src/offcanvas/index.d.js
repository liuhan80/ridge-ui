import { boolean, number, radiogroup, value } from 'ridge-build/src/props.js'
import OffCanvas from './OffCanvas.js'
export default {
  name: 'OffCanvas',
  title: '侧边弹层',
  component: OffCanvas,
  icon: '"bi bi-layout-sidebar-inset-reverse',
  type: 'vanilla',
  props: [
    value('boolean', '打开', false), {
      name: 'body',
      label: '内容',
      type: 'slot'
    },
    radiogroup('direction', '位置', [{
      label: '左',
      value: 'offcanvas-start'
    }, {
      label: '右',
      value: 'offcanvas-end'
    }, {
      label: '上',
      value: 'offcanvas-top'
    }, {
      label: '下',
      value: 'offcanvas-bottom'
    }]),
    boolean('full', '全屏', false)
  ],
  events: [{
    label: '关闭',
    name: 'onClose'
  }],
  portalled: true,
  hideable: false,
  width: 600,
  height: 400
}
