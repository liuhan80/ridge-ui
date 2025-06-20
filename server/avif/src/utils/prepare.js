const walker = require('./walker.js')
const path = require('path')
const fse = require('fs-extra')

/**
 * 目标：复制source到target， 计算所有文件， 对于满足后缀（regex）的文件， 判断需要处理（test）的文件
 * @param {*} source
 * @param {*} target
 * @param {*} regex
 * @param {*} test
 * @returns
 */
const prepare = async (source, target, regex, appendix, fullScope) => {
  const result = {}
  const allFiles = await walker(source)
  const allTargetFiles = await walker(target)
  result.length = allFiles.length

  result.missings = []
  result.all = []
  for (const fullPath of allFiles) {
    if ((regex && regex.test(fullPath.toLocaleLowerCase())) || !regex) {
      // 相对路径
      const relPath = path.relative(source, fullPath)
      // 去掉后缀的全名称
      let newPath = path.resolve(target, relPath)
      if (appendix) {
        newPath = path.resolve(target, relPath.replace(path.extname(relPath), appendix))
      }
      if (fullScope) {
        let baseName = path.basename(fullPath)
        if (appendix) {
          baseName = baseName + appendix
        }
        const found = allTargetFiles.filter(file => path.basename(file) === baseName)[0]
        if (found) {
          newPath = found
        }
      }

      result.all.push([fullPath, newPath])

      if (!fse.existsSync(newPath)) {
        result.missings.push([fullPath, newPath])
      }
    }
  }
  result.missingLength = result.missings.length
  result.allLength = result.all.length
  return result
}

module.exports = prepare
