import Html from './Html.js'

export default {
  name: 'html',
  component: Html,
  private: true,
  icon: 'icons/html.svg',
  description: '提供原始HTML内容的渲染，通常用于特定场合：连接的数据可以直接输出为HTML，例如直接返回SVG图片内容、返回样例代码的情况。',
  title: '网页代码',
  type: 'vanilla',
  order: 20,
  width: 260,
  height: 160,
  props: [{
    name: 'html',
    type: 'string',
    label: 'HTML',
    connect: true,
    value: '<div>HTML</div>'
  }, {
    name: 'isCenter',
    type: 'boolean',
    label: '正中',
    value: true
  }, {
    name: 'classNames',
    label: '样式',
    type: 'style',
    value: []
  }]
}
