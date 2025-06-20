const path = require('path')
const axios = require('axios')
const send = require('koa-send')
const download = require('download')
const tar = require('tar')
const os = require('os')
const { BadRequestError, NotFoundError } = require('ridge-http')
const fsExtra = require('fs-extra')
const debug = require('debug')('ridge:npm')
const error = require('debug')('ridge:error')

const webpackExternals = {}
const API_PREFIX = '/npm'

class NPMService {
  constructor (app) {
    this.app = app
    this.dbservice = app.dataBaseProducer
    this.config = app.config
    this.npmHomeDir = path.resolve(app.config.public, app.config.npmHomeDir)
    this.npmRegistry = app.config.npmRegistry
    this.npmDeliveryUrl = app.config.npmDeliveryUrl
  }

  async doBeforeFetch (ctx) {
    if (ctx.path.startsWith('/' + this.app.config.npmHomeDir)) {
      // 进行http下载
      const npmFilePath = ctx.path.replace('/npm/', '').replace(/\/$/, '/index.html')
      if (this.missingNpmFiles[npmFilePath] === true) { // 下载过未找到， 就不重复下载了
        return
      }
      const destFile = path.resolve(this.npmHomeDir, npmFilePath)
      if (!fsExtra.existsSync(destFile)) {
        try {
          const destDir = path.resolve(this.npmHomeDir, npmFilePath, '../')
          await download(this.npmDeliveryUrl + '/' + npmFilePath, destDir)
        } catch (e) {
          error('error', e)
          error('Npm file download Fail:' + destFile)
        }
      }
    }
  }

  async initRoute (router) {
    if (this.config.npmAutoDelivery) {
      this.app.use(async (ctx, next) => {
        await this.fetchSend(ctx)
        await next()
      })
    }
    router.get(`${API_PREFIX}/get`, async (ctx, next) => {
      const { name, version = 'latest' } = ctx.query

      if (!name) {
        throw new BadRequestError('query : version and name required')
      }
      const result = await this.getNpmPackageByVersion(name, version)

      if (result == null) {
        throw new NotFoundError('包未注册')
      } else {
        ctx.body = {
          npm: result
        }
      }
      await next()
    })

    router.get(`${API_PREFIX}/cache`, async (ctx, next) => {
      await this.fetchSend(ctx)
      await next()
    })

    // 安装包到指定路径
    router.get(`${API_PREFIX}/install`, async (ctx, next) => {
      const { name, version } = ctx.query

      ctx.body = await this.installPackage(name, version, this.npmRegistry, this.npmHomeDir)
      await next()
    })
  }

  /**
   * 获取npm版本信息
   * @param {*} name 名称
   * @param {*} version 版本
   * @param {*} server 服务地址
   * @returns
   */
  async getNpmPackageByVersion (name, version = 'latest') {
    const server = this.config.npmRegistry
    try {
      debug('getNpmPackageByVersion', name, version)
      const packageInfo = await axios.get(`${server}/${name}/${version}`)
      if (packageInfo && packageInfo.data && packageInfo.data.name === name) {
        return packageInfo.data
      }
    } catch (e) {
      // error null
    }
    return null
  }

  async fetchSend (ctx) {
    if (ctx.path.startsWith('/' + this.app.config.npmHomeDir)) {
      // 进行http下载
      const npmFilePath = ctx.path.replace('/npm/', '').replace(/\/$/, '/index.html')
      try {
        const targetFilePath = path.resolve(this.npmHomeDir, npmFilePath) // 先查看地址是否存在
        if (!fsExtra.existsSync(targetFilePath)) { // 不存在则去npm拉取下载
          debug('fetch download', targetFilePath)
          await download(this.npmDeliveryUrl + '/' + npmFilePath, path.resolve(targetFilePath, '../'))
          debug('downloaded ', this.npmDeliveryUrl + '/' + npmFilePath)
        }

        await send(ctx, npmFilePath, {
          root: this.npmHomeDir
        })
      } catch (e) {
        debug('download error:', npmFilePath, e.statusCode)
      }
    }
  }

  /**
   * 安装应用及对应依赖
   * @param {*} appName
   * @param {*} version
   */
  async instanllAppAndDependencies (appName, version) {

  }

  async installPackageAppDependencies (appName) {

  }

  /**
   * 从npm仓库安装web应用
   * @param {*} name
   * @param {*} version
   * @param {*} npmRegistryUrl
   * @param {*} npmHomeDir
   * @returns
   */
  async installWebApp (name, version, npmRegistryUrl, npmHomeDir) {
    // 获取组件包信息
    let packageInfo = null
    try {
      packageInfo = (await axios.get(npmRegistryUrl + '/' + name)).data

      if (packageInfo.error) {
        throw new BadRequestError('组件包未找到:' + npmRegistryUrl + '/' + name)
      }
    } catch (e) {
      console.log(e)
      throw new BadRequestError('组件包未找到:' + npmRegistryUrl + '/' + name)
    }

    let useVersion = version

    if (useVersion == null) { // 为空： 使用latest tag
      useVersion = packageInfo['dist-tags'].latest
    } else if (packageInfo['dist-tags'][useVersion]) { // 否则从tag中先查找
      useVersion = packageInfo['dist-tags'][useVersion]
    }

    if (!useVersion || !packageInfo.versions[useVersion]) {
      throw new BadRequestError('组件包的应用版本未找到:' + name + '@' + version)
    }

    const distPath = path.resolve(os.tmpdir, name)

    // 清空既有目录
    if (fsExtra.existsSync(distPath)) {
      fsExtra.rmdirSync(distPath, {
        recursive: true
      })
    }
    await fsExtra.ensureDir(distPath)

    await download(packageInfo.versions[useVersion].dist.tarball, distPath, {
      filename: 'package.tgz'
    })

    await tar.extract({
      file: path.resolve(distPath, 'package.tgz'),
      cwd: distPath
    })

    if (fsExtra.existsSync(path.resolve(distPath, 'package/package.json'))) {
      // 检查package.json
    }

    await fsExtra.moveSync(path.resolve(distPath, 'package'), path.resolve(npmHomeDir, name))

    return {
    }
  }

  /**
     * 安装WebApp包
     * @param {*} packageName 资源包名称
     * @param {*} packageVersion 资源包版本或Tag号
     * @param {*} distPath 目标路径
     */
  async installPackage (name, version, npmRegistryUrl, npmHomeDir) {
    let packageInfo = null

    // 获取组件包信息
    try {
      packageInfo = (await axios.get(npmRegistryUrl + '/' + name)).data

      if (packageInfo.error) {
        throw new BadRequestError('组件包未找到:' + npmRegistryUrl + '/' + name)
      }
    } catch (e) {
      console.log(e)
      throw new BadRequestError('组件包未找到:' + npmRegistryUrl + '/' + name)
    }

    let useVersion = version

    if (useVersion == null) { // 为空： 使用latest tag
      useVersion = packageInfo['dist-tags'].latest
    } else if (packageInfo['dist-tags'][useVersion]) { // 否则从tag中先查找
      useVersion = packageInfo['dist-tags'][useVersion]
    }

    if (!useVersion || !packageInfo.versions[useVersion]) {
      throw new BadRequestError('组件包的应用版本未找到:' + name + '@' + version)
    }

    const distPath = path.resolve(npmHomeDir, name)

    // 清空既有目录
    if (fsExtra.existsSync(distPath)) {
      fsExtra.rmdirSync(distPath, {
        recursive: true
      })
    }
    await fsExtra.ensureDir(distPath)

    await download(packageInfo.versions[useVersion].dist.tarball, distPath, {
      filename: 'package.tgz'
    })

    let extractFiles = null

    // 判断是否是外部模块， 外部模块要排除多余的文件，只使用声明的文件
    const externalModules = webpackExternals.externals.filter(ex => ex.module.startsWith(name))

    const getDistPath = dist => {
      const splite = dist.split('/')

      if (splite[0].startsWith('@')) {
        splite.splice(0, 2)
      } else {
        splite.splice(0, 1)
      }

      return splite.join('/')
    }

    if (externalModules.length) {
      extractFiles = []
      extractFiles.push('package/package.json')
      for (const externalModule of externalModules) {
        if (Array.isArray(externalModule.dist)) {
          externalModule.dist.forEach(dist => {
            extractFiles.push('package/' + getDistPath(dist))
          })
        } else if (typeof externalModule.dist === 'string') {
          extractFiles.push('package/' + getDistPath(externalModule.dist))
        }
      }
    }

    await tar.extract({
      file: path.resolve(distPath, 'package.tgz'),
      cwd: distPath
    }, extractFiles)

    // 删除文件
    await fsExtra.unlinkSync(path.resolve(distPath, 'package.tgz'))

    const fileNames = await fsExtra.readdirSync(path.resolve(distPath, 'package'))

    for (const fileName of fileNames) {
      await fsExtra.moveSync(path.resolve(distPath, 'package', fileName), path.resolve(distPath, fileName), {
        overwrite: true
      })
    }

    // 删除文件
    try {
      await fsExtra.rmdirSync(path.resolve(distPath, 'package'))
    } catch (e) {
      console.error(e)
    }

    return {
      installedPackage: {
        name,
        version: useVersion
      }
    }
  }
}

module.exports = NPMService
