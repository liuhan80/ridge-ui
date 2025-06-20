import {  boolean } from 'ridge-build/src/props.js'
import IconComponent from './Icon.jsx'
import { Icon } from 'semantic-ui-react'
import { color, icon, inverted, loading, size } from '../props.js'
import './style.css'
export default {
  name: 'Icon',
  icon: <Icon className='semantic-icon-fa' name='home' />,
  component: IconComponent,
  type: 'react',
  title: '图标',
  width: 80,
  height: 36,
  props: [
    icon,
    size,
    color,
    inverted,
    boolean('link', '链接', false, true),
    boolean('circular', '圆形', false, true),
    boolean('bordered', '边框', false, true),
    loading
  ]
}
