/**
 * 遍历处理所有图片文件
 */
const preparer = require('./utils/prepare.js')
const sharpImageCompress = require('./utils/sharpImageCompress.js')
const fse = require('fs-extra')
const path = require('path')
const sleep = require('./utils/sleep.js')

const handler = {
  prepare: async (source, target, opts) => {
    return preparer(source, target, /\.(png|jpg)$/, '.webp', opts.fullScope)
  },

  process: async (source, target, opts) => {
    const { missings, all } = await preparer(source, target, /\.(png|jpg)$/, '.webp', opts.fullScope)

    let i = 0
    const targetList = opts.overwrite ? all : missings
    for (const pair of targetList) {
      i++
      opts && opts.each && opts.each({
        i,
        pair,
        targetList
      })

      await fse.ensureDirSync(path.resolve(pair[1], '../'))

      try {
        await sharpImageCompress(pair[0], pair[1], opts)

        if (opts.remove) {
          await sleep(400)
          await fse.removeSync(pair[0])
        }
      } catch (e) {
        console.log('Error', e)
      }
    }
  }
}

module.exports = handler
