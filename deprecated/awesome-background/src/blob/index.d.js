import Blob from './Blob'
import { color, classList } from 'ridge-build/src/props'
export default {
  name: 'blob',
  component: Blob,
  icon: 'icons/blob.svg',
  type: 'vanilla',
  title: '活动圆块',
  order: 10,
  width: 450,
  height: 450,
  props: [
    color('color','颜色','#4A90E2'),
    classList()
  ],
  events: [],
  methods: []
}
