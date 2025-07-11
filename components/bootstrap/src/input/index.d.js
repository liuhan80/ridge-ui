import Input from './Input.jsx'
import { boolean, string, value, classList, radiogroup, select } from 'ridge-build/src/props.js'
import { size, validateState } from '../props.js'
export default {
  name: 'TextInput',
  title: '单行输入',
  component: Input,
  icon: 'bi bi-input-cursor',
  type: 'react',
  props: [
    value(),
    string('placeholder', '提示信息'),
    validateState,
    boolean('disabled', '禁用', false),
    radiogroup('size', '尺寸', size, 'form-control-normal', false),
    select('type', '类型', [{
      label: '文本',
      value: 'text'
    }, {
      label: '密码',
      value: 'password'
    }, {
      label: '日期时间',
      value: 'datetime-local'
    }, {
      label: '日期',
      value: 'date'
    }, {
      label: '时间',
      value: 'time'
    }, {
      label: '数字',
      value: 'number'
    }], 'text', false),
    classList()
  ],
  events: [{
    label: '输入改变',
    name: 'onChange'
  }],
  width: 120,
  height: 36
}
