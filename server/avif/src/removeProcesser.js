const preparer = require('./utils/prepare.js')
const fse = require('fs-extra')
const path = require('path')

// 去除重复文件
const handler = {
  prepare: async (source, target) => {
    return preparer(source, target)
  },

  process: async (source, target, opts) => {
    const { missings, all } = await preparer(source, target, /\.(png|jpg)$/, '.webp')

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
    }
  }
}

module.exports = handler
