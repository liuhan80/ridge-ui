export default class Audio {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    this.el = el
    this.audio = document.createElement('video')
    this.el.append(this.audio)

    this.render()
  }

  render () {
    const bcr = this.el.getBoundingClientRect()

    const { src } = this.props
    this.audio.src = src
    this.audio.setAttribute('width', bcr.width)
    this.audio.setAttribute('height', bcr.height)
    this.audio.setAttribute('autoplay', true)
    this.audio.setAttribute('muted', true)
  }

  update (props) {
    this.props = props
    this.render()
  }
}
