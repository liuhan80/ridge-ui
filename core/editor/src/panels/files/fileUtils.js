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
