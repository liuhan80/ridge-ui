const path = require('path')
const fse = require('fs-extra')
const walker = require('./walker')
const ffmpegCompress = require('./utils/ffmpegCompress.js')
const sharpImageCompress = require('./utils/sharpImageCompress.js')

const handlers = [{
  test: /\.(png|jpg|cr2)$/,
  handler: sharpImageCompress
}, {
  test: /\.(mp4|avi|rmvb|3gp)$/,
  handler: ffmpegCompress
}]

/**
 * 转换目录文件到目标目录，支持图片和视频
 * @param {*} from
 * @param {*} to
 * @param {*}
 * opts.maxImageLength 图片长度，默认4000
 * opts.maxVideoSize 最大视频宽度  默认480
 */
const doConvertTo = async (from, to, opts) => {
  walker(from, async function (err, data) {
    if (err) {
      throw err
    }
    console.log(from + ' Total Files: ' + data.length)
    let i = 0
    for (const fullPath of data) {
      i++
      const relPath = path.relative(from, fullPath)
      const newPath = path.resolve(to, relPath.replace(path.extname(relPath), ''))
      console.log(`${i}/${data.length} : ${fullPath} -> ${newPath}`)
      for (const handler of handlers) {
        if (handler.test && handler.test.test(fullPath.toLocaleLowerCase())) {
          await fse.ensureDirSync(path.resolve(newPath, '../'))
          try {
            opts.callback && opts.callback({
              fullPath,
              relPath,
              newPath,
              i,
              data
            })
            await handler.handler(fullPath, newPath, opts)
          } catch (e) {
            console.log('Convert Error', fullPath, e)
          }
        }
      }
    }
  })
}

doConvertTo('D:\\2022', 'D:\\Photos\\2022', {
  maxVideoSize: 480, // 最大视频宽度 480 即480p视频
  maxImageLength: 4000, // 最大图片宽度（长度）4000 一般足够
  imageFormat: 'webp', // 图片格式， webp效率最高、显示更清晰
  overwrite: false, // 转换目标存在时是否覆盖 true为覆盖会执行很多次处理
  remove: true // 转换完成后源是否删除, 默认为不删除
})

// doCompressVideo('D:\\2014', '7\\WP_20140711_004.mp4', 'D:\\')
