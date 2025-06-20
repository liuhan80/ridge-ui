const Sharp = require('sharp')
/**
 * 使用sharp转换/压缩一张图片
 * @param {*} sourcePath 源图片地址
 * @param {*} destPath 目标地址
 * @param {*} method 转换方式 （webp）
 * @param {*} maxLength 最大宽度（横向） 或者最大高度（纵向） 小于不转换
 */
const shartImageCompress = async (sourcePath, destPath, opts) => {
  const method = opts.imageFormat || 'webp'
  const max = opts.maxImageLength || 4000
  // const overwrite = opts.overwrite || false
  // const remove = opts.remove || false
  // const targetFilePath = destPath + '.' + method
  // if (fse.existsSync(targetFilePath) && !overwrite) {
  //   if (remove) {
  //     console.log('Remove :' + sourcePath)
  //     await fse.removeSync(sourcePath)
  //   } else {
  //     console.log('Ignore: ' + sourcePath + '(' + (await fse.statSync(sourcePath)).size + ')->' + targetFilePath + '(' + (await fse.statSync(targetFilePath)).size + ')')
  //   }
  //   return
  // }
  const instance = new Sharp(sourcePath)
  const meta = await instance.metadata()

  if (meta.width > meta.height && meta.width > max) { // 宽大于则缩小
    return instance.resize(max)[method]({
      quality: 80
    }).toFile(destPath)
  } else if (meta.width < meta.height && meta.height > max) { // 高大于则缩小
    return instance.resize(null, max)[method]({
      quality: 80
    }).toFile(destPath)
  } else {
    return instance[method]({
      quality: 80
    }).toFile(destPath)
  }
}

module.exports = shartImageCompress
