import ColorInput from './ColorInput.jsx'
import { boolean, string, value, classList, radiogroup } from 'ridge-build/src/props.js'
import { size, validateState } from '../props.js'
export default {
  name: 'ColorInput',
  title: '颜色选择',
  component: ColorInput,
  icon: 'bi bi-input-cursor',
  type: 'react',
  props: [
    value(),
    radiogroup('size', '尺寸', size, 'form-control-normal', false),
  ],
  events: [{
    label: '输入改变',
    name: 'onChange'
  }],
  width: 120,
  height: 36
}
