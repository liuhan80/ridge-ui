import React from 'react'
import { Spin, ImagePreview, Modal, Toast } from '@douyinfe/semi-ui'
import ConfigPanel from './panels/config/index.jsx'
import RightBottomPanel from './panels/outline/index.jsx'
import ComponentPanel from './panels/component/index.jsx'
import LeftBottomPanel from './panels/files/index.jsx'
import DialogCodeEdit from './panels/files/DialogCodeEdit.jsx'
import EditMenuBar from './panels/menu/EditMenuBar.jsx'
import PreviewMenuBar from './panels/menu/PreviewMenuBar.jsx'
import context from './service/RidgeEditorContext.js'

import './editor.less'

import UserPanel from './panels/user/UserPanel.jsx'
import {
  PANEL_SIZE_1920, PANEL_SIZE_1366
} from './utils/constant.js'
import { ReactComposite } from 'ridgejs'

// 公用错误提示方法
globalThis.msgerror = msg => {
  Toast.error(msg)
}
globalThis.success = Toast.success
class Editor extends React.Component {
  constructor (props) {
    super(props)

    this.workspaceRef = React.createRef()
    this.viewPortContainerRef = React.createRef()
    this.codeEditorRef = React.createRef()

    this.state = {
      editorLoadingMessage: '编辑器已启动.. 正在加载应用资源 ',
      editorLoading: true,
      // panel visibles
      componentPanelVisible: true, // 组件面板可见性
      propPanelVisible: false, // 属性面板可见性
      outlinePanelVisible: false, // 大纲面板可见性
      appFilePanelVisible: true, // 应用资源面板可见性
      editMenuBarVisible: true, // 编辑菜单栏可见性
      previewMenuBarVisible: false, // 预览菜单栏可见性
      noOpenFileVisible: true, // 无打开文件时的提示可见性
      panelPosition: PANEL_SIZE_1920,
      // image preview
      imagePreviewSrc: null,
      imagePreviewVisible: false,

      // code preview/edit
      codeEditTitle: '',
      codeEditText: '',
      codeEditVisible: false,
      codeEditType: ''
    }
    if (window.screen.width <= 1366) {
      this.state.panelPosition = PANEL_SIZE_1366
    }
  }

  componentDidMount () {
    context.editorDidMount(this, this.workspaceRef.current, this.viewPortContainerRef.current)
  }

  setEditorLoadingMessage (msg) {
    this.setState({
      editorLoadingMessage: msg
    })
  }

  async confirm (mssage) {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        zIndex: 10001,
        title: '确认',
        content: mssage,
        onOk: async () => {
          resolve()
        },
        onCancel: () => {
          reject(new Error())
        }
      })
    })
  }

  async message (msg) {
    Modal.message(msg)
  }

  setEditorLoaded () {
    this.setState({
      editorLoading: false
    })
  }

  openInCodeEditor (file) {
    this.currentEditFile = file

    this.codeEditorRef.current?.openFile(file)
    // this.setState({
    //   codeEditTitle: file.name,
    //   codeEditText: file.textContent,
    //   codeEditVisible: true,
    //   codeEditType: file.mimeType
    // })
  }

  completeCodeEdit (code) {
    context.onCodeEditComplete(this.currentEditFile.id, code)
  }

  openImage (url) {
    this.setState({
      imagePreviewSrc: url,
      imagePreviewVisible: true
    })
  }

  togglePageEdit () {
    this.setState({
      noOpenFileVisible: false,
      componentPanelVisible: true,
      appFilePanelVisible: true,
      propPanelVisible: true,
      editMenuBarVisible: true,
      previewMenuBarVisible: false,
      outlinePanelVisible: true
    })
  }

  togglePagePreview () {
    this.setState({
      noOpenFileVisible: false,
      componentPanelVisible: false,
      appFilePanelVisible: false,
      propPanelVisible: false,
      editMenuBarVisible: false,
      previewMenuBarVisible: true,
      outlinePanelVisible: false
    })
  }

  togglePageClose () {
    this.setState({
      noOpenFileVisible: true,
      componentPanelVisible: true,
      appFilePanelVisible: true,
      propPanelVisible: false,
      editMenuBarVisible: true,
      previewMenuBarVisible: false,
      outlinePanelVisible: false
    })
  }

  render () {
    const {
      state,
      workspaceRef,
      codeEditorRef,
      viewPortContainerRef
    } = this

    const {
      editorLoading,
      componentPanelVisible,
      appFilePanelVisible,
      propPanelVisible,
      outlinePanelVisible,
      panelPosition,
      editMenuBarVisible,
      previewMenuBarVisible,
      imagePreviewVisible,
      imagePreviewSrc,
      codeEditTitle,
      noOpenFileVisible,
      editorLoadingMessage
    } = state
    return (
      <>
        <div
          ref={workspaceRef}
          className='workspace'
        >
          <div className='view-port' ref={viewPortContainerRef} />
          {
            !editorLoading &&
              <>
                <UserPanel visible={componentPanelVisible} />
                <EditMenuBar visible={editMenuBarVisible} />
                <PreviewMenuBar visible={previewMenuBarVisible} />
                <ComponentPanel title='组件' position={panelPosition.ADD} visible={componentPanelVisible} />
                <LeftBottomPanel title='应用资源' position={panelPosition.LEFT_BOTTOM} visible={appFilePanelVisible} />
                <RightBottomPanel title='布局导航' position={panelPosition.DATA} visible={outlinePanelVisible} />
                <ConfigPanel position={panelPosition.PROP} visible={propPanelVisible} />
                <ImagePreview
                  src={imagePreviewSrc} visible={imagePreviewVisible} onVisibleChange={() => {
                    this.setState({
                      imagePreviewVisible: false
                    })
                  }}
                />
                {noOpenFileVisible && <div className='no-open-file'><ReactComposite app='ridge-editor-app' path='Welcome' /></div>}
                <DialogCodeEdit
                  ref={codeEditorRef}
                  title={codeEditTitle}
                  onClose={() => {
                    this.setState({
                      codeEditVisible: false
                    })
                  }}
                />
              </>
          }
        </div>
        {
          editorLoading &&
            <div className='editor-loading'>
              <Spin tip={editorLoadingMessage} />
            </div>
        }
      </>
    )
  }
}

export default Editor
