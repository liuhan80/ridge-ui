// fileZipUtils.js
import JSZip from 'jszip'

import { basename, dirname, extname, nanoid } from '../utils/string.js'

import { getByMimeType } from '../utils/mimeTypes.js'
import { blobToDataUrl, dataURLtoBlob, saveAs } from '../utils/blob.js'

/**
 * 从 fileTree（平面数组）中提取某个目录（targetDirId）的完整子树
 * 包括：该目录自己 + 所有子目录和文件（递归）
 * @param {Array} fileTree - 扁平文件树数组，每个节点包含 id/key, parent, label, type, children? 等字段
 * @param {string|number} targetDirId - 目标目录的 id 或 key
 * @returns {Array} - 返回一个数组，包含目标目录的完整子树（通常只有一个根节点）
 */
const extractSubTree = (fileTree, targetDirId) => {
  const subtree = []

  // 辅助函数：递归构建某个节点的子树
  const buildNodeWithChildren = (nodeId) => {
    // 1. 找到当前节点
    const currentNode = fileTree.find(n => n.key === nodeId || n.id === nodeId)
    if (!currentNode) return null

    // 2. 复制节点，避免污染原数据
    const newNode = { ...currentNode }

    // 3. 递归构建子节点
    newNode.children = []
    for (const potentialChild of fileTree) {
      if (potentialChild.parent === nodeId) { // 找 parentId === 当前节点id 的子节点
        const childSubTree = buildNodeWithChildren(potentialChild.key || potentialChild.id)
        if (childSubTree) {
          newNode.children.push(childSubTree)
        }
      }
    }

    return newNode
  }

  // 只构建目标目录的子树（包含自己 + 递归子节点）
  const targetSubTree = buildNodeWithChildren(targetDirId)
  if (targetSubTree) {
    subtree.push(targetSubTree)
  }

  return subtree
}

/**
 * 递归压缩目录到 ZIP 实例
 * @param {JSZip} zip JSZip 实例/文件夹
 * @param {Array} fileTree 文件树数据
 * @param {string} targetDirId 目标目录ID
 * @param {object} fileContentStore localforage 实例
 * @param {string} currentPath 当前 ZIP 内路径
 */
export const zipDirectory = async (zip, fileTree, targetDirId, fileContentStore, currentPath = '') => {
  // 然后在 exportDirectoryAsZip 中：
  const subTree = extractSubTree(fileTree, targetDirId)

  for (const node of subTree) {
    const nodePath = currentPath ? `${currentPath}/${node.label}` : node.label

    if (node.type === 'directory') {
      const zipDir = zip.folder(node.label)
      await zipDirectory(zipDir, node.children || [], node.key, fileContentStore, nodePath)
    } else {
      const content = await fileContentStore.getItem(node.key)
      if (content) {
        const blob = await dataURLtoBlob(content)
        zip.file(node.label, blob)
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
export const exportDirectoryAsZip = async (dirId, fileMetaCollection, fileContentStore, getFileTree, zipName = 'directory-export.zip') => {
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
  const fileTree = getFileTree(allFiles)
  await zipDirectory(zip, fileTree, dirId, fileContentStore)

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
  const fileTree = getFileTree(allFiles)
  await zipDirectory(zip, fileTree, -1, fileContentStore)

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
 * 根据 ZIP 路径创建目录（纯逻辑，无状态）
 * @param {string} zipPath ZIP 内路径
 * @param {string} rootDirId 根目录ID
 * @param {object} fileMetaCollection NeCollection 实例
 * @returns {string} 最终创建的目录ID
 */
export const createDirectoryFromZipPath = async (zipPath, rootDirId, fileMetaCollection) => {
  const dirNames = zipPath.split('/').filter(Boolean)
  let currentParentId = rootDirId

  for (const dirName of dirNames) {
    const existingDir = await fileMetaCollection.findOne({
      parent: currentParentId,
      name: dirName,
      type: 'directory'
    })

    if (!existingDir) {
      const dirId = nanoid(10)
      await fileMetaCollection.insert({
        id: dirId,
        parent: currentParentId,
        name: dirName,
        type: 'directory'
      })
      currentParentId = dirId
    } else {
      currentParentId = existingDir.id
    }
  }
  return currentParentId
}

/**
 * 从 ZIP 条目创建文件（纯逻辑，无状态）
 * @param {string} zipPath ZIP 内文件路径
 * @param {JSZipObject} zipObject ZIP 文件对象
 * @param {string} rootDirId 根目录ID
 * @param {object} fileMetaCollection NeCollection 实例
 * @param {object} fileContentStore localforage 实例
 * @param {boolean} overwrite 是否覆盖
 */
export const createFileFromZipEntry = async (zipPath, zipObject, rootDirId, fileMetaCollection, fileContentStore, overwrite) => {
  const dirPath = dirname(zipPath)
  const fileName = basename(zipPath)
  const fileExt = extname(fileName)

  const parentId = await createDirectoryFromZipPath(dirPath, rootDirId, fileMetaCollection)

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
  const mimeType = getByMimeType(fileExt) || blob.type || 'application/octet-stream'
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

/**
 * 导入 ZIP 到指定目录（纯逻辑，无状态）
 * @param {File} zipFile 上传的 ZIP 文件
 * @param {string} targetDirId 目标目录ID
 * @param {boolean} overwrite 是否覆盖
 * @param {object} fileMetaCollection NeCollection 实例
 * @param {object} fileContentStore localforage 实例
 * @returns {object} 导入结果 { importedDirs, importedFiles }
 */
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

  // 遍历 ZIP 条目
  const fileEntries = []
  zip.forEach((relativePath, zipObject) => {
    fileEntries.push({
      path: relativePath,
      isDir: zipObject.dir,
      zipObject
    })
  })

  // 先创建目录，再创建文件
  const dirEntries = fileEntries.filter(item => item.isDir)
  const fileEntriesToCreate = fileEntries.filter(item => !item.isDir)

  // 创建目录
  for (const dirEntry of dirEntries) {
    await createDirectoryFromZipPath(dirEntry.path, targetDirId, fileMetaCollection)
  }

  // 创建文件
  for (const fileEntry of fileEntriesToCreate) {
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
    importedDirs: dirEntries.length,
    importedFiles: fileEntriesToCreate.length
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
