import Diagonal from './Diagonal'
import { color, classList, number } from 'ridge-build/src/props'
export default {
  name: 'Diagonal',
  component: Diagonal,
  icon: 'icons/diagonal.svg',
  type: 'vanilla',
  title: '斜角交叉',
  order: 10,
  width: 450,
  height: 450,
  props: [
    color('color1','颜色1','#6c3'),
    color('color2','颜色2','#09f'),
    number('deg', '角度', -60)
  ],
  events: [],
  methods: []
}
