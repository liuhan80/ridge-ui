import Wave from './Wave'
import { color, classList, number } from 'ridge-build/src/props'
export default {
  name: 'Wave',
  component: Wave,
  icon: 'icons/wave.svg',
  type: 'vanilla',
  title: '波浪',
  order: 10,
  width: 750,
  height: 450,
  props: [
    color('color','颜色','#0099ff'),
    number('percent', '高度比例', 15)
  ],
  events: [],
  methods: []
}
