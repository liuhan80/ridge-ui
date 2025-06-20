const { BadRequestError, NotFoundError, ForBiddenError, description, ConflictError } = require('ridge-http')
const axios = require('axios')
const fsExtra = require('fs-extra')
const path = require('path')
const debug = require('debug')('ridge:repo')
const REPO_PREFIX = '/repo'

/**
 * 从源对象复制指定字段到新对象
 * @param {Object} source - 源对象
 * @param {Array<string>} fields - 需要复制的字段名数组
 * @param {Object} [options] - 可选配置项
 * @param {boolean} [options.ignoreNonExistent=false] - 是否忽略源对象中不存在的字段
 * @param {boolean} [options.deepClone=false] - 是否深度克隆对象
 * @returns {Object} 包含指定字段的新对象
 */
function copyFields (source, fields, options = {}) {
  const { ignoreNonExistent = true, deepClone = false } = options
  const result = {}

  fields.forEach(field => {
    if (source.hasOwnProperty(field)) {
      if (deepClone && typeof source[field] === 'object' && source[field] !== null) {
        result[field] = Array.isArray(source[field])
          ? source[field].map(item =>
            typeof item === 'object' && item !== null ? { ...item } : item
          )
          : { ...source[field] }
      } else {
        result[field] = source[field]
      }
    } else if (!ignoreNonExistent) {
      throw new Error(`源对象中不存在字段: ${field}`)
    }
  })
  return result
}

const COMPONENTLIBS = `
ridge-container
ridge-bootstrap
ridge-semi
ridge-cropperjs
ridge-highcharts
ridge-json-tree
ridge-material
ridge-semantic
ridge-marked
ridge-toolbox
ridge-effect-animejs
`
/**
 * 公共存储库服务，供提交、管理、查询公开应用
 */
module.exports = class RepoService {
  constructor (app) {
    this.npmRegistry = app.config.npmRegistry
    this.dbservice = app.dataBaseProducer
    this.publicDir = app.config.public
    this.autoApproveCollect = app.config.autoApproveCollect
    this.app = app
  }

  init () {
  }

  async initRoute (router) {
    await this.pullRepo()
    router.post(`${REPO_PREFIX}/request/commit`, async (ctx, next) => {
      const { userService } = ctx.app.services
      const currentUser = userService.getUserWithErrorThrown(ctx)

      ctx.body = await this.addRequest(ctx.request.body.name, currentUser.id)
      await next()
    })
    router.post(`${REPO_PREFIX}/request/cancel`, async (ctx, next) => {
      const { userService } = ctx.app.services
      const currentUser = userService.getUserWithErrorThrown(ctx)

      ctx.body = await this.cancelRequest(ctx.request.body.name, currentUser.name)
      await next()
    })
    router.post(`${REPO_PREFIX}/request/approve`, async (ctx, next) => {
      await this.checkManage(ctx)
      ctx.body = await this.approve(ctx.request.body.name, ctx.request.body.approved)
      await next()
    })

    router.get(`${REPO_PREFIX}/pull`, async (ctx, next) => {
      await this.checkManage(ctx)
      ctx.body = await this.pullRepo()
      await next()
    })
    router.post(`${REPO_PREFIX}/unapprove`, async (ctx, next) => {
      await this.checkManage(ctx)
      ctx.body = await this.unapprove(ctx.request.body.name)
      await next()
    })
    router.get(`${REPO_PREFIX}/request/list`, async (ctx, next) => {
      await this.checkManage(ctx)
      ctx.body = await this.getRequestList(ctx.query.skip, ctx.query.limit)
      await next()
    })

    // 对外提交展示
    router.get(`${REPO_PREFIX}/app/query`, async (ctx, next) => {
      ctx.body = await this.queryPackages(ctx.query)
      await next()
    })

    router.post(`${REPO_PREFIX}/component/add`, async (ctx, next) => {
      await this.checkManage(ctx)
      ctx.body = await this.addComponent(ctx.body)
      await next()
    })
    // 对外提交展示
    router.get(`${REPO_PREFIX}/component/query`, async (ctx, next) => {
      ctx.body = await this.queryComponents(ctx.query)
      await next()
    })
  }

  async checkManage (ctx) {
    const { userService } = ctx.app.services
    const currentUser = userService.getUserWithErrorThrown(ctx)

    if (currentUser.type !== 'admin') {
      throw new ForBiddenError('您无权限')
    }
    return true
  }

  // 提交收录请求
  async addRequest (name, user, ignoreCheck = false) {
    if (!ignoreCheck) {
      const npmPackageInfo = await this.getRepoPackageInfo(name)

      if (npmPackageInfo == null) {
        throw new BadRequestError('npm包未找到')
      }
      if (npmPackageInfo.ridgeUserId == null || npmPackageInfo.ridgeUserId !== user) {
        throw new BadRequestError('用户对当前包无权限')
      }
    }

    if (this.autoApproveCollect) {
      await this.approve(name)
    } else {
      const requestObject = {
        name,
        user
      }

      const reqCol = await this.getRequestCollection()

      const requested = await reqCol.findOne({ name })

      if (!requested) {
        const result = await reqCol.insert(requestObject)
        return {
          code: '0',
          result
        }
      } else {
        throw new ConflictError('当前包已经在申请队列， 请勿重复提交')
      }
    }
  }

  getPackageType (packageInfo) {
    if (packageInfo.ridgeUserId || packageInfo.ridgeType === 'app') {
      return 'app'
    } else if (packageInfo.ridgeDist) {
      return 'component'
    } else {
      return null
    }
  }

  // 拉取更新仓库的组件包信息
  async pullRepo () {
    debug('pull repos')

    await COMPONENTLIBS.split(/\n/).filter(_ => _.trim()).forEach(async name => {
      try {
        await this.addComponent(name)
      } catch (e) {}
    })
  }

  // 从云端npm目录读取组件库信息
  async getRepoPackageInfo (name) {
    try {
      return fsExtra.readJSONSync(path.resolve(this.publicDir, 'npm', name, 'package.json'))
    } catch (e) {
      return null
    }
  }

  getRepoDoc (npmPackageInfo) {
    const type = this.getPackageType(npmPackageInfo)
    if (type == null) return null

    const doc = copyFields(npmPackageInfo, ['name', 'cover', 'logo', 'version', 'description', 'icon', 'author', 'license', 'dependencies', 'ridgeEntries'])
    doc.devices = []
    if (npmPackageInfo.ridgeEntries) {
      if (npmPackageInfo.ridgeEntries.mobile) {
        doc.devices.push('mobile')
      }
      if (npmPackageInfo.ridgeEntries.desktop) {
        doc.devices.push('desktop')
      }
      if (npmPackageInfo.ridgeEntries.tablet) {
        doc.devices.push('tablet')
      }
    }

    return doc
  }

  async approve (name) {
    const npmPackageInfo = await this.getRepoPackageInfo(name)

    const doc = this.getRepoDoc(npmPackageInfo)
    if (doc == null) {
      return {
        npmPackageInfo,
        result: 'invalid'
      }
    } else {
      const col = await this.getApplicationCollection()
      const reqCol = await this.getRequestCollection()
      await reqCol.remove({ name })

      await col.remove({ name })
      return { result: await col.insert(doc) }
    }
  }

  async getRequestList (skip, limit) {
    const reqCol = await this.getRequestCollection()

    const docs = await reqCol.find({}, { skip, limit })
    return docs
  }

  async unRegisterPackage ({ name }) {
    if (!name) {
      throw new BadRequestError('Package name must be provided')
    }
    this.registryJSONObject.packages = this.registryJSONObject.packages.filter(v => v.name !== name)
    this.registryJSONObject.versions = this.registryJSONObject.versions.filter(v => v.name !== name)

    fsExtra.writeJSONSync(this.registryFile, this.registryJSONObject)
    return this.registryJSONObject
  }

  async queryPackages (query) {
    const options = Object.assign({
      skip: 0,
      limit: 50
    }, {
      skip: parseInt(query.skip) || 0,
      limit: parseInt(query.limit) || 50
    })

    delete query.skip
    delete query.limit

    const col = await this.getApplicationCollection()

    return await col.find(query, options)
  }

  async queryComponents (query) {
    const options = Object.assign({
      skip: 0,
      limit: 50
    }, {
      skip: parseInt(query.skip) || 0,
      limit: parseInt(query.limit) || 50
    })

    delete query.skip
    delete query.limit
    const col = await this.getComponentGalleryCollection()

    return await col.find(query, options)
  }

  async addComponent (name) {
    const npmPackageInfo = await this.getRepoPackageInfo(name)

    if (npmPackageInfo) {
      const coll = await this.getComponentGalleryCollection()
      await coll.remove({ name })

      const component = copyFields(npmPackageInfo, ['name', 'version', 'description', 'icon', 'logo', 'cover', 'author', 'externals', 'dependencies'])

      return await coll.insert(component)
    } else {
      throw new NotFoundError('组件未找到')
    }
  }

  // 获取申请库
  async getRequestCollection () {
    const db = await this.dbservice.getDb('request')
    return db.getCollection('committed')
  }

  // 获取拒绝库
  async getRejectedCollection () {
    const db = await this.dbservice.getDb('request')
    return db.getCollection('rejected')
  }

  // 应用注册列表
  async getApplicationCollection () {
    const db = await this.dbservice.getDb('registry')
    return db.getCollection('apps')
  }

  // 获取组件库
  async getComponentGalleryCollection () {
    const db = await this.dbservice.getDb('registry')
    return db.getCollection('components')
  }
}
