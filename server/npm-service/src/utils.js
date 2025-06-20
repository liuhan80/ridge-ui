const yauzl = require('yauzl')
const fs = require('fs-extra')
const path = require('path')
const { exec } = require('child_process')

// 替换为实际的 zip 文件路径
const filePath = './your-zip-file.zip'
const targetDirectory = './target-directory'

const exexPublish = async (token, dir) => {
  return await executeCommands(dir, 'npm publish')
}

const executeCommands = async (targetPath, cmd) => {
  try {
    // 进入目标目录
    await new Promise((resolve, reject) => {
      exec('cd ' + targetPath, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`执行命令出错: ${error}`))
        } else {
          resolve()
        }
      })
    })

    // 在目标目录下执行命令
    const { stdout } = await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`执行命令出错: ${error}`))
        } else {
          resolve(stdout)
        }
      })
    })

    console.log(`命令执行结果: ${stdout}`)
  } catch (error) {
    console.error(`执行命令出错: ${error}`)
  }
}

const unzip = async (filePath, targetDirectory) => {
  return new Promise((resolve, reject) => {
    yauzl.open(filePath, { lazy: false }, (err, zipfile) => {
      if (err) {
        console.error(err)
        return
      }

      zipfile.on('entry', (entry) => {
        const fileName = entry.fileName
        const outputPath = `${targetDirectory}/${fileName}`

        entry.on('data', (chunk) => {
          fs.writeFile(outputPath, chunk, (error) => {
            if (error) {
              console.error('写入文件出错:', error)
            }
          })
        })

        entry.on('end', () => {
          console.log(`已解压文件：${fileName}`)
        })
      })

      zipfile.on('end', () => {
        console.log('解压完成')
        resolve()
      })
    })
  })
}

module.exports = {
  unzip,
  executeCommands,
  exexPublish
}
