export default class Text {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    this.el = el
    this.render()
  }

  update (props) {
    this.props = props
    this.render()
  }

  render () {
    const {
      text,
      classList
    } = this.props
    this.el.innerHTML = `<div class="${classList.join(' ')}">${text}</div>`
  }
}
