import debug from 'debug'
import memoize from 'lodash/memoize'

import ridgeExternals from 'ridge-externals'
import { loadRemoteJsModule, loadLocalJsModule, loadCss, loadWebFont, loadScript } from '../utils/load'
const log = debug('ridge:loader')

const trace = window.showError || function () {}
/**
 * 组件定义（js及其依赖）加载服务类
 * @class
 */

class Loader {
  /**
   * 构造器
   * @param {string} baseUrl  元素下载基础地址, 支持 本地（ridge-http）  https://www.unpkg.com/  https://www.jsdelivr.com/ 等
   * @param {string} loadPropControl  加载属性的自定义控制编辑
   */

  constructor ({
    baseUrl,
    loadPropControl
  }) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.loadPropControl = loadPropControl
    log('RidgeLoader baseUrl: ' + this.baseUrl)

    // 加载的字体列表
    this.loadedFonts = []

    this.themeUrls = {}

    // this.getPackageJSON = memoize(this._getPackageJSON)
    this.loadComponent = memoize(this._loadComponent)
    this.loadScript = memoize(this._loadScript)
    this.loadExternal = memoize(this._loadExternal)
    // this.loadJSON = memoize(this.loadJSON)
    this.loadTextContent = memoize(this.loadTextContent)
    this.loadStoreScript = memoize(this.loadStoreScript)
    this.loadLocalJsModule = loadLocalJsModule
    this.loadRemoteJsModule = loadRemoteJsModule
    this.confirmPackageDependencies = memoize(this._confirmPackageDependencies)
    this.loadWebFont = memoize(loadWebFont)
    this.loadCss = loadCss

    this.jsonCache = new Map()
    this.codeCache = new Map()
    this.blobCache = new Map()
  }

  getURIPath (resourceUrl) {
    return `${this.baseUrl}/${resourceUrl}`.replace(
      /(https?:\/\/)|(\/)+/g,
      (match, p1, p2) => p1 || '/'
    )
  }

  /**
   * 加载组件， 支持2种参数
   * 1、对象
   * {
   *   packageName: 'ridge-basic',
   *   path: './build/container1.pel.js'
   * }
   * 2、全路径
   * ridge-basic/build/container1.pel.js 或 ridge-basic@ridge/build/container1.pel.js
   *
   * @param {String} packageName Npm包名
   * @param {String} path 相对于包的组件路径
   */
  async _loadComponent (componentPath) {
    let packageName, path
    if (typeof componentPath === 'object') {
      packageName = componentPath.packageName
      path = componentPath.path
    } else {
      // 抽取包和路径
      const paths = componentPath.split('/')
      if (paths[0].startsWith('@')) {
        packageName = paths.splice(0, 2).join('/')
        path = paths.join('/')
      } else {
        packageName = paths.splice(0, 1).join('/')
        path = paths.join('/')
      }
    }
    // globalThis方式
    if (window[packageName] && window[packageName][path]) {
      return window[packageName][path]
    }
    if (window[`${packageName}/${path}`]) {
      return window[`${packageName}/${path}`].default
    }
    const doLoaded = await this.doLoadComponent({ packageName, path })
    if (doLoaded) {
      doLoaded.componentPath = componentPath
    }
    return doLoaded
  }

  /**
   * 进行网络传输、加载组件内容
   * @param {*} param0
   * @returns
   */
  async doLoadComponent ({
    packageName, path
  }) {
    log('doLoadComponent', packageName, path)
    // 加载包依赖的js （必须首先加载否则组件加载会出错）
    const packageJSONObject = await this.getPackageJSON(packageName)

    if (packageJSONObject == null) {
      return null
    }

    // 加载包依赖定义
    await this.confirmPackageDependencies(packageName)

    let rcd = null
    if (packageJSONObject.ridgeDist) {
      // 整体加载
      await this.loadScript(`${packageJSONObject.name}/${packageJSONObject.ridgeDist}`)
      rcd = window[packageJSONObject.name][path]
    } else {
      // 单独加载
      rcd = await this.loadComponentScript({ packageName, path })
    }

    if (rcd) {
      await this.prepareComponent(rcd, { packageName, path }, packageJSONObject)
    }
    return rcd
  }

  /**
   * 预处理组件定义，定义前后变更的兼容性问题解决
   * @param {} rcd 组件定义
   * @param {*} param1
   * @param {*} packageJSONObject
   */
  async prepareComponent (rcd, {
    packageName,
    path
  }) {
    rcd.packageName = packageName
    rcd.path = path

    // 标题统一是title
    rcd.title = rcd.title || rcd.label
    // 加载单独的依赖
    if (Array.isArray(rcd.externals)) {
      for (const ext of rcd.externals) {
        if (ext.startsWith('/')) {
          await this.loadScript(ext)
        } else {
          await this.loadScript(packageName + '/' + ext)
        }
      }
    }
    // 处理渲染器，加载渲染器依赖
    if (rcd.component) {
      // 支持异步的加载情况
      if (typeof rcd.component === 'function') {
        if (rcd.component.constructor.name === 'AsyncFunction') {
          rcd.component = (await rcd.component()).default
        }
      }
      if (this.loadPropControl) {
        for (const prop of rcd.props || []) {
          if (prop && prop.control && typeof prop.control === 'function' && prop.control.toString().startsWith('()')) {
            prop.controlComponent = (await prop.control()).default
          }
          if (prop.options && typeof prop.options === 'function' && prop.options.toString().startsWith('()')) {
            prop.optionsLoads = await prop.options()
          }
        }
      }
    } else {
      log('组件 Component定义未加载到', rcd)
    }
  }

  on (eventName, callback) {
    this.eventCallbacks.push({
      eventName,
      callback
    })
  }

  /**
     * 加载前端组件的代码，支持2种方式 globalThis 及 amd
     */
  async loadComponentScript ({
    packageName,
    path
  }) {
    // 加载图元脚本，其中每个图元在编译时都已经设置到了window根上，以图元url为可以key
    await this.loadScript(`${packageName}/build/${path}.js`)

    const scriptLibName = `${packageName}/${path}`
    // globalThis方式
    if (window[scriptLibName]) {
      return window[scriptLibName].default
    } else {
      return null
    }
  }

  removeCss (href) {
    if (!href) return
    const links = Array.from(document.head.children).filter(node => node.tagName.toLowerCase() === 'link')

    for (const link of links) {
      if (link.href.endsWith(href)) {
        document.head.removeChild(link)
      }
    }
  }

  getFinalCDNUrl (url) {
    let loadUrl = url.replace(/\/\//g, '/')
    if (!loadUrl.startsWith('/')) {
      loadUrl = '/' + loadUrl
    }
    loadUrl = this.baseUrl + loadUrl

    if (loadUrl.startsWith('/') || loadUrl.indexOf('')) {
      // 本地ridge-http服务
    }
  }

  /**
   * 给定一个资源地址，基于基础地址（npm根）下载资源
   * @param {*} url
   * @returns
   */
  async _loadScript (url) {
    if (url == null) {
      return
    }
    try {
      // 去重无意义的双斜线
      let loadUrl = url.replace(/\/\//g, '/')
      if (!loadUrl.startsWith('/')) {
        loadUrl = '/' + loadUrl
      }
      // script和link标签具体相同结尾的：不重复加载
      if (Array.from(document.querySelectorAll('script')).find(script => script.src && script.src.endsWith(loadUrl)) ||
        Array.from(document.querySelectorAll('link')).find(script => script.href && script.href.endsWith(loadUrl))) {
        log('Script loaded: ', loadUrl)
        return loadUrl
      }

      // 拼接npm cdn地址
      const finalUrl = this.baseUrl + loadUrl

      trace('Load:' + finalUrl)
      if (finalUrl.endsWith('.css')) {
        await loadCss(finalUrl)
      } else {
        await loadScript(finalUrl)
      }
      return loadUrl
    } catch (e) {
      console.error('JS Load Error:', `${url}`)
    }
  }

  /**
   * 获取package.json定义对象
   * @param {*} packageName
   * @returns
   */
  async getPackageJSON (packageName) {
    return this.loadJSON(`${packageName}/package.json`)
  }

  /**
   * 加载组件包的依赖资源
   * 主要加载package.json中的 externals (外部依赖)
   * @param {String} packageName 组件包名称
   */
  async _confirmPackageDependencies (packageName) {
    log('_confirmPackageDependencies', packageName)
    if (window[packageName]) return
    const packageJSONObject = await this.getPackageJSON(packageName)
    if (packageJSONObject == null) return

    const dependencies = Object.keys(packageJSONObject.dependencies || {})

    // 主要目的：加载React、Lodash等通用依赖资源
    for (const npmdep of dependencies) {
      await this.loadExternal(npmdep)
    }

    // 组件包指定的external地址： 直接按地址加载
    const externals = packageJSONObject.externals || packageJSONObject.prepares
    const loading = []
    // 加载prepares 库。
    if (Array.isArray(externals)) {
      for (const external of externals) {
        if (external.startsWith('/')) {
          loading.push(await this.loadScript(external))
        } else {
          loading.push(await this.loadScript(packageJSONObject.name + '/' + external))
        }
      }
    }
    await Promise.allSettled(loading)

    if (window.ridgeTheme && window.ridgeTheme[packageName]) {
      // 全局定义了当前组件库的主题样式位置
      this.loadPackageTheme(packageName, window.ridgeTheme[packageName])
    } else if (packageJSONObject.themes) {
      // 支持主题的包，加载指定主题
      this.loadPackageTheme(packageName, packageJSONObject.themes.default)
    }
  }

  async loadPackageTheme (packageName, themeUrl) {
    if (this.themeUrls[packageName]) {
      this.removeCss(this.themeUrls[packageName])
    }

    loadCss(this.baseUrl + '/' + themeUrl)
    this.themeUrls[packageName] = themeUrl
  }

  /**
   * 加载Ridge声明的额外包
   * @param {*} packageName 包名
   */
  async _loadExternal (packageName) {
    log('_loadExternal', packageName)
    const packageFound = ridgeExternals.externals.filter(ex => ex.module === packageName)[0]

    if (packageFound) {
      log('Found External Package', packageFound)
      if (packageFound.root && window[packageFound.root]) {
        return
      }

      // 先递归加载包的依赖
      if (packageFound.dependencies) {
        for (const depend of packageFound.dependencies) {
          await this.loadExternal(depend)
        }
      }

      // 并行加载dist
      if (Array.isArray(packageFound.dist)) {
        const loadings = []
        for (const di of packageFound.dist) {
          loadings.push(this.loadScript(di))
        }
        await Promise.allSettled(loadings)
      } else if (typeof packageFound.dist === 'string') {
        await this.loadScript(packageFound.dist)
      }
    }
  }

  /**
   *
   * @param {*} url
   */
  async loadStoreScript (url) {
    return loadRemoteJsModule(url)
  }

  async fetchJSON (url) {
    trace('Fetch:' + url)
    const response = await window.fetch(url, {
      mode: 'cors',
      credentials: 'include'
    })
    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  async loadTextContent (url) {
    const loadPath = this.getURIPath(url)
    trace('Fetch:' + loadPath)
    const fetched = await window.fetch(loadPath, {
      mode: 'cors',
      credentials: 'include'
    })

    if (fetched.ok) {
      return await fetched.text()
    } else {
      return null
    }
  }

  getJSONCache (jsonUrl) {
    if (globalThis && globalThis['json://' + jsonUrl]) {
      return globalThis['json://' + jsonUrl]
    } else {
      return this.jsonCache.get(jsonUrl)
    }
  }

  setJSONCache (url, jsonObject) {
    const jsonUrl = this.getURIPath(url)
    this.jsonCache.set(jsonUrl, jsonObject)
  }

  async loadJSON (path) {
    const jsonUrl = this.getURIPath(path)

    const jsonCache = this.getJSONCache(jsonUrl)
    if (!jsonCache) {
      const jsonObject = await this.fetchJSON(jsonUrl)
      if (jsonObject) {
        this.jsonCache.set(jsonUrl, jsonObject)
        return jsonObject
      }
    } else {
      log('Load json in cache: ', path, jsonUrl)
      return jsonCache
    }
  }
}

export default Loader
