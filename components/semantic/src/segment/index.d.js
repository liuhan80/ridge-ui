import { array, value, string, select, boolean, radiogroup } from 'ridge-build/src/props.js'
import Segment from './Segment.jsx'
import { Icon } from 'semantic-ui-react'
import { basic, COLORS, disabled, inverted, loading, size, SIZES } from '../props.js'
export default {
  name: 'Segment',
  icon: <Icon className='semantic-icon-fa' name='caret square right outline' />,
  component: Segment,
  type: 'react',
  title: '片段',
  width: 180,
  height: 36,
  props: [
    string('text', '文本', '这是一段文本内容', true),
    basic,
    inverted,
    disabled,
    loading,
    radiogroup('emphasis', '重要性', [{
      label: '默认',
      value: ''
    }, {
      label: '次要',
      value: 'secondary'
    }, {
      label: '第三',
      value: 'tertiary'
    }, '']),
    size
  ]
}
