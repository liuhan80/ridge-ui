// fileManager.js
import { create } from 'zustand'
import NeCollection from './NeCollection.js'
import localforage from 'localforage'
import { getFileTree, filterTree, mapTree } from '../panels/files/buildFileTree.js'
import { blobToDataUrl, dataURLtoBlob, dataURLToString, stringToBlob } from '../utils/blob.js'
import { getByMimeType } from '../utils/mimeTypes.js'
import { nanoid } from '../utils/string.js'
// 导入抽离的 ZIP 工具方法
import {
  exportDirectoryAsZip,
  exportAllWorkspace,
  importZipToDirectory,
  importZipToCleanWorkspace
} from './fileZipUtils.js'

// 初始化存储实例
const fileMetaCollection = new NeCollection('file-tree.db')
const fileContentStore = localforage.createInstance({ name: 'file-content-store' })

// ===================== 对外导出的工具函数（保留原有非ZIP逻辑） =====================
export const getFile = async (fileId) => {
  try {
    const meta = await fileMetaCollection.findOne({ id: fileId })
    if (!meta) return null

    const content = meta.type === 'directory' ? null : await getFileContent(fileId)
    return { ...meta, content }
  } catch (err) {
    console.error('获取文件失败:', err)
    return null
  }
}

export const updateFileContent = async (fileId, content, mimeType) => {
  try {
    const file = await fileMetaCollection.findOne({ id: fileId })
    if (!file || file.type === 'directory') throw new Error('文件不存在或为文件夹')

    let dataUrl
    if (typeof content === 'string') {
      dataUrl = `data:${mimeType || file.mimeType};base64,${btoa(unescape(encodeURIComponent(content)))}`
    } else if (content instanceof Blob) {
      dataUrl = await blobToDataUrl(content, mimeType || file.mimeType)
    } else {
      throw new Error('内容格式不支持')
    }

    await fileContentStore.setItem(fileId, dataUrl)
    if (mimeType && mimeType !== file.mimeType) {
      await fileMetaCollection.patch({ id: fileId }, { mimeType })
    }
    if (content instanceof Blob && content.size !== file.size) {
      await fileMetaCollection.patch({ id: fileId }, { size: content.size })
    }
    return true
  } catch (err) {
    console.error('更新文件内容失败:', err)
    return false
  }
}

const recursiveDeleteFile = async (fileId) => {
  const file = await fileMetaCollection.findOne({ id: fileId })
  if (file && file.type !== 'directory') {
    await fileContentStore.removeItem(fileId)
  }
  const children = await fileMetaCollection.find({ parent: fileId })
  for (const child of children) {
    await recursiveDeleteFile(child.id)
  }
  await fileMetaCollection.remove({ id: fileId })
}

const recursiveCopyFile = async (sourceFile, newParentId) => {
  const newFileId = nanoid(10)
  const newFileMeta = {
    ...sourceFile,
    id: newFileId,
    parent: newParentId,
    name: `${sourceFile.name}_${newFileId.slice(0, 4)}`
  }
  await fileMetaCollection.insert(newFileMeta)

  if (sourceFile.type !== 'directory') {
    const content = await fileContentStore.getItem(sourceFile.id)
    if (content) {
      await fileContentStore.setItem(newFileId, content)
    }
  }

  const children = await fileMetaCollection.find({ parent: sourceFile.id })
  for (const child of children) {
    await recursiveCopyFile(child, newFileId)
  }
  return newFileMeta
}

const getFilePath = async (fileId, separator = '/') => {
  const currentFile = await fileMetaCollection.findOne({ id: fileId })
  if (!currentFile) return null

  const pathSegments = []
  let tempFile = currentFile

  while (tempFile && tempFile.parent !== -1) {
    pathSegments.unshift(tempFile.name)
    tempFile = await fileMetaCollection.findOne({ id: tempFile.parent })
  }

  if (currentFile.parent === -1 && currentFile.type === 'directory') {
    return separator
  }
  return separator + pathSegments.join(separator)
}

const getFileContent = async (fileId) => {
  try {
    const file = await fileMetaCollection.findOne({ id: fileId })
    if (!file || file.type === 'directory') return null

    const dataUrl = await fileContentStore.getItem(fileId)
    if (file.mimeType.startsWith('text')) {
      return await dataURLToString(dataUrl)
    } else {
      return await dataURLtoBlob(dataUrl)
    }
  } catch (err) {
    console.error('获取文件内容失败:', err)
    return null
  }
}

// ===================== Zustand Store（只做状态管理+调用工具方法） =====================
export const useFileTreeStore = create((set, get) => ({
  fileTree: null,
  loading: false,
  error: null,

  // 原有基础方法（保留）
  initFileTree: async () => {
    try {
      set({ loading: true, error: null })
      const files = await fileMetaCollection.find({})
      const fileTree = getFileTree(files)
      set({ fileTree, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('初始化文件树失败:', err)
    }
  },

  getUrl: async (fileIdOrPath) => {
    try {
      let file = null
      if (typeof fileIdOrPath === 'string' && !fileIdOrPath.startsWith('/')) {
        file = await fileMetaCollection.findOne({ id: fileIdOrPath })
      } else if (typeof fileIdOrPath === 'string' && fileIdOrPath.startsWith('/')) {
        const fileTree = get().fileTree
        const filtered = filterTree(fileTree, f => f.path === fileIdOrPath)
        file = filtered.length > 0 ? filtered[0] : null
      }

      if (!file || file.type === 'directory') return null

      const dataUrl = await fileContentStore.getItem(file.id)
      if (!dataUrl) return null

      const blob = await dataURLtoBlob(dataUrl)
      return URL.createObjectURL(blob)
    } catch (err) {
      set({ error: err.message })
      console.error('获取文件URL失败:', err)
      return null
    }
  },

  createDirectory: async (parentId, name) => {
    try {
      set({ loading: true, error: null })
      const existed = await fileMetaCollection.findOne({ parent: parentId, name })
      if (existed) throw new Error(`文件夹 ${name} 已存在`)

      const dirMeta = {
        id: nanoid(10),
        parent: parentId,
        name,
        type: 'directory'
      }
      await fileMetaCollection.insert(dirMeta)
      await get().refreshFileTree()
      return dirMeta
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('创建文件夹失败:', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  createFile: async (parentId, name, blob, mimeType) => {
    try {
      set({ loading: true, error: null })
      const existed = await fileMetaCollection.findOne({ parent: parentId, name })
      if (existed) throw new Error(`文件 ${name} 已存在`)

      const fileId = nanoid(10)
      const dataUrl = await blobToDataUrl(blob, mimeType || blob.type)
      await fileContentStore.setItem(fileId, dataUrl)

      const fileMeta = {
        id: fileId,
        parent: parentId,
        name,
        type: 'file',
        mimeType: mimeType || blob.type || getByMimeType(name.split('.').pop()),
        size: blob.size
      }
      await fileMetaCollection.insert(fileMeta)
      await get().refreshFileTree()
      return fileMeta
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('创建文件失败:', err)
      throw err
    } finally {
      set({ loading: false })
    }
  },

  renameFile: async (fileId, newName) => {
    try {
      set({ loading: true, error: null })
      const file = await fileMetaCollection.findOne({ id: fileId })
      if (!file) throw new Error('文件不存在')

      const existed = await fileMetaCollection.findOne({ parent: file.parent, name: newName })
      if (existed) throw new Error(`名称 ${newName} 已存在`)

      await fileMetaCollection.patch({ id: fileId }, { name: newName })
      await get().refreshFileTree()
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('重命名失败:', err)
      return false
    } finally {
      set({ loading: false })
    }
  },

  moveFile: async (fileId, newParentId) => {
    try {
      set({ loading: true, error: null })
      const file = await fileMetaCollection.findOne({ id: fileId })
      if (!file) throw new Error('文件不存在')

      const existed = await fileMetaCollection.findOne({ parent: newParentId, name: file.name })
      if (existed) throw new Error(`目标目录已存在同名文件 ${file.name}`)

      const isSelfChild = await get().isParent(fileId, newParentId)
      if (isSelfChild) throw new Error('不能移动到自身子目录')

      await fileMetaCollection.patch({ id: fileId }, { parent: newParentId })
      await get().refreshFileTree()
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('移动文件失败:', err)
      return false
    } finally {
      set({ loading: false })
    }
  },

  copyFile: async (fileId, newParentId) => {
    try {
      set({ loading: true, error: null })
      const sourceFile = await fileMetaCollection.findOne({ id: fileId })
      if (!sourceFile) throw new Error('源文件不存在')

      await recursiveCopyFile(sourceFile, newParentId)
      await get().refreshFileTree()
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('复制文件失败:', err)
      return false
    } finally {
      set({ loading: false })
    }
  },

  deleteFile: async (fileId) => {
    try {
      set({ loading: true, error: null })
      await recursiveDeleteFile(fileId)
      await get().refreshFileTree()
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('删除文件失败:', err)
      return false
    } finally {
      set({ loading: false })
    }
  },

  refreshFileTree: async () => {
    try {
      const files = await fileMetaCollection.find({})
      const fileTree = getFileTree(files)
      set({ fileTree })
    } catch (err) {
      set({ error: err.message })
      console.error('刷新文件树失败:', err)
    }
  },

  isParent: async (parentId, childId) => {
    let currentFile = await fileMetaCollection.findOne({ id: childId })
    while (currentFile && currentFile.parent !== -1) {
      if (currentFile.parent === parentId) return true
      currentFile = await fileMetaCollection.findOne({ id: currentFile.parent })
    }
    return false
  },

  getFileContent: async (fileId) => {
    return await getFileContent(fileId)
  },

  updateFileContent: async (fileId, content, mimeType) => {
    try {
      set({ loading: true, error: null })
      const result = await updateFileContent(fileId, content, mimeType)
      await get().refreshFileTree()
      return result
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('更新文件内容失败:', err)
      return false
    } finally {
      set({ loading: false })
    }
  },

  clearAllFiles: async () => {
    try {
      set({ loading: true, error: null })
      await fileMetaCollection.clean()
      await fileContentStore.clear()
      await get().refreshFileTree()
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('清空文件失败:', err)
      return false
    } finally {
      set({ loading: false })
    }
  },

  getFilePath,
  getFile: async (fileId) => {
    return await getFile(fileId)
  },

  getJsFiles: async () => {
    try {
      set({ loading: true, error: null })
      const allFiles = await fileMetaCollection.find({ type: 'file' })
      const jsFiles = allFiles.filter(file => {
        return file.name.endsWith('.js') ||
               file.mimeType === 'application/javascript' ||
               file.mimeType === 'text/javascript'
      })
      const jsFilesWithPath = await Promise.all(
        jsFiles.map(async (file) => {
          const path = await getFilePath(file.id)
          return { ...file, path }
        })
      )
      set({ loading: false })
      return jsFilesWithPath
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('获取JS文件失败:', err)
      return []
    }
  },

  getImageFiles: async () => {
    try {
      set({ loading: true, error: null })
      const allFiles = await fileMetaCollection.find({ type: 'file' })
      const imageFiles = allFiles.filter(file =>
        file.mimeType.startsWith('image/')
      )
      const imageFilesWithPath = await Promise.all(
        imageFiles.map(async (file) => {
          const path = await getFilePath(file.id)
          return { ...file, path }
        })
      )
      set({ loading: false })
      return imageFilesWithPath
    } catch (err) {
      set({ error: err.message, loading: false })
      console.error('获取图片文件失败:', err)
      return []
    }
  },

  // ===================== ZIP 相关方法（只做状态管理+调用工具方法） =====================
  /**
   * 导出指定目录为 ZIP（store 只管理状态，逻辑调用工具方法）
   */
  exportDirectoryAsZip: async (dirId, zipName = 'directory-export.zip') => {
    try {
      set({ loading: true, error: null })
      // 调用抽离的工具方法
      await exportDirectoryAsZip(dirId, fileMetaCollection, fileContentStore, getFileTree, zipName)
      set({ loading: false })
      return true
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('导出目录为ZIP失败:', error)
      throw error
    }
  },

  /**
   * 导出整个工作区为 ZIP（store 只管理状态）
   */
  exportAllWorkspace: async (zipName) => {
    try {
      set({ loading: true, error: null })
      // 调用抽离的工具方法
      await exportAllWorkspace(fileMetaCollection, fileContentStore, getFileTree, zipName)
      set({ loading: false })
      return true
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('导出整个工作区失败:', error)
      throw error
    }
  },

  /**
   * 导入 ZIP 到指定目录（store 管理状态，逻辑调用工具方法）
   */
  importZipToDirectory: async (zipFile, targetDirId = -1, overwrite = false) => {
    try {
      set({ loading: true, error: null })
      // 调用抽离的工具方法
      const result = await importZipToDirectory(zipFile, targetDirId, overwrite, fileMetaCollection, fileContentStore)
      // 刷新文件树
      await get().refreshFileTree()
      set({ loading: false })
      return result
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('导入ZIP失败:', error)
      throw error
    }
  },

  /**
   * 清空并导入 ZIP 到工作区（store 管理状态，逻辑调用工具方法）
   */
  importZipToCleanWorkspace: async (zipFile) => {
    try {
      set({ loading: true, error: null })
      // 调用抽离的工具方法
      const result = await importZipToCleanWorkspace(zipFile, fileMetaCollection, fileContentStore)
      // 刷新文件树
      await get().refreshFileTree()
      set({ loading: false })
      return result
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('清空并导入ZIP失败:', error)
      throw error
    }
  }
}))
