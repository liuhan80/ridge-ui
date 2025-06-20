export default class Image {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    this.el = el

    this.render()
  }

  render () {
    const {
      objectFit,
      src,
      classList = []
    } = this.props
    this.el.innerHTML = ''

    this.img = document.createElement('img')
    this.el.append(this.img)

    if (src) {
      // if (src.then) {
      //   src.then(r => {
      //     this.img.src = r
      //   })
      // } else {
      // }
      this.img.src = src
      this.img.style.objectFit = objectFit
      this.img.className = 'ridge-image ' + classList.join(' ')
      this.img.style.width = '100%'
      this.img.style.height = '100%'
    } else {
      this.img.src = 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23eee" d="m14 6l-3.75 5l2.85 3.8l-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22z"%2F%3E%3C%2Fsvg%3E'
      this.img.className = 'ridge-image ' + classList.join(' ')
      this.img.style.width = '100%'
      this.img.style.height = '100%'
      this.img.style.background = '#dedede'
    }
  }

  update (props) {
    this.props = props
    this.render()
  }
}
