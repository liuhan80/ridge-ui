import React from 'react'

import { Button, Tree, Dropdown, Typography, Toast, Upload, Spin, Modal, Space, Divider } from '@douyinfe/semi-ui'
import { ReactComposite } from 'ridgejs'
import context from '../../service/RidgeEditorContext.js'
import { eachNode } from './buildFileTree.js'
import DialogRename from './DialogRename.jsx'
import DialogCreate from './DialogCreate.jsx'
import { stringToBlob } from '../../utils/blob.js'
import IconFileCode from '../../icons/IconFileCode.jsx'
import OuiImport from '../../icons/OuiImport.svg'
import IconFolderAdd from '../../icons/IconFolderAdd.jsx'
import IconPageAdd from '../../icons/IconPageAdd.jsx'
import PajamasClearAll from '../../icons/PajamasClearAll.svg'
import OuiExport from '../../icons/OuiExport.svg'
import IconUpload from '../../icons/IconUpload.jsx'
import { FILE_COMPOSITE, FILE_FOLDER, FILE_IMAGE, FILE_JS, FILE_JSON, FILE_MARKDOWN } from '../../icons/icons.js'
import { STORE_TEMPLATE } from '../../utils/template.js'
import './file-list.less'

const { Text, Paragraph } = Typography

const ACCEPT_FILES = '.svg,.png,.jpg,.json,.css,.js,.md,.webp,.zip,.gif'
class AppFileList extends React.Component {
  constructor () {
    super()
    this.ref = React.createRef()
    this.state = {
      treeData: [],
      selectedNodeKey: null,

      dialgeCreateFileType: '',
      dialogCreateShow: false,
      dialogCreateTitle: '',

      dialogRenameShow: false,

      dialogImportShow: false,
      valueRename: '',

      appJSONObject: null,
      packageEditDialogVisible: false,

      packageSearchDialogVisible: false,

      publishing: false
    }
    context.services.appFileListPanel = this
  }

  componentDidMount () {
    this.loadAndUpdateFileTree()
  }

  async loadAndUpdateFileTree () {
    const { appService } = context.services
    await appService.init()
    await appService.updateAppFileTree()
    const appTreeData = await appService.getAppFileTree()
    const appJSONObject = await appService.getPackageJSONObject()
    this.rebuildTreeIcons(appTreeData)
    this.setState({
      appJSONObject,
      treeData: appTreeData
    })
  }

  rebuildTreeIcons (treeData) {
    this.nodeMap = {}
    // TODO update icons
    eachNode(treeData, file => {
      this.nodeMap[file.id] = file
      if (file.mimeType) {
        if (file.mimeType === 'application/font-woff') {
          file.icon = (<i class='bi bi-fonts' />)
        } else if (file.mimeType.indexOf('audio') > -1) {
          file.icon = (<i class='bi bi-file-earmark-music' />)
        } else if (file.mimeType.indexOf('image') > -1) {
          file.icon = FILE_IMAGE /* (<IconImage style={{ color: 'var(--semi-color-text-2)' }} />) */
        } else {
          file.icon = <i class='bi bi-file-earmark' />
        }
      }

      if (file.label.endsWith('.svg')) {
        file.icon = FILE_IMAGE
      }
      if (file.label.endsWith('.md')) {
        file.icon = FILE_MARKDOWN
      }
      if (file.label.endsWith('.js')) {
        file.icon = FILE_JS
      }
      if (file.label.endsWith('.json')) {
        file.icon = FILE_JSON
      }
      if (file.type === 'page') {
        file.icon = FILE_COMPOSITE
      }
      if (file.type === 'directory') {
        file.icon = FILE_FOLDER
      }
    })
  }

  // computed
  getCurrentSiblingNames () {
    const { selectedNodeKey, treeData } = this.state
    let siblings = []
    if (selectedNodeKey) {
      const node = this.nodeMap[selectedNodeKey]
      siblings = node.parent === -1 ? treeData : node.parentNode.children
    } else {
      siblings = treeData
    }
    return siblings.map(node => node.label)
  }

  getCurrentPath () {
    const { selectedNodeKey } = this.state
    if (selectedNodeKey) {
      const node = this.nodeMap[selectedNodeKey]
      if (node.type === 'directory') {
        return node.path
      } else if (node.parentNode) {
        return node.parentNode.path
      } else {
        return '/'
      }
    } else {
      return '/'
    }
  }

  getCurrentParentId () {
    const { selectedNodeKey } = this.state
    if (selectedNodeKey) {
      const node = this.nodeMap[selectedNodeKey]
      if (node.type === 'directory') {
        return node.key
      } else {
        return node.parent
      }
    } else {
      return -1
    }
  }

  openSearchPackageDialog = () => {
    this.setState({
      packageSearchDialogVisible: true
    })
  }

  showCreateDialog = fileType => {
    const titles = {
      js: '创建程序文件',
      page: '创建页面',
      text: '创建文本文件',
      folder: '创建目录'
    }
    this.setState({
      dialgeCreateFileType: fileType,
      dialogCreateShow: true,
      dialogCreateTitle: titles[fileType]
    })
  }

  onCreateConfirm = async name => {
    const { dialgeCreateFileType } = this.state
    const { appService } = context.services
    try {
      if (dialgeCreateFileType === 'page') {
        await appService.createComposite(this.getCurrentParentId(), name)
      } else if (dialgeCreateFileType === 'folder') {
        await appService.createDirectory(this.getCurrentParentId(), name)
      } else if (dialgeCreateFileType === 'js') {
        await appService.createFile(this.getCurrentParentId(), name, stringToBlob(STORE_TEMPLATE, 'text/javascript'))
      } else if (dialgeCreateFileType === 'text') {
        await appService.createFile(this.getCurrentParentId(), name, stringToBlob('', 'text/plain'))
      }
      this.setState({
        dialogCreateShow: false
      })
      Toast.success('已经成功创建 ' + name)
      await this.loadAndUpdateFileTree()
    } catch (e) {
      Toast.success('创建文件失败 ' + e)
    }
  }

  onFileUpload = async (files) => {
    const { appService } = context.services
    const errors = []
    for (const file of files) {
      try {
        if (file.name.endsWith('.zip')) {
          await appService.backUpService.importFolderArchive(file, this.getCurrentPath())
        } else {
          const result = await appService.createFile(this.getCurrentParentId(), file.name, file)
        }
      } catch (e) {
        errors.push(file)
      }
    }
    await this.loadAndUpdateFileTree()
    if (errors.length) {
      Toast.warning({
        content: '文件添加错误：存在相同名称文件',
        duration: 3
      })
    } else {
      Toast.success('文件上传完成')
    }
  }

  onRenameConfirm = async () => {
    const { appService } = context.services
    const { selectedNodeKey, valueRename } = this.state

    const result = await appService.rename(selectedNodeKey, valueRename)

    context.onFileRenamed(selectedNodeKey, valueRename)
    if (result) {
      await this.loadAndUpdateFileTree()
      this.setState({
        dialogRenameShow: false
      })
    }
  }

  onRemoveClicked = async data => {
    const openedFileMap = context.getOpenedFileMap()

    if (openedFileMap.has(data.id)) {
      Toast.warning('此页面在工作区已经打开，请先关闭再删除页面')
      return
    }

    Modal.confirm({
      zIndex: 10001,
      title: '确认删除',
      content: '删除后文件无法找回，推荐您可先通过导出进行备份',
      onOk: async () => {
        const { appService } = context.services
        await appService.deleteFile(data.key)
        this.setState({
          selectedNodeKey: null
        })
        this.loadAndUpdateFileTree()
        Toast.success('已经成功删除 ' + data.label)
      }
    })
  }

  onCopyClicked = async node => {
    const { appService } = context.services
    await appService.copy(node.key)
    this.loadAndUpdateFileTree()
    Toast.success('文件复制完成')
  }

  onOpenClicked = node => {
    if (node.type !== 'directory') {
      context.openFile(node.key)
    }
  }

  onRenameClicked = node => {
    this.setState({
      selectedNodeKey: node.key,
      dialogRenameShow: true,
      valueRename: node.label
    })
  }

  move = async (node, dragNode, dropToGap) => {
    let parentId = -1

    if (dropToGap === false) { // 放置于node内
      if (node.type === 'directory') {
        parentId = node.key
      } else {
        parentId = node.parent
      }
    } else {
      parentId = node.parent
    }
    const { appService } = context.services
    const moveResult = await appService.move(dragNode.key, parentId)
    if (moveResult) {
      await this.loadAndUpdateFileTree()
    } else {
      Toast.warning({
        content: '目录移动错误：存在同名的文件',
        duration: 3
      })
    }
  }

  onUploadAppArchive = async file => {
    const { appService } = context.services
    await appService.importAppArchive(file)
  }

  onFileExportClick = data => {
    const { appService } = context.services
    appService.exportFileArchive(data.key)
  }

  async exportApp () {
    if (this.state.exportToastId) {
      return
    }
    const id = Toast.info({
      content: '正在导出应用，请稍侯...',
      duration: 0,
      onClose: () => {
        this.setState({
          exportToastId: null
        })
      }
    })
    this.setState({
      exportToastId: id
    })
    const { appService } = context.services
    await appService.exportAppArchive()
    Toast.close(id)
    this.setState({
      exportToastId: null
    })
  }

  newEmptyApp = () => {
    Modal.confirm({
      title: '新增应用',
      content: '确认新增应用？ 现有工作区间内容将会被清除。如果需要内容，您可以先整体导出应用内容',
      onOk: () => {
        const { appService } = context.services
        appService.reset()
      }
    })
  }

  renderFullLabel = (label, data) => {
    const { currentOpenId } = this.state
    const MORE_MENUS = []

    // if (data.type === 'page') {
    MORE_MENUS.push(
      <Dropdown.Item
        key='open'
        icon={<i class='bi bi-pencil-square' />} onClick={() => {
          this.onOpenClicked(data)
        }}
      >打开
      </Dropdown.Item>
    )
    MORE_MENUS.push(
      <Dropdown.Item
        key='copy'
        icon={<i class='bi bi-copy' />} onClick={() => {
          this.onCopyClicked(data)
        }}
      >复制
      </Dropdown.Item>
    )
    // }
    MORE_MENUS.push(
      <Dropdown.Item
        key='export'
        icon={<i style={{ fontSize: '16px' }} class='bi bi-file-zip' />} onClick={() => {
          this.onFileExportClick(data)
        }}
      >导出
      </Dropdown.Item>
    )
    MORE_MENUS.push(
      <Dropdown.Item
        key='rename'
        icon={<i class='bi bi-pencil' />} onClick={() => {
          this.onRenameClicked(data)
        }}
      >重命名
      </Dropdown.Item>
    )
    MORE_MENUS.push(<Dropdown.Divider key='div' />)
    MORE_MENUS.push(
      <Dropdown.Item
        key='delete'
        type='danger'
        icon={<i class='bi bi-trash3' />}
        onClick={() => {
          this.onRemoveClicked(data)
        }}
      >删除
      </Dropdown.Item>
    )
    return (
      <div className={'tree-label' + (currentOpenId === data.key ? ' opened' : '')}>
        <Text ellipsis={{ showTooltip: true }} style={{ width: 'calc(100% - 48px)' }} className='label-content'>{label}</Text>
        <Dropdown
          className='app-files-dropdown'
          trigger='click'
          clickToHide
          render={<Dropdown.Menu>{MORE_MENUS}</Dropdown.Menu>}
        >
          <Button className='more-button' size='small' theme='borderless' type='tertiary' icon={<i class='bi bi-three-dots-vertical' />} />
        </Dropdown>
      </div>
    )
  }


  RenderAppImportDialog = () => {
    const { dialogImportShow } = this.state
    return (
      <Modal
        width={560}
        title='导入/导出项目'
        visible={dialogImportShow}
        okText='关闭'
        hasCancel={false}
        onCancel={() => {
          this.setState({
            dialogImportShow: false
          })
        }}
        onOk={() => {
          this.setState({
            dialogImportShow: false
          })
        }}
      >
        <Paragraph>项目整体导入</Paragraph>
        <Text type='danger'>选择导入后，现有工作目录会被替换，建议先通过导出方式提前备份</Text>
        <Space style={{
          padding: '10px 0'
        }}
        >
          <Upload
            action='none' showUploadList={false} uploadTrigger='custom' accept='.zip' onFileChange={async files => {
              await this.onUploadAppArchive(files[0])
              window.location.reload()
            }}
          >
            <Button theme='light'>
              选择项目文件(zip)
            </Button>
          </Upload>
        </Space>

        <Paragraph>导出为压缩文件</Paragraph>
        <Space style={{
          padding: '10px 0'
        }}
        >
          <Button
            theme='light' onClick={() => {
              this.exportApp()
            }}
          >
            导出
          </Button>
        </Space>
      </Modal>
    )
  }

  RenderCreateDropDown = () => {
    const { showCreateDialog, newEmptyApp } = this
    return (
      <Dropdown
        trigger='click'
        closeOnEsc
        clickToHide
        keepDOM
        position='bottomLeft'
        render={
          <Dropdown.Menu className='app-files-dropdown'>
            <Dropdown.Item icon={<IconPageAdd />} onClick={() => showCreateDialog('page')}>创建页面</Dropdown.Item>
            <Dropdown.Item icon={<IconFolderAdd />} onClick={() => showCreateDialog('folder')}>创建目录</Dropdown.Item>
            <Dropdown.Item icon={<IconFileCode />} onClick={() => showCreateDialog('js')}>创建脚本库</Dropdown.Item>
            <Dropdown.Item icon={<IconUpload />}>
              <Upload
                action='none'
                multiple showUploadList={false} uploadTrigger='custom' onFileChange={files => {
                  this.onFileUpload(files)
                }} accept={ACCEPT_FILES}
              >
                上传文件
              </Upload>
            </Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown.Menu>
            }
      >
        <Button theme='borderless' type='tertiary' icon={<i class='bi bi-plus-lg' style={{ color: 'var(--semi-color-text-0)' }} />} />
      </Dropdown>
    )
  }

  render () {
    const { renderFullLabel, state, RenderCreateDropDown, RenderAppImportDialog } = this
    const { treeData, dialogCreateShow, dialogCreateTitle, dialogRenameShow, valueRename } = state

    return (
      <>
        <div className='file-actions panel-actions'>
          <RenderCreateDropDown />
          <Button onClick={() => {
            this.setState({
              dialogImportShow: true
            })
          }}
          >导入/导出
          </Button>
          <RenderAppImportDialog />
        </div>
        <DialogCreate
          show={dialogCreateShow}
          title={dialogCreateTitle}
          parentPaths={this.getCurrentPath()}
          siblingNames={this.getCurrentSiblingNames()}
          confirm={val => {
            this.onCreateConfirm(val)
          }}
          cancel={() => {
            this.setState({
              dialogCreateShow: false
            })
          }}
        />
        <DialogRename
          show={dialogRenameShow} value={valueRename} siblingNames={this.getCurrentSiblingNames()} change={val => {
            this.setState({
              valueRename: val
            })
          }} confirm={() => {
            this.onRenameConfirm()
          }}
          cancel={() => {
            this.setState({
              dialogRenameShow: false
            })
          }}
        />
        {treeData &&
          <Tree
            className='file-tree'
            showFilteredOnly
            filterTreeNode
            draggable
            renderLabel={renderFullLabel}
            treeData={treeData}
            onDragStart={(target) => {
              if (target.node && target.node.type === 'page') {
                context.draggingComposite = target.node
              } else {
                context.draggingComposite = null
              }
            }}
            onDrop={({ node, dragNode, dropPosition, dropToGap }) => {
              this.move(node, dragNode, dropToGap)
            }}
            onDoubleClick={(ev, node) => {
              this.onOpenClicked(node)
            }}
            onChange={key => {
              this.setState({
                selectedNodeKey: key
              })
            }}
          />}
        {!treeData && <div className='tree-loading'><Spin size='middle' /></div>}
        {/* {this.renderAppDropDown()} */}
      </>
    )
  }
}

export default AppFileList
