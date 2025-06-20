const ffmpeg = require('fluent-ffmpeg')
// const fse = require('fs-extra')
/**
 * 转换一个视频到一个新的路径
 * @param {*} fullPath 源视频路径
 * @param {*} newPath 目标视频
 * @param {*} max 最大视频宽度（竖向视频则为高度）
 * @returns
 */
const ffmpegCompress = async (fullPath, targetFilePath, opts = {}) => {
  const max = opts.maxVideoSize || 480
  // const overwrite = opts.overwrite || false
  // const remove = opts.remove || false
  // if (fse.existsSync(targetFilePath) && !overwrite) {
  //   if (remove) {
  //     console.log('Remove olda :' + fullPath)
  //     await fse.removeSync(fullPath)
  //   } else {
  //     console.log('Ignore: ' + fullPath + '(' + (await fse.statSync(fullPath)).size + ')->' + targetFilePath + '(' + (await fse.statSync(targetFilePath)).size + ')')
  //   }
  //   return
  // }

  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(fullPath, function (err, metadata) {
      if (err) {
        reject(err)
        return
      }

      if (!metadata || !Array.isArray(metadata.streams)) {
        reject(metadata)
        return
      }

      const videoStream = metadata.streams.filter(stream => stream.width && stream.height)[0]
      if (!videoStream) {
        resolve()
        return
      }
      const { width, height } = videoStream
      console.log(width, height)

      let size = width + 'x' + height
      if (width > height && width > max) {
        size = `${max}x?}`
      } else if (height > width && height > max) {
        size = `?x${max}`
      }

      let lastTime = new Date().getTime()
      ffmpeg(fullPath).videoCodec('libx264').output(targetFilePath).size(size).on('progress', function (progress) {
        if (progress.percent && new Date().getTime() - lastTime > 5000) {
        //   lastPercent = progress.percent
          lastTime = new Date().getTime()
          console.log('Processing: ' + progress.percent + '% done')
        }
      }).on('error', function (err) {
        console.log('An error occurred: ' + err.message)
        reject(err)
      }).on('end', function () {
        console.log('Processing finished !')
        // if (remove) {
        //   console.log('Remove olda :' + fullPath)
        //   fse.removeSync(fullPath)
        // }
        resolve(metadata)
      }).run()
      // resolve()
    })
  })
}

module.exports = ffmpegCompress
