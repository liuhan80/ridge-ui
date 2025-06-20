import { array, value, string, select, boolean } from 'ridge-build/src/props.js'
import Button from './Button.jsx'
import { Icon } from 'semantic-ui-react'
import { basic, BTN_COLORS, color, disabled, inverted, loading, size, text } from '../props.js'
export default {
  name: 'Button',
  icon: <Icon className='semantic-icon-fa' name='caret square right outline' />,
  component: Button,
  type: 'react',
  title: '按钮',
  width: 80,
  height: 36,
  props: [
    text,
    basic,
    inverted,
    boolean('active', '选中', false),
    disabled,
    loading,
    color,
    size
  ]
}
