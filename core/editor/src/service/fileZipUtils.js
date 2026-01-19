// fileZipUtils.js
import JSZip from 'jszip'

import { basename, dirname, extname, nanoid } from '../utils/string.js'

import { getByMimeType } from '../utils/mimeTypes.js'
import { blobToDataUrl, dataURLtoBlob, saveAs } from '../utils/blob.js'

/**
 * 从 fileTree 中提取某个目录的完整子树
 * 修正：统一使用 id 作为标识，明确区分文件和目录
 */
const extractSubTree = (fileTree, targetDirId) => {
  // 辅助函数：递归构建子树
  const buildNodeWithChildren = (nodeId) => {
    // 1. 找到当前节点（统一使用 id）
    const currentNode = fileTree.find(n => n.id === nodeId)
    if (!currentNode) return null

    // 2. 复制节点
    const newNode = {
      ...currentNode,
      children: [] // 确保有 children 数组
    }

    // 3. 递归查找直接子节点
    const directChildren = fileTree.filter(node => node.parent === nodeId)

    for (const childNode of directChildren) {
      const childSubTree = buildNodeWithChildren(childNode.id)
      if (childSubTree) {
        newNode.children.push(childSubTree)
      }
    }
    return newNode
  }
  // 构建目标目录的子树
  return buildNodeWithChildren(targetDirId)
}

/**
 * 递归压缩目录到 ZIP 实例
 * @param {JSZip} zip JSZip 实例/文件夹
 * @param {Array} fileTree 文件树数据
 * @param {string} targetDirId 目标目录ID
 * @param {object} fileContentStore localforage 实例
 * @param {string} currentPath 当前 ZIP 内路径
 */
export const zipDirectory = async (zip, fileTree, fileContentStore, currentPath = '') => {
  if (fileTree) {
    const zipDir = zip.folder(fileTree.name)
    for (const node of fileTree.children) {
      const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name
      if (node.type === 'directory') {
        await zipDirectory(zipDir, node, fileContentStore, nodePath)
      } else {
        const content = await fileContentStore.getItem(node.id)
        if (content) {
          const blob = await dataURLtoBlob(content)
          zipDir.file(node.name, blob)
        }
      }
    }
  }
}

/**
 * 导出指定目录为 ZIP 文件（纯工具方法，无状态）
 * @param {string} dirId 目录ID（根目录传 -1）
 * @param {object} fileMetaCollection NeCollection 实例
 * @param {object} fileContentStore localforage 实例
 * @param {Function} getFileTree 构建文件树的方法
 * @param {string} zipName 导出文件名
 * @returns {boolean} 是否成功
 */
export const exportDirectoryAsZip = async (dirId, fileMetaCollection, fileContentStore, zipName = 'directory-export.zip') => {
  // 验证目录
  const dirMeta = dirId !== -1
    ? await fileMetaCollection.findOne({ id: dirId, type: 'directory' })
    : { name: 'root' }

  if (!dirMeta && dirId !== -1) {
    throw new Error('目标目录不存在')
  }

  // 构建 ZIP
  const zip = new JSZip()
  const allFiles = await fileMetaCollection.find({})

  await zipDirectory(zip, extractSubTree(allFiles, dirId), fileContentStore)

  // 生成并下载 ZIP
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  })

  const finalZipName = zipName.endsWith('.zip') ? zipName : `${dirMeta.name}.zip`
  saveAs(blob, finalZipName)
  return true
}

/**
 * 导出整个工作区为 ZIP（纯工具方法）
 * @param {object} fileMetaCollection NeCollection 实例
 * @param {object} fileContentStore localforage 实例
 * @param {Function} getFileTree 构建文件树的方法
 * @param {string} zipName 导出文件名
 * @returns {boolean} 是否成功
 */
export const exportAllWorkspace = async (fileMetaCollection, fileContentStore, getFileTree, zipName) => {
  // 生成默认文件名（带日期）
  const defaultName = `workspace-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.zip`
  const finalZipName = zipName || defaultName

  // 打包根目录（-1）下所有内容
  const zip = new JSZip()
  const allFiles = await fileMetaCollection.find({})
  const rootFiles = await fileMetaCollection.find({ parent: -1 })

  for (const rootFile of rootFiles) {
    await zipDirectory(zip, extractSubTree(allFiles, rootFile.id), fileContentStore)
  }

  // 生成并下载 ZIP
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  })
  saveAs(blob, finalZipName)
  return true
}
/**
 * 根据 ZIP 路径创建必要的目录结构
 * 修正：只创建真正的目录路径，排除文件名
 */
export const createDirectoryFromZipPath = async (fullPath, rootDirId, fileMetaCollection) => {
  // 处理空路径
  if (!fullPath || fullPath === '.') {
    return rootDirId
  }

  // 标准化路径：移除开头的 ./ 和结尾的 /
  const normalizedPath = fullPath.replace(/^\.\//, '').replace(/\/$/, '')

  // 如果是根路径，直接返回根目录ID
  if (normalizedPath === '' || normalizedPath === '.') {
    return rootDirId
  }

  const pathParts = normalizedPath.split('/').filter(part => part !== '.' && part !== '..' && part !== '')

  // 如果路径只有一部分且对应一个存在的文件，不应该创建为目录
  // 这里我们信任调用方传入的是目录路径，但需要安全检查

  let currentParentId = rootDirId

  for (let i = 0; i < pathParts.length; i++) {
    const dirName = pathParts[i]

    // 检查是否已存在同名目录
    const existingDir = await fileMetaCollection.findOne({
      parent: currentParentId,
      name: dirName,
      type: 'directory'
    })

    if (existingDir) {
      currentParentId = existingDir.id
    } else {
      // 创建新目录
      const dirId = nanoid(10)
      await fileMetaCollection.insert({
        id: dirId,
        parent: currentParentId,
        name: dirName,
        type: 'directory'
      })
      currentParentId = dirId
    }
  }

  return currentParentId
}
export const createFileFromZipEntry = async (zipPath, zipObject, rootDirId, fileMetaCollection, fileContentStore, overwrite) => {
  // 安全地处理路径
  const normalizedPath = zipPath.replace(/^\.\//, '').replace(/\/$/, '')

  if (!normalizedPath) {
    console.warn('跳过空路径的文件条目')
    return
  }

  // 分离目录路径和文件名
  const lastSlashIndex = normalizedPath.lastIndexOf('/')
  let dirPath, fileName

  if (lastSlashIndex === -1) {
    // 文件在根目录
    dirPath = ''
    fileName = normalizedPath
  } else {
    dirPath = normalizedPath.substring(0, lastSlashIndex)
    fileName = normalizedPath.substring(lastSlashIndex + 1)
  }

  // 对于根目录文件，直接使用 rootDirId 作为父目录
  const parentId = dirPath
    ? await createDirectoryFromZipPath(dirPath, rootDirId, fileMetaCollection)
    : rootDirId

  // 检查父目录是否存在（特别是对于根目录文件）
  // if (!dirPath) {
  //   // 确保 rootDirId 确实是目录
  //   const parentDir = await fileMetaCollection.findOne({ id: parentId })
  //   if (!parentDir) {
  //     console.error('根目录不存在，无法创建文件:', fileName)
  //     return
  //   }
  // }

  // 剩余逻辑保持不变...
  const existingFile = await fileMetaCollection.findOne({
    parent: parentId,
    name: fileName,
    type: 'file'
  })

  if (existingFile && !overwrite) {
    console.warn(`文件 ${fileName} 已存在，跳过`)
    return
  }

  const blob = await zipObject.async('blob')
  const mimeType = getByMimeType(extname(fileName)) || blob.type || 'application/octet-stream'
  const dataUrl = await blobToDataUrl(blob, mimeType)

  if (existingFile) {
    await fileContentStore.setItem(existingFile.id, dataUrl)
    await fileMetaCollection.patch({ id: existingFile.id }, {
      size: blob.size,
      mimeType
    })
  } else {
    const fileId = nanoid(10)
    await fileContentStore.setItem(fileId, dataUrl)
    await fileMetaCollection.insert({
      id: fileId,
      parent: parentId,
      name: fileName,
      type: 'file',
      mimeType,
      size: blob.size
    })
  }
}

export const importZipToDirectory = async (zipFile, targetDirId, overwrite, fileMetaCollection, fileContentStore) => {
  // 验证目标目录
  const targetDirMeta = targetDirId !== -1
    ? await fileMetaCollection.findOne({ id: targetDirId, type: 'directory' })
    : null

  if (!targetDirMeta && targetDirId !== -1) {
    throw new Error('目标目录不存在')
  }

  // 加载 ZIP
  const zip = new JSZip()
  await zip.loadAsync(zipFile)

  // 收集所有需要创建的目录路径（去重）
  const directoryPaths = new Set()

  // 先遍历所有条目，收集所有目录路径
  zip.forEach((relativePath, zipObject) => {
    if (zipObject.dir) {
      // 这是目录条目
      directoryPaths.add(relativePath)
    } else {
      // 这是文件条目，提取其目录路径
      const fileDirPath = relativePath.split('/').slice(0, -1).join('/')
      if (fileDirPath) {
        directoryPaths.add(fileDirPath)
      }
      // 根目录下的文件不需要创建目录
    }
  })

  // 创建所有需要的目录（按层级顺序）
  const sortedDirPaths = Array.from(directoryPaths).sort((a, b) => a.length - b.length)

  for (const dirPath of sortedDirPaths) {
    await createDirectoryFromZipPath(dirPath, targetDirId, fileMetaCollection)
  }

  // 然后创建文件
  const fileEntries = []
  zip.forEach((relativePath, zipObject) => {
    if (!zipObject.dir) {
      fileEntries.push({
        path: relativePath,
        zipObject
      })
    }
  })

  for (const fileEntry of fileEntries) {
    await createFileFromZipEntry(
      fileEntry.path,
      fileEntry.zipObject,
      targetDirId,
      fileMetaCollection,
      fileContentStore,
      overwrite
    )
  }

  return {
    success: true,
    importedDirs: directoryPaths.size,
    importedFiles: fileEntries.length
  }
}

/**
 * 清空并导入 ZIP 到工作区（纯逻辑，无状态）
 * @param {File} zipFile 上传的 ZIP 文件
 * @param {object} fileMetaCollection NeCollection 实例
 * @param {object} fileContentStore localforage 实例
 * @returns {object} 导入结果 { importedDirs, importedFiles }
 */
export const importZipToCleanWorkspace = async (zipFile, fileMetaCollection, fileContentStore) => {
  // 清空所有原有内容
  await fileMetaCollection.clean()
  await fileContentStore.clear()

  // 导入 ZIP 到空工作区
  return await importZipToDirectory(zipFile, -1, true, fileMetaCollection, fileContentStore)
}
