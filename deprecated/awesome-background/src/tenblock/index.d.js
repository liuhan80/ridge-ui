import TenBlocks from './TenBlocks'
import { color, classList } from 'ridge-build/src/props'
export default {
  name: 'TenBlocks',
  component: TenBlocks,
  icon: 'icons/blocks.svg',
  type: 'vanilla',
  title: '浮动方块',
  order: 10,
  width: 750,
  height: 450,
  props: [
    color('color','背景色','#4A90E2'), 
    color('blockColor', '块颜色', 'rgba(255, 255, 255, 0.2)')
  ],
  events: [],
  methods: []
}
