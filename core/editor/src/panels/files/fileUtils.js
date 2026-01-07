// src/utils/fileUtils.js
import { TOAST_MESSAGES, ROOT_NODE_ID, FILE_ICON_MAP, FILE_SUFFIX_ICON_MAP, FILE_TYPE_ICON_MAP } from './fileConstants'
import { eachNode } from './buildFileTree.js'
import { Toast } from '@douyinfe/semi-ui'

// 节点存在性校验
export const validateNode = (nodeMap, nodeId) => {
  if (!nodeId || !nodeMap.current[nodeId]) {
    Toast.error(TOAST_MESSAGES.renameNoNode)
    return false
  }
  return true
}

// 获取父节点ID
export const getParentId = (nodeMap, selectedNodeKey) => {
  if (!selectedNodeKey) return ROOT_NODE_ID
  const node = nodeMap.current[selectedNodeKey]
  if (!node) return ROOT_NODE_ID
  return node.type === 'directory' ? node.id : (node.parent ?? ROOT_NODE_ID)
}

// 获取同级节点名称
export const getSiblingNames = (fileTree, nodeMap, selectedNodeKey) => {
  if (!selectedNodeKey || !fileTree) return []
  const node = nodeMap.current[selectedNodeKey]
  if (!node) return []

  const findSiblings = (tree, parentId) => {
    const siblings = []
    eachNode(tree, item => {
      if (item.parent === parentId) siblings.push(item)
    })
    return siblings
  }

  const parentId = node.parent ?? ROOT_NODE_ID
  const siblings = findSiblings(fileTree, parentId)
  return siblings.map(node => node.name)
}

// 处理树节点（添加图标、key、label）
export const processTreeNodes = (fileTree, nodeMap) => {
  if (!fileTree) return
  nodeMap.current = {}
  eachNode([...fileTree], file => {
    nodeMap.current[file.id] = file
    file.label = file.name
    file.key = file.id

    // 图标逻辑
    if (file.mimeType) {
      if (file.mimeType.includes('audio')) {
        file.icon = FILE_ICON_MAP.audio
      } else if (file.mimeType.includes('image')) {
        file.icon = FILE_ICON_MAP.image
      } else {
        file.icon = FILE_ICON_MAP[file.mimeType] || FILE_ICON_MAP.default
      }
    }

    // 后缀优先级高于mimeType
    Object.entries(FILE_SUFFIX_ICON_MAP).forEach(([suffix, icon]) => {
      if (file.name.endsWith(suffix)) file.icon = icon
    })

    // 类型优先级最高
    if (FILE_TYPE_ICON_MAP[file.type]) {
      file.icon = FILE_TYPE_ICON_MAP[file.type]
    }
  })
}

// 获取节点路径
export const getNodePath = async (node, getFilePath) => {
  try {
    let path = '/'
    if (node.type === 'directory') {
      path = await getFilePath(node.id) || '/'
    } else if (node.parentNode) {
      path = await getFilePath(node.parentNode.id) || '/'
    } else if (node.parent) {
      path = await getFilePath(node.parent) || '/'
    }
    return path
  } catch (e) {
    console.error('获取路径失败:', e)
    return '/'
  }
}

// 检查是否为子节点（移动逻辑用）
export const isChildNode = (parent, childId) => {
  if (!parent?.children) return false
  return parent.children.some(child => {
    if (child.id === childId) return true
    return isChildNode(child, childId)
  })
}

// 刷新树并保持展开状态
export const refreshTreeWithExpanded = async (refreshFileTree, expandedKeys, setExpandedKeys) => {
  const currentExpanded = [...expandedKeys]
  await refreshFileTree()
  setTimeout(() => setExpandedKeys(currentExpanded), 0)
}

/**
 * 验证文件名是否有效（兼容 Windows/macOS/Linux 及通用规范）
 * @param {string} fileName - 待验证的文件名（不含路径，仅文件名部分）
 * @returns {{ valid: boolean, message?: string }} 验证结果（是否有效 + 错误原因）
 */
export function isValidFileName (fileName) {
  // 基础检查：不能为空或纯空白
  if (typeof fileName !== 'string') {
    return { valid: false, message: '文件名必须是字符串' }
  }
  const trimmed = fileName.trim()
  if (trimmed === '') {
    return { valid: false, message: '文件名不能为空或纯空白' }
  }

  // 检查长度（Windows 最大 255 字符，含扩展名；这里取保守值）
  if (fileName.length > 255) {
    return { valid: false, message: '文件名过长（最大支持 255 个字符）' }
  }

  // 检查首尾字符（禁止空格、点号开头/结尾）
  if (/^\s|\s$/.test(fileName)) {
    return { valid: false, message: '文件名不能以空格开头或结尾' }
  }
  if (/^\.|\.$/.test(fileName)) {
    return { valid: false, message: '文件名不能以点号开头或结尾' }
  }

  // 检查非法字符（Windows/macOS/Linux 通用禁止字符）
  const illegalChars = /[\\/:*?"<>|]/ // Windows 严格禁止；macOS/Linux 也建议避免
  if (illegalChars.test(fileName)) {
    return { valid: false, message: '文件名包含非法字符（如 \\ / : * ? " < > |）' }
  }

  // 可选：检查保留名称（Windows 特有，如 CON、PRN、AUX 等）
  const reservedNames = [
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
  ]
  const baseName = trimmed.split('.')[0].toUpperCase() // 取主名（无扩展名）
  if (reservedNames.includes(baseName)) {
    return { valid: false, message: `文件名使用了系统保留名称（如 ${baseName}）` }
  }

  // 所有检查通过
  return { valid: true }
}
