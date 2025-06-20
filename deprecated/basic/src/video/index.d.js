import Video from './Video'
export default {
  name: 'video',
  component: Video,
  icon: 'icons/video.svg',
  description: '按HTML <video> 标签方式显示一个视频',
  type: 'vanilla',
  title: '视频',
  order: 3,
  width: 120,
  height: 80,
  props: [{
    name: 'src',
    label: '地址',
    type: 'string'
  }, {
    name: 'autoplay',
    label: '播放',
    connect: true,
    type: 'boolean'
  }],
  events: [],
  methods: []
}
