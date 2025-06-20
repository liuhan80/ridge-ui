import Pie from './PercentDonut'
import { theme, chartData } from '../utils/props'
import { boolean, color, number } from 'ridge-build/src/props'

export default {
  name: 'PercentRing',
  title: '百分比环',
  component: Pie,
  icon: 'icons/pie.svg',
  type: 'vanilla',
  props: [
    number('percent', '百分比', 50),
    color('color', '颜色', '#4A90E2'),
    number('innerSize', '内环大小', 75)
  ],
  width: 320,
  height: 320
}
