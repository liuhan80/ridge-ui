import createDebug from 'debug'

const debug = createDebug('container:list')

export default class ScatterContainer {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    this.el = el
    if (!this.containerEl) {
      this.containerEl = document.createElement('div')
      el.appendChild(this.containerEl)
    }
    this.renderUpdate()
  }

  updateChildStyle () { // 编辑期适用
    if (this.props.template && this.props.template.el) {
      this.props.template.el.style.width = this.props.template.config.style.width + 'px'
      this.props.template.el.style.height = this.props.template.config.style.height + 'px'
    }
  }

  update (props) {
    this.props = props
    this.renderUpdate()
  }

  renderUpdate () {
    const {
      classNames
    } = this.props
    Object.assign(this.containerEl.style, this.getContainerStyle())
    if (!this.props.__isEdit) {
      // 运行状态
      this.renderListItems()
    } else {
      this.renderUpdateSlots()
    }

    if (this.scrollerEl) {
      this.scrollerEl.className = classNames.join(' ')
      Object.assign(this.scrollerEl.style, this.getScrollerStyle())
    }
  }

  /**
   * 更新渲染列表插槽内容
   * @param {*} props
   */
  renderUpdateSlots (props) {
    if (props) { // update
      if (props.template !== this.props.template) {
        this.containerEl.append(props.template.el)
      }
    } else {
      // 初始化mount
      if (this.props.template) {
        if (this.props.template.el == null) {
          const el = document.createElement('div')
          this.containerEl.append(el)
          this.props.template.mount(el).then(() => {
            this.updateChildStyle()
          })
        } else {
          this.containerEl.append(this.props.template.el)
          this.updateChildStyle()
        }
      }
    }
  }

  getScrollerStyle () {
    const {
      direction = 'y'
    } = this.props
    if (direction === 'y') {
      return {
        boxSizing: 'border-box',
        overflow: 'hidden auto'
      }
    } else {
      return {
        boxSizing: 'border-box',
        overflow: 'auto hidden'
      }
    }
  }

  getContainerStyle () {
    const containerStyle = {
      position: 'relative'
    }
    return containerStyle
  }

  /**
   * 运行期间更新渲染列表
   */
  async renderListItems () {
    if (!this.props.template) return
    const { dataSource, template } = this.props

    const that = this
    debug('renderListItems', dataSource)
    await template.load(true)
    if (this.items == null) {
      this.items = []
    }

    if (Array.isArray(dataSource)) {
      for (let index = 0; index < dataSource.length; index++) {
        const data = dataSource[index]
        if (this.items[index] == null) {
          const newEl = document.createElement('div')
          newEl.classList.add('ridge-is-selectable')
          const itemComponent = this.props.template.clone()
          itemComponent.setScopedData({
            i: index,
            list: dataSource,
            item: data
          })
          this.items[index] = itemComponent
          const itemWrapperStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate(${data.x}px, ${data.y}px)`
          }

          Object.assign(newEl.style, itemWrapperStyle)
          this.containerEl.appendChild(newEl)

          if (data != null) {
            itemComponent.mount(newEl)
          } else {
            itemComponent.el = newEl
          }
        } else {
          this.items[index].setScopedData({
            i: index,
            list: dataSource,
            item: data
          })
          if (data == null) {
            this.items[index].unmount()
          } else {
            if (!this.items[index].getIsMounted()) {
              this.items[index].mount()
            } else {
              const itemWrapperStyle = {
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${data.x}px, ${data.y}px)`
              }
              Object.assign(this.items[index].getEl().style, itemWrapperStyle)
              this.items[index].forceUpdate()
            }
          }
        }
      }
      debug('renderListItems Finsished', dataSource)
      while (this.items.length > dataSource.length) {
        const pop = this.items.pop()
        debug('remove ', pop, dataSource)
        const el = pop.el
        pop.unmount()
        if (el && el.parentElement === this.containerEl) {
          this.containerEl.removeChild(el)
        }
      }
    } else {
      if (this.items.length) {
        for (const itemComponent of this.items) {
          const el = itemComponent.el
          itemComponent.unmount()
          if (el && el.parentElement === this.containerEl) {
            this.containerEl.removeChild(el)
          }
        }
        this.items = []
      }
    }
  }
}
