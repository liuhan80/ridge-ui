// src/components/FileActionDropdown.jsx
import React, { useCallback } from 'react'
import { Dropdown, Button, Upload, Modal, Toast } from '@douyinfe/semi-ui'
import { ACCEPT_FILES, TOAST_MESSAGES, CREATE_FILE_TITLES } from './fileConstants'
import { refreshTreeWithExpanded, getParentId } from './fileUtils'
import IconFileCode from '../../icons/IconFileCode.jsx'
import IconFolderAdd from '../../icons/IconFolderAdd.jsx'
import IconPageAdd from '../../icons/IconPageAdd.jsx'
import IconUpload from '../../icons/IconUpload.jsx'
import OuiExport from '../../icons/OuiExport.svg' // 补充缺失的导入
import { GravityUiGear } from '../../icons/GravityUiGear.jsx' // 补充缺失的导入

// 创建文件下拉菜单
export const CreateFileDropdown = ({
  showCreateDialog,
  onCreateConfirm, // 接收主文件传递的创建确认方法
  createDirectory,
  createFile,
  refreshFileTree,
  expandedKeys,
  setExpandedKeys,
  nodeMap,
  selectedNodeKey
}) => {
  // 上传文件逻辑
  const onFileUpload = useCallback(async (files) => {
    try {
      const errors = []
      const parentId = getParentId(nodeMap, selectedNodeKey)

      for (const file of files) {
        try {
          if (file.name.endsWith('.zip')) {
            Toast.warning(TOAST_MESSAGES.uploadZipWarn)
            errors.push(file)
          } else {
            await createFile(parentId, file.name, file, file.type)
          }
        } catch (e) {
          errors.push(file)
        }
      }

      await refreshTreeWithExpanded(refreshFileTree, expandedKeys, setExpandedKeys)

      if (errors.length) {
        Toast.warning({ content: TOAST_MESSAGES.uploadError, duration: 3 })
      } else {
        Toast.success(TOAST_MESSAGES.uploadSuccess)
      }
    } catch (e) {
      Toast.error(TOAST_MESSAGES.uploadFail(e))
    }
  }, [createFile, refreshFileTree, nodeMap, selectedNodeKey, expandedKeys, setExpandedKeys])

  return (
    <Dropdown
      trigger='click'
      closeOnEsc
      clickToHide
      keepDOM
      position='bottomLeft'
      render={
        <Dropdown.Menu className='app-files-dropdown'>
          <Dropdown.Item
            icon={<IconPageAdd />}
            onClick={() => showCreateDialog('page')}
          >
            创建页面
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IconFolderAdd />}
            onClick={() => showCreateDialog('folder')}
          >
            创建目录
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IconFileCode />}
            onClick={() => showCreateDialog('js')}
          >
            创建脚本库
          </Dropdown.Item>
          <Dropdown.Item icon={<IconUpload />}>
            <Upload
              action='none'
              multiple
              showUploadList={false}
              uploadTrigger='custom'
              onFileChange={onFileUpload}
              accept={ACCEPT_FILES}
            >
              上传文件
            </Upload>
          </Dropdown.Item>
          <Dropdown.Divider />
        </Dropdown.Menu>
      }
    >
      <Button
        theme='borderless'
        type='tertiary'
        icon={<i className='bi bi-plus-lg' style={{ color: 'var(--semi-color-text-0)' }} />}
      />
    </Dropdown>
  )
}

// 应用导入/导出/重置下拉菜单
export const AppActionDropdown = ({
  clearAllFiles,
  exportAllWorkspace,
  refreshFileTree,
  setExpandedKeys
}) => {
  // 导出应用
  const exportApp = async () => {
    const id = Toast.info({
      content: TOAST_MESSAGES.exportLoading,
      duration: 0,
      onClose: () => null
    })

    try {
      await exportAllWorkspace()
      Toast.success(TOAST_MESSAGES.exportSuccess)
    } catch (e) {
      Toast.error(TOAST_MESSAGES.exportFail(e))
    } finally {
      Toast.close(id)
    }
  }

  // 导入应用
  const onUploadAppArchive = async (file) => {
    try {
      Toast.success(TOAST_MESSAGES.importSuccess)
    } catch (e) {
      Toast.error(TOAST_MESSAGES.importFail(e))
    }
  }

  const importApp = async (files) => {
    Modal.confirm({
      title: '确认导入',
      content: '选择导入后，现有工作目录会被替换，建议先通过导出方式提前备份',
      onOk: async () => await onUploadAppArchive(files[0])
    })
  }

  const resetApp = async () => {
    Modal.confirm({
      title: '重置',
      content: '此操作会清空所有目录和文件，是否确认？',
      onOk: async () => {
        await clearAllFiles()
        await refreshFileTree()
        setExpandedKeys([])
      }
    })
  }

  return (
    <Dropdown
      trigger='click'
      position='bottomRight'
      clickToHide
      render={
        <Dropdown.Menu>
          <Dropdown.Item>
            <Upload
              action='none'
              showUploadList={false}
              uploadTrigger='custom'
              accept='.zip'
              onFileChange={importApp}
            >
              导入项目(zip)
            </Upload>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={exportApp}
            icon={<OuiExport style={{ marginRight: 8, width: '16px', height: '14px' }} />}
          >
            导出项目
          </Dropdown.Item>
          <Dropdown.Item onClick={resetApp}>
            清空项目
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button icon={<GravityUiGear />} theme='borderless' type='tertiary' />
    </Dropdown>
  )
}
