export default class OffCanvas {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    this.el = el
    const div = this.initCanvasEl()
    this.canvasEl = div

    const { __isEdit } = this.props

    if (__isEdit) {
      this.el.appendChild(this.canvasEl)
    } else {
      document.body.appendChild(this.canvasEl)
    }

    this.renderUpdateSlot(this.props, {})
    this.updateHeader()
  }

  initCanvasEl () {
    const div = document.createElement('div')

    const { __isEdit, padding = 8, full, width, height, direction } = this.props

    const modalStyle = {
      '--bs-offcanvas-padding-x': padding + 'px',
      '--bs-offcanvas-padding-y': padding + 'px'
    }

    if (__isEdit) {
      div.className = 'offcanvas'

      modalStyle.width = '100%'
      modalStyle.height = '100%'
      modalStyle.visibility = 'visible'
      modalStyle.position = 'initial'
      modalStyle.margin = 0
    } else {
      div.className = 'offcanvas ' + direction

      if (full) {
        modalStyle.width = '100%'
        modalStyle.height = '100%'
      } else {
        if (direction === 'offcanvas-start' || direction === 'offcanvas-end') { // 横向的，只设置宽度为设计期宽度
          modalStyle.width = width + 'px'
        } else {
          modalStyle.height = height + 'px'
        }
      }
    }

    Object.assign(div.style, modalStyle)

    div.innerHTML = '<div class=\'offcanvas-body\' />'

    div.style.setProperty('--bs-offcanvas-padding-x', `${padding}px`)
    div.style.setProperty('--bs-offcanvas-padding-y', `${padding}px`)

    return div
  }

  updateHeader () {
    const { title, input, onClose, showHeader } = this.props
    const header = this.canvasEl.querySelector('.offcanvas-header')

    const onClickClose = () => {
      input && input(false)
      onClose && onClose()
    }

    if (showHeader) {
      if (header) {
        header.querySelector('.offcanvas-title').innerHTML = title
      } else {
        const div = document.createElement('div')

        div.innerHTML = `<div class='offcanvas-header'> <h5 class='offcanvas-title'>${title}</h5>
            <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' /></div>`

        div.querySelector('.btn-close').onclick = () => {
          onClickClose && onClickClose()
        }
        this.canvasEl.prepend(div)
      }
    } else {
      if (header) {
        this.canvasEl.removeChild(header)
      }
    }
  }

  renderUpdateSlot (currentProps, previousProps) {
    const lastBody = previousProps.body
    const currentBody = currentProps.body

    if (lastBody !== currentBody) {
      const canvasBodyEl = this.canvasEl.querySelector('.offcanvas-body')
      if (lastBody) {
        const allChildDivs = canvasBodyEl.children

        for (const childDiv of allChildDivs) {
          canvasBodyEl.removeChild(childDiv)
        }
      }

      if (currentBody) {
        const div = document.createElement('div')
        div.style.width = '100%'
        div.style.height = '100%'
        canvasBodyEl.appendChild(div)

        currentBody.mount(div)
      }
    }
  }

  update (props) {
    if (this.props.value === false && props.value === true) { // 显示
      this.canvasEl.classList.add('show')
    } else {
      this.canvasEl.classList.add('hiding')

      setTimeout(() => {
        this.canvasEl.classList.remove('hiding')
        this.canvasEl.classList.remove('show')
      }, 400)
    }

    this.renderUpdateSlot(props, this.props)
    this.props = props

    const { padding } = this.props
    this.canvasEl.style.setProperty('--bs-offcanvas-padding-x', `${padding}px`)
    this.canvasEl.style.setProperty('--bs-offcanvas-padding-y', `${padding}px`)

    this.updateHeader()
  }

  destroy () {
    if (this.canvasEl && this.canvasEl.parentElement) {
      this.canvasEl.parentElement.removeChild(this.canvasEl)
    }
  }
}
