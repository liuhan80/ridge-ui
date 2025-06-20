const fs = require('fs').promises
const path = require('path')
async function traverseDir (dir, cb) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        await cb(fullPath, entry)
        await traverseDir(fullPath, cb)
      } else {
        // 处理文件
        await cb(fullPath, entry)
      }
    }
    return entries
  } catch (err) {
    console.error('Error traversing directory:', err)
  }
}

/**
 * 遍历每个源目录的文件（sourceFolder），依次再将处理回调发往处理方法（handle支持异步）
 * @param {*} sourceFolder
 * @param {*} handle
 */
const convertRecursive = async (sourceFolder, handle) => {
  await traverseDir(sourceFolder, async (fullPath, entry) => {
    const relPath = path.relative(sourceFolder, fullPath)
    await handle(sourceFolder, relPath)
  })
}

module.exports = convertRecursive
