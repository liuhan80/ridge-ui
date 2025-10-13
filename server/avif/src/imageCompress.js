/**
 * 遍历处理所有图片文件
 */
const preparer = require('./utils/prepare.js')
const sharpImageCompress = require('./utils/sharpImageCompress.js')
const fse = require('fs-extra')
const path = require('path')
const sleep = require('./utils/sleep.js')
const readline = require('readline')

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 询问用户的函数
function askUserConfirmation (question) {
  return new Promise((resolve) => {
    rl.question(question + ' (y/n) ', (answer) => {
      // 标准化输入（转为小写）
      const normalizedAnswer = answer.trim().toLowerCase()

      // 检查用户输入是否为y或yes
      const isConfirmed = normalizedAnswer === 'y' || normalizedAnswer === 'yes'

      resolve(isConfirmed)
    })
  })
}

const handler = {
  prepare: async (source, target, opts) => {
    return preparer(source, target, /\.(png|jpg)$/, '.webp', opts.fullScope)
  },

  process: async (source, target, opts) => {
    const { missings, all } = await preparer(source, target, /\.(png|jpg)$/, '.webp', opts.fullScope)

    let i = 0
    const targetList = opts.overwrite ? all : missings

    console.log('opts', opts)
    const continued = await askUserConfirmation('List ' + targetList.length + ' of all' + all.length)
    if (!continued) {
      return
    }
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
