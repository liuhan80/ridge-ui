import React from 'react'
import { Tabs, TabPane, Spin, List, Typography, Popover, Select, Space, Button, Image } from '@douyinfe/semi-ui'
import context from '../../service/RidgeEditorContext.js'
import { cloneDeep } from 'lodash'
import SvgLoader from '../../utils/SVGFromSrc.js'
import { extname } from '../../utils/string.js'
import { ReactComposite } from 'ridgejs'
import './index.less'

const trace = require('debug')('ridge:cl')
const { Text, Title } = Typography

class ComponentListing extends React.Component {
  constructor () {
    super()
    this.ref = React.createRef()
    this.state = {
      appPackageObject: {},
      loadedPackages: [],
      loadedComponents: [],
      currentPackage: '',
      fullLoading: true,
      popComponent: {},
      componentPopOver: false
    }
    context.services.componentListPanel = this
    this.loadedComponents = []
  }

  /**
   * 加载组件包中的所有组件
   **/
  async ensurePackageComponents (pkg, loads) {
    if (!pkg) return
    await context.loader.confirmPackageDependencies(pkg.name)
    if (pkg.ridgeDist) {
      // 包内组件都包含在一个js文件中
      if (!pkg.distLoaded) {
        await context.loader.loadScript(pkg.name + '/' + pkg.ridgeDist)
        // 从全局变量枚举加载类
        const pp = window[pkg.name]
        const components = []
        for (const name in pp) {
          const p = pp[name]
          p.componentName = p.name
          p.componentPath = name
          components.push(p)
          await context.loader.prepareComponent(p, {
            packageName: pkg.name,
            path: name
          })
        }

        const loadedPackages = (loads || this.state.loadedPackages).map((p) => {
          if (p.name === pkg.name) {
            p.components = components
            p.distLoaded = true
          }
          return p
        })
        this.setState({
          loadedComponents: [...this.state.loadedComponents, ...components],
          loadedPackages
        })
      }
    } else if (pkg.components) {
      // 每个组件一个定义文件
      for (const componentName of pkg.components) {
        const componentPath = pkg.name + '/' + componentName
        if (this.loadedComponents.filter(component => component.componentPath === componentPath).length === 0) {
          context.loadComponent(componentPath).then(componentLoaded => {
            if (!componentLoaded) {
              return
            }
            componentLoaded.packageName = pkg.name
            componentLoaded.componentName = componentName
            componentLoaded.componentPath = componentPath
            this.loadedComponents.push(componentLoaded)
            this.setState({
              loadedComponents: [...this.loadedComponents]
            })
          })
        }
      }
    }
  }

  tabChange (key) {
    this.setState({
      currentPackage: key
    })
    const pkg = this.state.loadedPackages.filter(pkg => pkg.name === key)[0]
    this.ensurePackageComponents(pkg)
  }

  /**
   * 加载/更新应用的所有包
   */
  async loadPackages () {
    this.setState({
      fullLoading: true
    })
    const { loadedPackages, appPackageObject } = await context.loadAppPackages()

    if (loadedPackages.length) {
      this.setState({
        fullLoading: false,
        appPackageObject,
        loadedPackages
      })

      if (!this.state.currentPackage) {
        this.setState({
          currentPackage: loadedPackages[0].name
        })
      }
    } else {
      // Please Install Package
      this.setState({
        fullLoading: false
      })
    }
    await this.ensurePackageComponents(loadedPackages[0], loadedPackages)
  }

  componentDidMount () {
    this.loadPackages()
  }

  dragStart (ev, info) {
    context.draggingComponent = info
    window.dragComponent = info

    ev.dataTransfer.setData('text/plain', JSON.stringify(info))

    const img = new window.Image()
    img.src = info.iconUrl
    img.style.width = '50px'
    img.style.height = '50px'

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 50

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, 50, 50)

    trace('drag start', info, img)

    ev.dataTransfer.setDragImage(canvas, 25, 25)
  }

  getFilteredComponents (pkgName) {
    const { loadedComponents } = this.state

    if (this.context) {
      return loadedComponents.filter(component => (component.title || component.label).indexOf(this.context) > -1)
    } else {
      return loadedComponents.filter(component => component.packageName === pkgName)
    }
  }

  renderComponentIcon (base, url) {
    if (url.$$typeof) {
      return url
    }
    const ext = extname(url)
    // <img className={label ? '' : 'img-only'} src={context.baseUrl + '/' + component.packageName + '/' + icon} />
    if (ext === 'svg') {
      return <SvgLoader src={base + url} />
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'ico'].indexOf(ext) > -1) {
      return <img src={base + url} />
    } else {
      return <i className={url + ' font-icon'} />
    }
  }

  /**
   * 显示组件描述信息
   * @param {*} popComponent
   * @returns
   */
  renderDescription (popComponent) {
    // const { popComponent } = this.state
    return (
      <div style={{ width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', padding: 20 }}>
        {popComponent.splash && <img src={context.baseUrl + '/' + popComponent.packageName + '/' + popComponent.splash} />}
        <Title heading={4} style={{ margin: '8px 0' }}>{popComponent.title}</Title>
        <Text>{popComponent.description}</Text>
      </div>
    )
  }

  changePackageTheme = (packageName, themeUrl) => {
    const { appPackageObject } = this.state

    if (!appPackageObject.themes) {
      appPackageObject.themes = {}
    }

    appPackageObject.themes[packageName] = themeUrl

    context.services.appService.savePackageJSONObject(appPackageObject)
    this.setState({
      appPackageObject: cloneDeep(appPackageObject)
    })
    context.loader.loadPackageTheme(packageName, themeUrl)
  }

  renderComponentItem = (item, pkg) => {
    const { dragStart, renderComponentIcon } = this
    const { loadedComponents } = this.state

    let itemObject = item
    if (typeof item === 'string') {
      itemObject = loadedComponents.filter(component => component.packageName === pkg.name && component.componentName === item)[0]
    }

    if (itemObject) {
      return (
        <List.Item>
          <div
            style={{
              color: pkg.iconFill ?? ''
            }}
            draggable
            // onMouseOver={() => {
            //   if (itemObject.description) {
            //     this.setState({
            //       componentPopOver: true,
            //       popComponent: itemObject
            //     })
            //   }
            // }}
            // onMouseOut={() => {
            //   this.setState({
            //     componentPopOver: false
            //   })
            // }}
            onDragStart={ev => dragStart(ev, Object.assign(itemObject, {
              componentPath: (pkg.name + '/' + itemObject.path).replace(/\/+/g, '/')
            }))}
            className='component-container'
          >
            {itemObject.icon &&
              <div className='image-icon'>
                {renderComponentIcon(context.baseUrl + '/' + pkg.name + '/', itemObject.icon)}
                {itemObject.title && <Text>{itemObject.title} </Text>}
              </div>}
            {/* {renderComponentIcon(itemObject.icon, itemObject.title, itemObject)} */}
          </div>
        </List.Item>
      )
    } else {
      return (
        <List.Item>
          <div
            className='component-container loading'
          />
        </List.Item>
      )
    }
  }

  render () {
    const { fullLoading, loadedPackages, currentPackage, appPackageObject } = this.state
    const { dragStart, renderDescription, changePackageTheme, renderComponentItem } = this

    const tabChange = this.tabChange.bind(this)
    return (
      <div className='component-panel'>
        {fullLoading && <Spin size='large' tip='等待应用载入' />}
        {!fullLoading && loadedPackages.length &&
        // <Popover visible={componentPopOver} content={renderDescription(popComponent)} position='rightTop'>
          <Tabs
            type='button'
            size='small'
            tabPosition='top'
            tabBarExtraContent={
              <ReactComposite app='ridge-editor-app' path='DialogRepoApp' />
            }
            activeKey={currentPackage}
            onChange={key => tabChange(key)}
          >
            {loadedPackages.length && loadedPackages.map(pkg => {
              let TabContent = <div className={'package-icon ' + pkg.icon} />
              if (pkg.logo) {
                TabContent = <div preview={false} className='package-icon'><Image preview={false} src={context.baseUrl + '/' + pkg.name + '/' + pkg.logo} /></div>
              } else if (pkg.icon) {
                if (pkg.icon.indexOf('.') > -1) {
                  TabContent = (
                    <div className='package-icon'>
                      <SvgLoader width={24} height={24} src={context.baseUrl + '/' + pkg.name + '/' + pkg.icon} />
                    </div>
                  )
                } else {
                  TabContent = <div className='package-icon'><i className={pkg.icon} /></div>
                }
              } else {
                TabContent = <div className='package-icon'>{pkg.name.charAt(0)}</div>
              }

              const componentList = pkg.components || pkg.promotions || []
              return (
                <TabPane
                  style={{
                    padding: '4px'
                  }}
                  className='tab-title'
                  collapsible
                  tab={TabContent}
                  key={pkg.name}
                  itemKey={pkg.name}
                >
                  {pkg.themes &&
                    <Space>
                      <Text>主题</Text><Select
                        style={{ width: 120 }}
                        onChange={val => {
                          changePackageTheme(pkg.name, val)
                        }}
                        value={appPackageObject.themes ? appPackageObject.themes[pkg.name] : ''}
                        size='small'
                        optionList={Object.keys(pkg.themes).map(name => ({
                          label: name,
                          value: pkg.themes[name]
                        }))}
                                     />
                    </Space>}

                  <List
                    loading={componentList.length === 0}
                    grid={{
                      gutter: 6,
                      span: 8
                    }}
                    dataSource={(pkg.components || pkg.promotions || []).filter(it => it.private !== true)}
                    renderItem={item => renderComponentItem(item, pkg)}
                  />
                </TabPane>
              )
            })}
          </Tabs>}
        {/* </Popover> */}
      </div>
    )
  }
}

export default ComponentListing
