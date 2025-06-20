const fse = require('fs-extra')
const path = require('path')

async function deleteFilesByPrefix (dir, prefix) {
  const deleted = []
  try {
    const files = await fse.readdir(dir)
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stats = await fse.stat(filePath)
      if (stats.isFile() && file.startsWith(prefix)) {
        await fse.remove(filePath)
        deleted.push(file)
      }
    }
  } catch (err) {
    console.error('操作出现错误:', err)
  }
  return deleted
}

/**
   * 检查包名处是否符合npm规范
   * @param {*} name
   * @returns
   */
function isValidNpmPackageName (name) {
  const regex = /^(?!\.|_)([a-z0-9]+(?:[-.][a-z0-9]+)*)$/
  if (!regex.test(name)) {
    return false
  }
  if (name.length < 2 || name.length > 214) {
    return false
  }
  // 额外检查不能以纯数字开头，除非紧跟点或连字符
  if (/^[0-9]/.test(name) && !/^[0-9][-.]/.test(name)) {
    return false
  }
  // 检查是否有连续的点或连字符
  if (/[-.]{2,}/.test(name)) {
    return false
  }
  return true
}

function safeNpmName (name) {
  return name.replace(/[@/-]/g, '_')
}

function randomRangeId (num) {
  let returnStr = ''
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < num; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1))

    returnStr += charStr.substring(index, index + 1)
  }
  return returnStr
}

function shortid (length) {
  return randomRangeId(length || 6)
}

module.exports = {
  shortid,
  deleteFilesByPrefix,
  isValidNpmPackageName,
  safeNpmName
}
