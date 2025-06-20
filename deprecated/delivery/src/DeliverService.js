const fs = require('fs-extra')
const axios = require('axios')
const download = require('download')
const webpackExternals = require('ridge-externals')
const tar = require('tar')
const debug = require('debug')('ridge:assets')

const path = require('path')

class DeliverService {
  constructor (app) {
    this.app = app
    this.npmHomeDir = path.resolve(app.config.public, app.config.npmHomeDir ?? './npm')
  }

  async handleNotFound (ctx) {
    // do npm up stream
    const [,, scope, name] = ctx.path.split('/')
    let packageName = scope
    if (packageName && packageName.startsWith('@')) {
      if (!name) {
        return
      }
      packageName = packageName + '/' + name
    }
    try {
      const packageDir = path.resolve(this.npmHomeDir, packageName)
      if (!fs.existsSync(packageDir)) {
        await fs.ensureDirSync(packageDir)
        const result = await this.installPackageTo(packageName, null, packageDir, this.app.config.npmRegistry)
        if (result === 200) {
          ctx.response.redirect(ctx.path)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
     * 安装资源包到指定路径
     * @param {*} packageName 资源包名称
     * @param {*} packageVersion 资源包版本或Tag号
     * @param {*} distPath 目标路径
     */
  async installPackageTo (packageName, packageVersion, distPath, npmServer) {
    let packageInfo = null

    // 获取组件包信息
    try {
      packageInfo = (await axios.get(npmServer + '/' + packageName)).data
      if (packageInfo.error) {
        return 400
      }
    } catch (e) {
      return 404
    }

    let useVersion = packageVersion

    if (useVersion == null) { // 为空： 使用latest tag
      useVersion = packageInfo['dist-tags'].latest
    } else if (packageInfo['dist-tags'][useVersion]) { // 否则从tag中先查找
      useVersion = packageInfo['dist-tags'][useVersion]
    }

    if (!useVersion || !packageInfo.versions[useVersion]) {
      return 400
    }

    debug(`fetch package ${packageName}, version=${packageVersion}`)

    // 清空既有目录
    // if (fs.existsSync(distPath)) {
    //   fs.rmdirSync(distPath, {
    //     recursive: true
    //   })
    // }

    await download(packageInfo.versions[useVersion].dist.tarball, distPath, {
      filename: 'package.tgz'
    })

    const extractFiles = null

    // 判断是否是外部模块， 外部模块要排除多余的文件，只使用声明的文件
    const externalModules = webpackExternals.externals.filter(ex => ex.module.startsWith(packageName))

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
        if (externalModule.dist) {
          extractFiles.push('package/' + getDistPath(externalModule.dist))
        }
        if (externalModule.style) {
          if (typeof externalModule.style === 'string') {
            extractFiles.push('package/' + getDistPath(externalModule.style))
          }
        }
      }
    }

    await tar.extract({
      file: `${distPath}/package.tgz`,
      cwd: distPath
    }, extractFiles)

    await tar.extract({
      file: `${distPath}/package.tgz`,
      cwd: distPath
    }, extractFiles)

    // 删除文件
    await fs.unlinkSync(`${distPath}/package.tgz`)

    const fileNames = await fs.readdirSync(`${distPath}/package`)

    fileNames.forEach(async function (fileName) {
      try {
        fs.moveSync(path.resolve(distPath, './package', fileName), path.resolve(distPath, fileName), {
          overwrite: true
        })
      } catch (e) {
        // ignore
      }
    })

    return 200
  }
}

module.exports = DeliverService
