const path = require('path')
const fse = require('fs-extra')
const walker = require('./walker')
const ffmpegCompress = require('./ffmpegCompress.js')
const sharpImageCompress = require('./sharpImageCompress.js')

let workOnIncr = 0
let totalFiles = 0
const doConvertImageToWebp = async (sourcePath, relPath, destFolder) => {
  totalFiles++
  const fullPath = path.resolve(sourcePath, relPath)
  if (path.extname(fullPath).toLowerCase() === '.png' || path.extname(fullPath).toLocaleLowerCase() === '.jpg') {
    workOnIncr++
    const newPath = path.resolve(destFolder, relPath.replace(path.extname(relPath), '.webp'))
    if (!fse.existsSync(newPath)) {
      console.log(workOnIncr + '/' + totalFiles + '.Comporessing ' + newPath)
      await fse.ensureDirSync(path.resolve(newPath, '../'))
      try {
        await ss.fileToAvif(fullPath, newPath, 'webp')
      } catch (e) {
        console.log('Convert Error', fullPath)
      }
    } else {
      console.log(workOnIncr + '.Ignore ' + newPath)
    }
  }
}

const doCompressVideo = async (sourcePath, relPath, destFolder) => {
  const fullPath = path.resolve(sourcePath, relPath)
  console.log('fullPath', fullPath)
  if (path.extname(fullPath).toLowerCase() === '.mp4' || path.extname(fullPath).toLocaleLowerCase() === '.avi' || path.extname(fullPath).toLowerCase() === '.3gp') {
    workOnIncr++
    const newPath = path.resolve(destFolder, relPath.replace(path.extname(relPath), '.mp4'))
    if (!fse.existsSync(newPath)) {
      console.log(workOnIncr + '/' + totalFiles + '/Comporessing ' + newPath)
      await fse.ensureDirSync(path.resolve(newPath, '../'))
      try {
        await ffmpegTo(fullPath, newPath)
      } catch (e) {
        console.log('Convert Error', fullPath, e)
      }
    } else {
      console.log(workOnIncr + '.Ignore ' + newPath)
    }
  }
}

const handlers = [{
  test: /\.(png|jpg)$/,
  handler: sharpImageCompress
}, {
  test: /\.(mp4|avi|rmvb|3gp)$/,
  handler: ffmpegCompress
}]

const doConvertTo = async (from, to, handlers) => {
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
        if (handler.test && handler.test.test(fullPath)) {
          await fse.ensureDirSync(path.resolve(newPath, '../'))
          try {
            // handler.handler(fullPath, newPath)
          } catch (e) {
            console.log('Convert Error', fullPath, e)
          }
        }
      }
    }
  })
}

doConvertTo('D:\\2022', 'D:\\Photos\\2022', handlers)

// doCompressVideo('D:\\2014', '7\\WP_20140711_004.mp4', 'D:\\')
