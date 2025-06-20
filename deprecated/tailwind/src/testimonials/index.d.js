import Testimonials from './Testimonials.jsx'
export default {
  name: 'Testimonials',
  title: ' 客户评价',
  component: Testimonials,
  icon: 'icons/users.svg',
  order: 4,
  type: 'react',
  props: [{
    label: '内容',
    connect: true,
    name: 'testimonials',
    type: 'string',
    value: '这款组件真是惊艳！功能强大，操作简便，极大地提升了工作效率，强烈推荐给所有需要的人！'
  }, {
    label: '用户名',
    connect: true,
    name: 'username',
    type: 'string',
    value: '曹晓明'
  }, {
    label: '头像',
    connect: true,
    name: 'userAvatar',
    type: 'image'
  }, {
    label: '公司Logo',
    connect: true,
    name: 'companyLogo',
    type: 'image'
  }, {
    label: '职位',
    connect: true,
    name: 'position',
    type: 'string',
    value: 'CEO of Workcation'
  }],
  width: 620,
  height: 335
}
