import { array, value, string, select, boolean } from 'ridge-build/src/props.js'

const BTN_COLORS = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black', 'facebook', 'google plus', 'instagram', 'linkedin', 'twitter', 'vk', 'youtube']
const COLORS = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black'
]
const SIZES = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

const icon = {
  name: 'icon',
  label: '图标',
  type: 'string',
  connect: true,
  btnText: '选择',
  control: () => import('./icon/IconSelect.jsx'),
  value: 'heart outline'
}

const text = string('text', '文本', '这是一段文本内容', true)
const basic = boolean('basic', '无框', true)
const inverted = boolean('inverted', '反色', false)
const disabled = boolean('disabled', '禁用', false)
const loading = boolean('loading', '加载中', false)

const color = select('color', '颜色', COLORS, 'black', false, false)
const size = select('size', '尺寸', SIZES, 'large', true, false)
export {
  text,
  basic,
  inverted,
  disabled,
  loading,
  color,
  size,
  icon,
  BTN_COLORS
}
