const { UnauthorizedError, ForBiddenError, BadRequestError, NotFoundError } = require('ridge-http')
const path = require('path')
const fse = require('fs-extra')
const send = require('koa-send')
const semver = require('semver')
const debug = require('debug')('ridge:store')
const { deleteFilesByPrefix, safeNpmName, isValidNpmPackageName, shortid } = require('./utils.js')

class AppStorageService {
  constructor (app) {
    this.app = app
    this.userService = app.services.userService
    this.npmService = app.services.npmService
    this.repoService = app.services.repoService
    this.dbservice = app.dataBaseProducer

    this.rules = app.config.appStoreRules || [{
      name: 'free',
      appCount: 4,
      size: 4 * 1024 * 1024,
      npm: false
    }, {
      name: 'pay',
      appCount: 16,
      size: 32 * 1024 * 1024,
      npm: true
    }, {
      name: 'advanced',
      appCount: 64,
      size: 32 * 1024 * 1024,
      npm: true
    }, {
      name: 'admin',
      appCount: 128,
      size: 64 * 1024 * 1024,
      npm: true
    }]
  }

  initRoutes () {
    this.app.router.get('/app/storage/status', async (ctx, next) => {
      const { appStorePath, rule, user } = await this.prepareStorePath(ctx)
      ctx.body = {
        user,
        rule,
        storeList: await this.getStoreList(appStorePath)
      }
      await next()
    })

    this.app.router.post('/app/storage/delete', async (ctx, next) => {
      const { appStorePath, user } = await this.prepareStorePath(ctx)
      const { app } = ctx.request.body
      debug('/app/storage/delete', user.id, app)

      ctx.body = await this.deleteAppStore(appStorePath, app)
      await next()
    })

    this.app.router.post('/app/storage/put', async (ctx, next) => {
      debug('/app/storage/put')
      let packageObject = null

      try {
        packageObject = JSON.parse(ctx.request.body.npmPackage)
      } catch (e) {
        throw new BadRequestError('npmPackage 字段非JSON')
      }
      if (!packageObject.name || !isValidNpmPackageName(packageObject.name)) {
        // 包名不合法直接拒绝
        debug('Package name invalid', packageObject.name)
        throw new BadRequestError('应用名称不合法')
      }

      if (!packageObject.version || !semver.valid(packageObject.version)) {
        // 包名不合法直接拒绝
        debug('Version invalid', packageObject.version)
        throw new BadRequestError('版本名称不合法')
      }

      const { file } = ctx.request.files
      const { appStorePath, rule, user } = await this.prepareStorePath(ctx)

      ctx.body = await this.putAppStore(appStorePath, file, {
        user,
        rule,
        publish: ctx.request.body.publish,
        collect: ctx.request.body.collect,
        npmPackage: packageObject
      })
      await next()
    })

    // 下载用户的应用包
    this.app.router.get('/app/storage/share/:name', async (ctx, next) => {
      const { name } = ctx.params
      debug('/app/storage/share', name)

      await this.sendPackageFileByLink(ctx, name)
      await next()
    })

    this.app.router.get('/app/storage/download/:name', async (ctx, next) => {
      debug('/app/storage/download')

      const { appStorePath, rule, user } = await this.prepareStorePath(ctx)
      const packageName = ctx.params.name

      await this.sendPackageFile(ctx, {
        user,
        appStorePath,
        packageName
      })

      await next()
    })
  }

  /**
   * 通用: 获取当前用户信息及存储权利
   * @param {*} ctx
   * @returns
   */
  async prepareStorePath (ctx) {
    const user = await this.userService.getCurrentUser(ctx)

    if (!user) {
      throw new UnauthorizedError('请登录')
    }
    const appStorePath = await this.userService.getUserStorage(user)

    if (!appStorePath) {
      throw new ForBiddenError('此操作被限制')
    }
    const rule = this.rules.filter(rule => rule.name === user.type)[0] || this.rules[0]

    return {
      user,
      rule,
      appStorePath
    }
  }

  /**
   * 给定StoreRoot, 在其中创建一个app存储
   * @param {*} appStorePath
   * @param {*} file
   * @param {*} opts
   * @returns
   */
  async putAppStore (appStorePath, file, opts) {
    const appStoreColl = await this.getAppStoreCollection(appStorePath)
    const { rule, publish, npmPackage, user, collect } = opts
    const result = {}

    const safePackageName = safeNpmName(npmPackage.name)
    const filePath = safePackageName + '_' + semver.coerce(npmPackage.version) + '.zip'
    debug('putAppStore', user.id, appStorePath, filePath)

    const all = await appStoreColl.find({})

    const existed = await appStoreColl.findOne({ // 已经保存的记录
      name: npmPackage.name
    })
    if (all.length >= rule.appCount && !existed) {
      debug('Excceed quota', rule.appCount)
      return {
        error: '已超出存储限额:' + all.length + '/' + rule.appCount
      }
    }

    const appTarObject = {
      filePath,
      name: npmPackage.name,
      version: npmPackage.version,
      description: npmPackage.description,
      publishResult: 0,
      size: file.size,
      published: false,
      collected: false,
      icon: npmPackage.icon
    }
    if (existed) {
      await appStoreColl.patch(existed._id, appTarObject)
    } else {
      await appStoreColl.insert(appTarObject)
    }

    result.appTarObject = appTarObject

    await fse.ensureDir(path.resolve(appStorePath, './app_store'))
    await deleteFilesByPrefix(path.resolve(appStorePath, './app_store'), safePackageName)
    const targetFilePath = path.resolve(appStorePath, './app_store/', appTarObject.filePath)
    fse.copyFileSync(file.filepath, targetFilePath)

    if (publish === 'true' && rule.npm) {
      const { cloudNpmService } = this.app.services
      const profile = await this.userService.getUserProfile(user.id)
      result.publishQueue = await cloudNpmService.publishPackage(npmPackage.name, targetFilePath, user.id, profile.publishToken)
      if (result.publishQueue) {
        if (!result.publishQueue.onwerShip) { // 没有所有权
          const existed = await appStoreColl.findOne({
            name: npmPackage.name
          })
          // 无法发布
          if (existed) {
            await appStoreColl.patch(existed._id, {
              publishResult: 403
            })
          }
        } else {
          if (result.publishQueue.localNpm) {
            await appStoreColl.patch(existed._id, {
              publishResult: 200,
              published: true
            })

            if (collect === 'true') { // 请求收录
              await this.repoService.addRequest(npmPackage.name, user.id, true)
              await appStoreColl.patch(existed._id, {
                collected: true
              })
            }
          }
          const rnd = shortid(8)
          const sharelinkColl = await this.getShareLinkColl()
          // 删除分享记录
          await sharelinkColl.remove({
            name: npmPackage.name
          })
          // 记录分享
          await sharelinkColl.insert({ name: npmPackage.name, userId: user.id, short: rnd })
        }
      }
    }
    return result
  }

  /**
   * 删除存储目录下的某个应用
   * @param {*} appStorePath 存储目录
   * @param {*} appName 应用名称
   */
  async deleteAppStore (appStorePath, appName) {
    const appStoreColl = await this.getAppStoreCollection(appStorePath)

    const safePackageName = safeNpmName(appName)
    await deleteFilesByPrefix(path.resolve(appStorePath, './app_store'), safePackageName)

    const existed = await appStoreColl.findOne({
      name: appName
    })

    if (existed) {
      await appStoreColl.remove(existed._id)
    }
    return existed
  }

  async npmPublishResult (packageObject, result) {
    if (packageObject.ridgeUserId) {
      debug('Npm result notify:', packageObject.ridgeUserId, packageObject.name, packageObject.version, result)
      const appStorePath = await this.userService.getUserStorage(packageObject.ridgeUserId)
      const appStoreColl = await this.getAppStoreCollection(appStorePath)

      const existed = await appStoreColl.findOne({
        name: packageObject.name
      })
      if (existed) {
        await appStoreColl.patch(existed._id, {
          publishResult: result
        })
      }
    }
  }

  async sendPackageFileByLink (ctx, link) {
    const sharelinkColl = await this.getShareLinkColl()
    const sharelink = await sharelinkColl.findOne({
      name: link
    })

    if (sharelink) {
      const { userId, name } = sharelink

      const storagePath = await this.userService.getUserStorage(userId)

      await this.sendPackageFile(ctx, {
        appStorePath: storagePath,
        packageName: name
      })
    } else {
      throw new NotFoundError('分享链接未找到', link)
    }
  }

  /**
   * 下载发出用户的应用包文件
   * @param {*} ctx
   * @param {*} param1
   */
  async sendPackageFile (ctx, { packageName, appStorePath }) {
    debug('sendPackageFile', packageName)
    const appStoreColl = await this.getAppStoreCollection(appStorePath)

    if (appStoreColl == null) {
      throw new NotFoundError('未找到应用存储目录', appStorePath)
    }
    const existed = await appStoreColl.findOne({
      name: packageName
    })
    if (existed) {
      const targetFilePath = path.resolve(appStorePath, './app_store/', existed.filePath)

      if (fse.existsSync(targetFilePath)) {
        // 设置响应头的Content-Disposition，让浏览器以下载的形式处理该文件
        ctx.attachment(`${packageName}.zip`)

        const relPath = path.relative(this.app.config.userRepoDir, targetFilePath)
        await send(ctx, relPath, {
          root: this.app.config.userRepoDir
        })
      } else {
        throw new NotFoundError('指定应用包文件未找到', packageName)
      }
    }
  }

  async getShareLinkColl () {
    const db = await this.dbservice.getDb('npm')
    return db.getCollection('sharelink')
  }

  async getStoreList (appStorePath) {
    const appStoreColl = await this.getAppStoreCollection(appStorePath)
    return await appStoreColl.find({})
  }

  async getAppStoreCollection (appStorePath) {
    if (appStorePath == null) {
      return null
    }
    const db = await this.dbservice.getDb(path.resolve(appStorePath, 'store'))
    return db.getCollection('apps')
  }
}

module.exports = AppStorageService
