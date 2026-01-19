import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button, Tree, Dropdown, Typography, Toast, Spin, Modal } from '@douyinfe/semi-ui'
import { useFileTreeStore } from '../../service/fileManager.js'
import DialogRename from './DialogRename.jsx'
import DialogCreate from './DialogCreate.jsx'
import { CreateFileDropdown, AppActionDropdown } from './FileActionDropdown.jsx'
import { ACCEPT_FILES, CREATE_FILE_TITLES, TOAST_MESSAGES, ROOT_NODE_ID } from './fileConstants'
import { stringToBlob } from '../../utils/blob.js'
import { STORE_TEMPLATE, PAGE_JSON_TEMPLATE } from '../../utils/template.js'

import context from '../../service/RidgeEditorContext.js'
import {
  validateNode,
  getParentId,
  getSiblingNames,
  processTreeNodes,
  getNodePath,
  isChildNode,
  refreshTreeWithExpanded
} from './fileUtils'
import './file-list.less'

const { Text } = Typography

const AppFileList = () => {
  // 基础状态
  const [selectedNodeKey, setSelectedNodeKey] = useState(null)
  const [dialogCreateFileType, setDialogCreateFileType] = useState('')
  const [dialogCreateShow, setDialogCreateShow] = useState(false)
  const [dialogCreateTitle, setDialogCreateTitle] = useState('')
  const [dialogRenameShow, setDialogRenameShow] = useState(false)
  const [valueRename, setValueRename] = useState('')
  const [currentOpenId, setCurrentOpenId] = useState(null)
  const [currentPath, setCurrentPath] = useState('/')
  const [expandedKeys, setExpandedKeys] = useState([])

  const nodeMap = useRef({})
  const treeRef = useRef(null)

  // Store 方法和状态
  const {
    initFileTree,
    refreshFileTree,
    createDirectory,
    createFile,
    renameFile,
    deleteFile,
    copyFile,
    moveFile,
    clearAllFiles,
    getFilePath,
    fileTree,
    exportAllWorkspace,
    exportDirectoryAsZip,
    importZipToDirectory,
    importZipToCleanWorkspace,
    loading: storeLoading
  } = useFileTreeStore()

  // 初始化
  useEffect(() => {
    const init = async () => {
      await initFileTree()
      await refreshFileTree()
    }
    init()
  }, [initFileTree, refreshFileTree])

  // 更新nodeMap和树节点
  useEffect(() => {
    processTreeNodes(fileTree, nodeMap)
  }, [fileTree])

  // 获取当前路径
  useEffect(() => {
    const fetchCurrentPath = async () => {
      if (!selectedNodeKey) {
        setCurrentPath('/')
        return
      }

      const node = nodeMap.current[selectedNodeKey]
      if (!node) {
        setCurrentPath('/')
        setSelectedNodeKey(null)
        return
      }

      const path = await getNodePath(node, getFilePath)
      setCurrentPath(path)
    }
    fetchCurrentPath()
  }, [selectedNodeKey, getFilePath, fileTree])

  // 显示创建文件弹窗
  const showCreateDialog = useCallback((fileType) => {
    setDialogCreateFileType(fileType)
    setDialogCreateShow(true)
    setDialogCreateTitle(CREATE_FILE_TITLES[fileType])
  }, [])

  // 重新定义：确认创建文件（核心修正）
  const onCreateConfirm = async (name, fileType) => {
    try {
      const parentId = getParentId(nodeMap, selectedNodeKey)
      if (fileType === 'page') {
        const blob = stringToBlob(PAGE_JSON_TEMPLATE, 'text/json')
        await createFile(parentId, name, blob, 'text/json')
      } else if (fileType === 'folder') {
        await createDirectory(parentId, name)
      } else if (fileType === 'js') {
        const blob = stringToBlob(STORE_TEMPLATE, 'text/javascript')
        await createFile(parentId, name, blob, 'text/javascript')
      } else if (fileType === 'text') {
        const blob = stringToBlob('', 'text/plain')
        await createFile(parentId, name, blob, 'text/plain')
      }

      Toast.success(TOAST_MESSAGES.createSuccess(name))
      await refreshTreeWithExpanded(refreshFileTree, expandedKeys, setExpandedKeys)
      setDialogCreateShow(false)
    } catch (e) {
      Toast.error(TOAST_MESSAGES.createFail(e))
    }
  }

  // 确认重命名
  const onRenameConfirm = useCallback(async () => {
    if (!validateNode(nodeMap, selectedNodeKey)) {
      setDialogRenameShow(false)
      return
    }

    try {
      const result = await renameFile(selectedNodeKey, valueRename)
      if (result) {
        await refreshTreeWithExpanded(refreshFileTree, expandedKeys, setExpandedKeys)
        setDialogRenameShow(false)
        Toast.success(TOAST_MESSAGES.renameSuccess)
      } else {
        Toast.error(TOAST_MESSAGES.renameDuplicate)
      }
    } catch (e) {
      Toast.error(TOAST_MESSAGES.renameFail(e))
    }
  }, [renameFile, selectedNodeKey, valueRename, refreshFileTree, expandedKeys, setExpandedKeys])

  // 删除文件/目录
  const onRemoveClicked = useCallback(async (data) => {
    if (!validateNode(nodeMap, data?.id)) return

    const isOpened = currentOpenId === data.id
    if (isOpened) {
      Toast.warning(TOAST_MESSAGES.deleteOpened)
      return
    }

    Modal.confirm({
      zIndex: 10001,
      title: '确认删除',
      content: '删除后文件无法找回，推荐您可先通过导出进行备份',
      onOk: async () => {
        try {
          const result = await deleteFile(data.id)
          if (result) {
            setSelectedNodeKey(null)
            await refreshTreeWithExpanded(
              refreshFileTree,
              expandedKeys.filter(key => key !== data.id),
              setExpandedKeys
            )
            Toast.success(TOAST_MESSAGES.deleteSuccess(data.name))
          } else {
            Toast.error(TOAST_MESSAGES.deleteFail('删除失败'))
          }
        } catch (e) {
          Toast.error(TOAST_MESSAGES.deleteFail(e))
        }
      }
    })
  }, [deleteFile, refreshFileTree, expandedKeys, setExpandedKeys, currentOpenId])

  // 复制文件
  const onCopyClicked = useCallback(async (node) => {
    if (!node || !node.id) {
      Toast.error(TOAST_MESSAGES.copyNoNode)
      return
    }

    try {
      const parentId = getParentId(nodeMap, selectedNodeKey)
      await copyFile(node.id, parentId)
      await refreshTreeWithExpanded(refreshFileTree, expandedKeys, setExpandedKeys)
      Toast.success(TOAST_MESSAGES.copySuccess)
    } catch (e) {
      Toast.error(TOAST_MESSAGES.copyFail(e))
    }
  }, [copyFile, refreshFileTree, nodeMap, selectedNodeKey, expandedKeys, setExpandedKeys])

  // 打开文件
  const onOpenClicked = useCallback((node) => {
    if (node.type !== 'directory') {
      const opened = context.openFile(node.key)
      if (opened) {
        setCurrentOpenId(node.id)
      }
    }
  }, [])

  // 重命名文件
  const onRenameClicked = useCallback((node) => {
    if (!validateNode(nodeMap, node?.id)) return
    setSelectedNodeKey(node.id)
    setDialogRenameShow(true)
    setValueRename(node.name)
  }, [])

  // 移动文件/目录
  const move = async (dropInfo) => {
    try {
      if (!dropInfo) {
        Toast.error(TOAST_MESSAGES.moveNoInfo)
        return
      }
      const { node: targetNode, dragNode, dropToGap } = dropInfo
      if (!targetNode?.id || !dragNode?.id) {
        Toast.error(TOAST_MESSAGES.moveNoId)
        return
      }

      // 禁止自我移动/循环移动
      if (dragNode.id === targetNode.id) {
        Toast.warning(TOAST_MESSAGES.moveSelf)
        return
      }
      if (isChildNode(targetNode, dragNode.id)) {
        Toast.warning(TOAST_MESSAGES.moveChild)
        return
      }

      // 计算目标父节点ID
      let parentId = ROOT_NODE_ID
      if (dropToGap === false) {
        parentId = targetNode.type === 'directory'
          ? targetNode.id
          : (targetNode.parent ?? ROOT_NODE_ID)
      } else {
        parentId = targetNode.parent ?? ROOT_NODE_ID
      }

      // 禁止根目录移动
      if (dragNode.parent === ROOT_NODE_ID && parentId === ROOT_NODE_ID) {
        Toast.warning(TOAST_MESSAGES.moveRoot)
        return
      }

      // 执行移动
      const moveResult = await moveFile(dragNode.id, parentId)
      if (moveResult) {
        await refreshTreeWithExpanded(refreshFileTree, expandedKeys, setExpandedKeys)
        Toast.success(TOAST_MESSAGES.moveSuccess)
      } else {
        Toast.warning(TOAST_MESSAGES.moveDuplicate)
      }
    } catch (e) {
      console.error('移动文件详细错误：', e)
      Toast.error(TOAST_MESSAGES.moveFail(e))
    }
  }

  // 渲染节点标签
  const renderFullLabel = useCallback((label, data) => {
    const MORE_MENUS = [
      data.type !== 'directory'
        ? <Dropdown.Item key='open' icon={<i className='bi bi-pencil-square' />} onClick={() => onOpenClicked(data)}> 打开 </Dropdown.Item>
        : null,
      <Dropdown.Item key='copy' icon={<i className='bi bi-copy' />} onClick={() => onCopyClicked(data)}>
        复制
      </Dropdown.Item>,
      data.type === 'directory'
        ? <Dropdown.Item
            key='export' icon={<i style={{ fontSize: '16px' }} className='bi bi-file-zip' />} onClick={() => {
              exportDirectoryAsZip(data.id, data.name + '.zip')
            }}
          >
          导出
        </Dropdown.Item>
        : null,
      <Dropdown.Item key='rename' icon={<i className='bi bi-pencil' />} onClick={() => onRenameClicked(data)}>
        重命名
      </Dropdown.Item>,
      <Dropdown.Divider key='div' />,
      <Dropdown.Item key='delete' type='danger' icon={<i className='bi bi-trash3' />} onClick={() => onRemoveClicked(data)}>
        删除
      </Dropdown.Item>
    ].filter(n => n)

    return (
      <div className={`tree-label ${currentOpenId === data.id ? ' opened' : ''}`}>
        <Text
          ellipsis={{ showTooltip: true }}
          style={{ width: 'calc(100% - 48px)' }}
          className='label-content'
        >
          {label}
        </Text>
        <Dropdown
          className='app-files-dropdown'
          trigger='click'
          clickToHide
          render={<Dropdown.Menu>{MORE_MENUS}</Dropdown.Menu>}
        >
          <Button
            className='more-button'
            size='small'
            theme='borderless'
            type='tertiary'
            icon={<i className='bi bi-three-dots-vertical' />}
          />
        </Dropdown>
      </div>
    )
  }, [onOpenClicked, onCopyClicked, onRenameClicked, onRemoveClicked, currentOpenId])

  // 处理后的文件树
  const processedTree = fileTree ?? []

  // 渲染组件
  return (
    <>
      <div className='file-actions panel-actions'>
        <CreateFileDropdown
          showCreateDialog={showCreateDialog}
          onCreateConfirm={onCreateConfirm} // 传递创建确认方法
          createDirectory={createDirectory}
          createFile={createFile}
          refreshFileTree={refreshFileTree}
          expandedKeys={expandedKeys}
          setExpandedKeys={setExpandedKeys}
          nodeMap={nodeMap}
          selectedNodeKey={selectedNodeKey}
        />
        <AppActionDropdown
          importFileToWorkSpace={importZipToCleanWorkspace}
          exportAllWorkspace={exportAllWorkspace}
          clearAllFiles={clearAllFiles}
          refreshFileTree={refreshFileTree}
          setExpandedKeys={setExpandedKeys}
        />
      </div>

      <DialogCreate
        show={dialogCreateShow}
        title={dialogCreateTitle}
        parentPaths={currentPath}
        siblingNames={getSiblingNames(fileTree, nodeMap, selectedNodeKey)}
        confirm={(name) => onCreateConfirm(name, dialogCreateFileType)} // 修正：直接调用
        cancel={() => setDialogCreateShow(false)}
      />

      <DialogRename
        show={dialogRenameShow}
        value={valueRename}
        siblingNames={getSiblingNames(fileTree, nodeMap, selectedNodeKey)}
        change={(val) => setValueRename(val)}
        confirm={onRenameConfirm}
        cancel={() => setDialogRenameShow(false)}
      />

      {storeLoading
        ? <div className='tree-loading'><Spin size='middle' /></div>
        : processedTree.length > 0
          ? (
            <Tree
              ref={treeRef}
              className='file-tree'
              showFilteredOnly
              filterTreeNode
              draggable
              renderLabel={renderFullLabel}
              treeData={processedTree}
              expandedKeys={expandedKeys}
              onExpand={setExpandedKeys}
              checkable={false}
              multiple={false}
              onDoubleClick={(ev, node) => {
                onOpenClicked(node)
              }}
              onSelect={(keys) => {
                const selectedKey = Array.isArray(keys) ? (keys[0] || null) : (keys || null)
                setSelectedNodeKey(selectedKey)
              }}
              selectedKeys={selectedNodeKey ? [selectedNodeKey] : []}
              onDrop={move}
            />
            )
          : (
            <div className='empty-tree'>
              <Text className='empty-text'>暂无文件，请创建或上传文件</Text>
              <Button onClick={() => showCreateDialog('folder')} type='primary' size='small' style={{ marginTop: 8 }}>
                创建目录
              </Button>
            </div>
            )}
    </>
  )
}

export default AppFileList
