import SectionBox from './SectionBox.jsx'

export default {
  name: 'Section',
  title: '区块标题',
  component: SectionBox,
  icon: 'icons/BxTable.svg',
  type: 'react',
  props: [{
    name: 'title',
    type: 'string',
    label: '标题'
  }, {
    name: 'content',
    type: 'slot',
    label: '内容'
  }],
  events: [],
  width: 540,
  height: 480
}
