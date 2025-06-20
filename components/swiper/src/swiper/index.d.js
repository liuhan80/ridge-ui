import Swiper from './Swiper.jsx'
import { boolean, string, number, value, onChange, slot, children } from 'ridge-build/src/props.js'
export default {
  name: 'Swiper',
  title: 'Swiper',
  component: Swiper,
  icon: 'icons/swiper-logo.svg',
  type: 'react',
  props: [
    children
  ],
  events: [onChange],
  width: 300,
  height: 40

}
