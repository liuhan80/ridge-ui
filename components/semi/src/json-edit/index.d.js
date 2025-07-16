import JSONEdit from './JSONEdit.jsx'
import { boolean, value } from 'ridge-build/src/props.js'
export default {
  name: 'json',
  title: 'JSON',
  component: JSONEdit,
  icon: 'icons/input.svg',
  type: 'react',
  props: [
    value()
  ],
  events: [{
    name: 'valueChange',
    label: '值改变'
  }],
  width: 300,
  height: 40

}
