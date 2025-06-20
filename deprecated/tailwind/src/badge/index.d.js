import Badge from './Badge.jsx'
export default {
  name: 'Badge',
  title: '徽章',
  component: Badge,
  icon: 'icons/text.svg',
  order: 4,
  type: 'react',
  props: [{
    label: '内容',
    connect: true,
    name: 'text',
    type: 'string',
    value: '徽章'
  }, {
    label: '预置',
    name: 'preset',
    type: 'string',
    control: 'select',
    options: [{
      label: '灰色',
      value: 'bg-gray-50 text-gray-600 ring-gray-500/10'
    }, {
      label: '红色',
      value: 'bg-red-50 text-red-700 ring-red-500/10'
    }, {
      label: '黄色',
      value: 'bg-yellow-50 text-yellow-800 ring-yellow-500/10'
    }, {
      label: '绿色',
      value: 'bg-green-50 text-green-700 ring-green-500/10'
    }, {
      label: '蓝色',
      value: 'bg-blue-50 text-blue-700 ring-blue-700/10'
    }, {
      label: '靛蓝',
      value: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10'
    }, {
      label: '紫色',
      value: 'text-purple-700 bg-purple-50 ring-purple-700/10'
    }, {
      label: '粉红',
      value: 'bg-pink-50 text-pink-700 ring-pink-700/10'
    }],
    value: 'bg-gray-50 text-gray-600'
  }, {
    label: '样式',
    connect: true,
    name: 'classNames',
    type: 'style',
    value: []
  }],
  width: 100,
  height: 22
}
