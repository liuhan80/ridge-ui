const path = require('path')
const extract = require('extract-zip')
const fsExtra = require('fs-extra')
const debug = require('debug')('ridge:npm')
const os = require('os')
const { exec } = require('child_process')

class CloudNPMService {
  constructor (app) {
    this.app = app
    this.dbservice = app.dataBaseProducer
    this.config = app.config
    this.npmHomeDir = path.resolve(app.config.public ?? './public', app.config.npmHomeDir ?? './npm')

    setInterval(() => {
      try {
        this.execPublishQueue()
      } catch (e) {
        debug('execPublishQueue Error', e)
      }
    }, 5000)
  }

  /**
     * 判断当前用户是否可以把包发布到npm仓库/放置到npm目录
     * @param {*} packageJSONObject
     */
  async checkNpmOwner (packageName, userId) {
    // community/enterprise 服务可以忽略
    // 本地检查：不允许则拒绝。 因为可能其他用户发布后但是并未同步到npm服务
    if (fsExtra.existsSync(path.resolve(this.npmHomeDir, packageName, 'package.json'))) {
      const localExsited = fsExtra.readJSONSync(path.resolve(this.npmHomeDir, packageName, 'package.json'))
      if (localExsited.ridgeUserId == null || localExsited.ridgeUserId !== userId) {
        return false
      }
    }

    const { npmService } = this.app.services
    // 检查npm仓库， 必须确认不存在或者 ridgeUserId === userId
    const npmPackageFound = await npmService.getNpmPackageByVersion(packageName, 'latest')

    if (npmPackageFound == null || npmPackageFound.ridgeUserId === userId) {
      debug('Remote check: ok version = ', npmPackageFound ? npmPackageFound.version : ' -.-.-')
      return true
    } else {
      debug('Remote check: owner: ', npmPackageFound.ridgeUserId)
      return false
    }
  }

  /**
     * 将发布任务加入发布队列,准备发布到全局npm仓库
     * @param {*} publishDir
     * @param {*} token
     */
  async publichLocalNpmToGloabl (publishDir, token) {
    const { npmService } = this.app.services
    debug('publichLocalNpmToGloabl', publishDir)

    const queueCol = await this.getQueueCol()
    const packageJSONObject = fsExtra.readJSONSync(path.resolve(publishDir, 'package.json'))

    // 检查相同版本是否已经发布
    const found = await npmService.getNpmPackageByVersion(packageJSONObject.name, packageJSONObject.version)
    if (found) {
      debug('Same version published:', packageJSONObject.name, packageJSONObject.version, packageJSONObject.ridgeUserId)
      await this.app.services.appStorageService.npmPublishResult(packageJSONObject, 'success')
      return 'published'
    }

    // 删除现有任务
    await queueCol.remove({
      name: packageJSONObject.name
    })

    // 写入提供的token
    if (token) {
      fsExtra.writeFileSync(path.resolve(publishDir, './.npmrc'), `//registry.npmjs.org/:_authToken=${token}`)
    }

    const tempPublishDir = path.resolve(os.tmpdir(), path.basename(publishDir))

    if (fsExtra.existsSync(tempPublishDir)) {
      fsExtra.removeSync(tempPublishDir)
    }
    await fsExtra.copySync(publishDir, tempPublishDir)

    debug('Dir for npm publish: ', tempPublishDir)

    await queueCol.insert({
      dir: tempPublishDir,
      name: packageJSONObject.name,
      version: packageJSONObject.version,
      error: null, // 错误
      exec: null // 执行时间
    })

    return 'queued'
  }

  /**
     * 发布一个组件包到指定目录（/npm目录下）
     * @param {*} packageName 组件包名称
     * @param {*} file npm gz包路径
     * @param {*} userId 用户名称
     * @param {*} token npm token
     * @returns
     */
  async publishPackage (packageName, file, userId, token) {
    debug('publish ', packageName, userId)
    const result = {}
    const checked = await this.checkNpmOwner(packageName, userId)
    result.onwerShip = checked

    if (!checked) { // 无权限
      debug('not owner, rejected')
      return result
    }

    const packageNpmFolder = path.resolve(this.npmHomeDir, packageName)
    await fsExtra.removeSync(packageNpmFolder)
    await fsExtra.ensureDirSync(packageNpmFolder)
    debug('extracting to ', packageNpmFolder)
    await extract(file, { dir: packageNpmFolder })

    if (!fsExtra.existsSync(path.resolve(packageNpmFolder, 'package.json'))) {
      result.error = 'NPM包格式不合法'
      return result
    }

    const packageJSONObject = fsExtra.readJSONSync(path.resolve(packageNpmFolder, 'package.json'))
    packageJSONObject.ridgeUserId = userId
    packageJSONObject.ridgeType = 'app'
    fsExtra.writeJSONSync(path.resolve(packageNpmFolder, 'package.json'), packageJSONObject, {
      spaces: 2
    })

    fsExtra.copyFileSync(path.resolve(__dirname, './assets/index.html'), path.resolve(packageNpmFolder, 'index.html'))

    // 先将文件发布至本地npm服务
    result.localNpm = true
    debug('local npm ready')

    // result.globalNpm = await this.publichLocalNpmToGloabl(packageNpmFolder, token)

    return result
  }

  /**
   * 执行发布动作，每次调用执行一个publish
   * @returns
   */
  async execPublishQueue () {
    if (this.awaiting) {
      return
    }
    this.awaiting = true
    const queueCol = await this.getQueueCol()

    // 无错误的优先
    let oneExec = await queueCol.findOne({
      error: null
    })

    if (!oneExec) {
      oneExec = await queueCol.findOne({})
    }

    if (oneExec) {
      debug('Publishing...', oneExec.dir)
      const packageJSONObject = fsExtra.readJSONSync(path.resolve(oneExec.dir, './package.json'))
      const result = await this.doPublishPackage(oneExec.dir)
      debug('Result ', result)

      let removeQueue = false
      if (result === 200) { // 发布成功
        // 移除队列， 记录发布成功
        debug('Success! record', oneExec.name, oneExec.version)
        removeQueue = true
        // 发布成功记录
        const successRecord = {
          name: packageJSONObject.name,
          version: packageJSONObject.version,
          user: packageJSONObject.ridgeUserId,
          time: new Date().toLocaleString()
        }
        const recordCol = await this.getPublishRecordColl()
        await recordCol.insert(successRecord)

        await this.app.services.appStorageService.npmPublishResult(packageJSONObject, 'success')
      } else if (result === 409) {
        debug('Conflict published ', oneExec.name, oneExec.version)
        removeQueue = true
        await this.app.services.appStorageService.npmPublishResult(packageJSONObject, 'success')
      } else if (result === 401) {
        debug('No permission ', oneExec.name, oneExec.version)
        removeQueue = true
        await this.app.services.appStorageService.npmPublishResult(packageJSONObject, 'not-allowed')
      } else if (result === 403) {
        debug('ENEEDAUTH ', oneExec.name, oneExec.version)
        removeQueue = true
        await this.app.services.appStorageService.npmPublishResult(packageJSONObject, 'ENEEDAUTH')
      } else if (result === 504) {
        debug('Network error, retry later', oneExec.name, oneExec.version)
        await queueCol.patch(oneExec._id, {
          exec: new Date().toLocaleString(),
          error: result
        })
      } else {
        debug('Unknonw error ', oneExec.name, oneExec.version)
        // 更新队列错误
        await queueCol.patch(oneExec._id, {
          exec: new Date().toLocaleString(),
          error: result
        })
      }

      if (removeQueue === true) {
        await queueCol.remove(oneExec._id)
        fsExtra.removeSync(oneExec.dir)
      }
    }
    this.awaiting = false
  }

  async doPublishPackage (publishDir) {
    return new Promise((resolve, reject) => {
      exec('npm publish', { cwd: publishDir }, (error, stdout, stderr) => {
        if (error) {
          if (error.message.indexOf('You cannot publish over the previously published versions') > -1) {
            // 版本已经发布
            resolve(409)
          } else if (error.message.indexOf('You do not have permission to publish') > -1) {
            // 包已存在，其他人发的
            resolve(401)
          } else if (error.message.indexOf('ECONNRESET') > -1) {
            // 网络错误
            resolve(504)
          } else if (error.message.indexOf('ENEEDAUTH') > -1) {
            debug('Error publish:', error)
            resolve(403)
          } else {
            debug('Error publish:', error)
            resolve(500)
          }
        } else {
          console.log(`stdout: ${stdout}`)
          resolve(200)
        }
      })
    })
  }

  /**
     * 增加到发布队列
     * @param {*} packageInfo 包信息
     * @param {*} packageFilePath 包名称
     * @returns
     */
  async addToPublishQueue (packageInfo, packageFilePath) {
    // 检验是否已经发布过
    try {
      await this.getNpmPackageByVersion(packageInfo.name, packageInfo.version)
      // 已经发布过
      return false
    } catch (e) {
      // 未找到才能继续发布
      const coll = await this.getQueueCol()

      const inqueue = coll.findOne({
        name: packageInfo.name,
        version: packageInfo.version
      })

      if (inqueue) {
        return true
      }
      await coll.insert({
        name: packageInfo.name,
        version: packageInfo.version,
        filePath: packageFilePath
      })
    }
  }

  async getPublishRecordColl () {
    const db = await this.dbservice.getDb('npm')
    return db.getCollection('publishs')
  }

  async getQueueCol () {
    const db = await this.dbservice.getDb('npm')
    return db.getCollection('queue')
  }
}

module.exports = CloudNPMService
