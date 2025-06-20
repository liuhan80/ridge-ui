import Audio from './Audio'
export default {
  name: 'audio',
  component: Audio,
  icon: 'icons/audio.svg',
  description: '使用HTML标准<audio>方式显示/播放一个音频',
  type: 'vanilla',
  title: '音频',
  order: 4,
  width: 120,
  height: 28,
  props: [{
    name: 'src',
    label: '地址',
    type: 'audio'
  }, {
    name: 'playing',
    label: '播放',
    connect: true,
    type: 'boolean'
  }, {
    name: 'currentTime',
    label: '进度',
    connect: true,
    type: 'number'
  }],
  events: [{
    label: '音频加载',
    name: 'onLoaded'
  }, {
    label: '播放',
    name: 'onTimeUpdated'
  }],
  methods: [{
    label: '跳转进度',
    name: 'setCurrentTime'
  }]
}
