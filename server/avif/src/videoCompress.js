const walker = require('./utils/walker.js')
const preparer = require('./utils/prepare.js')
const ffmpegCompress = require('./utils/ffmpegCompress.js')
const fse = require('fs-extra')
const path = require('path')
// 去除重复文件
const handler = {
  test: /\.(mp4|avi|rmvb|3gp|mkv)$/,
  prepare: async (source, target, opts) => {
    return preparer(source, target, /\.(mp4|avi|rmvb|3gp|mkv)$/, '.mp4', opts.fullScope)
  },

  process: async (source, target, opts) => {
    const { missings, all } = await preparer(source, target, /\.(mp4|avi|rmvb|3gp|mkv)$/, '.mp4')

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
        await ffmpegCompress(pair[0], pair[1], opts)
        if (opts.remove) {
          try {
            await fse.removeSync(pair[0])
          } catch (e) {
            console.error(e)
          }
        }
      } catch (e) {
        await fse.removeSync(pair[1])
        console.error(e)
      }
    }
  }
}

module.exports = handler
