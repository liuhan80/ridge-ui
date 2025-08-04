import ScatterContainer from './ScatterContainer.js'
export default {
  name: 'scatter-container',
  component: ScatterContainer,
  title: '散点列表',
  icon: 'icons/list.svg',
  type: 'vanilla',
  props: [{
    name: 'dataSource',
    label: '数据',
    type: 'array',
    connect: true,
    control: 'json',
    value: []
  }, {
    name: 'template',
    label: '单项模板',
    resizable: true,
    type: 'slot'
  },
  {
    name: 'classNames',
    label: '整体样式',
    type: 'style',
    value: []
  }],
  childProps: [{
    label: 'W',
    width: '50%',
    control: 'number',
    field: 'style.width',
    fieldEx: 'styleEx.width'
  }, {
    label: 'H',
    width: '50%',
    control: 'number',
    field: 'style.height',
    fieldEx: 'styleEx.height'
  }],
  events: [{
    name: 'onItemClick',
    label: '单项点击'
  }],
  width: 420,
  height: 360
}
