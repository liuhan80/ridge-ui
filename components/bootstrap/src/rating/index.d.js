import { boolean, classList, number, string } from 'ridge-build/src/props.js'
import StarRating from './StarRating.jsx'

export default {
  name: 'rating',
  component: StarRating,
  title: '评分',
  icon: 'bi bi-star-half',
  type: 'react',
  props: [
    string('value', '取值', 4, true),
    classList()
  ],
  events: [{
    label: '值改变',
    name: 'onChange'
  }],
  width: 80,
  height: 32
}
