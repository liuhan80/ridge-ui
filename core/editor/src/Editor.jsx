import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ImagePreview, Modal, Toast } from '@douyinfe/semi-ui'
import ConfigPanel from './panels/config/ConfigPanel.jsx'
import DialogCodeEdit from './panels/files/DialogCodeEdit.jsx'
import EditMenuBar from './panels/menu/EditMenuBar.jsx'
import context from './service/RidgeEditorContext.js'
import { ReactComposite } from 'ridgejs'
import './editor.less'
import PreviewMenuBar from './panels/menu/PreviewMenuBar.jsx'
import LayoutLeft from './LayoutLeft.jsx'
import { blobToDataUrl } from './utils/blob.js'

import { editorStore } from './service/editorStore.js'

// 公用错误提示方法
globalThis.msgerror = msg => {
  Toast.error(msg)
}
globalThis.success = Toast.success

const Editor = () => {
  const theme = editorStore(state => state.theme)
  const isLight = editorStore(state => state.isLight)
  const setIsLight = editorStore(state => state.setIsLight)

  // const [isLight, setIsLight] = useState(window.localStorage.getItem('ridge-is-light') !== 'false')
  const [pageOpened, setPageOpened] = useState(false)
  const [collapseLeft, setCollapseLeft] = useState(false)
  const [leftResizing, setLeftResizing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [editPreview, setEditPreview] = useState(false)
  const [editorLoading, setEditorLoading] = useState(true)
  const [imagePreviewSrc, setImagePreviewSrc] = useState(null)
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false)
  const [codeEditTitle, setCodeEditTitle] = useState('')
  const [codeEditText, setCodeEditText] = useState('')
  const [codeEditVisible, setCodeEditVisible] = useState(false)
  const [codeEditType, setCodeEditType] = useState('')
  const [leftReisizeWidth, setLeftReisizeWidth] = useState(null)

  const workspaceRef = useRef(null)
  const viewPortContainerRef = useRef(null)
  const codeEditorRef = useRef(null)
  const currentEditFile = useRef(null)

  // 设置主题
  useEffect(() => {
    if (window.localStorage.getItem('ridge-is-light') === 'false') {
      setIsLight(false)
    }
  }, [isLight])

  // 组件挂载
  useEffect(() => {
    context.editorDidMount({
      setPageOpened,
      setPreview: setIsPreview,
      openInCodeEditor,
      openImage,
      setEditorLoaded: () => setEditorLoading(false)
    }, workspaceRef.current, viewPortContainerRef.current)
  }, [])

  // 左侧面板调整大小处理
  useEffect(() => {
    const handleMouseMove = (ev) => {
      if (leftResizing && ev.clientX > 250) {
        setLeftReisizeWidth(ev.clientX)
      }
    }

    const handleMouseUp = () => {
      setLeftResizing(false)
    }

    if (leftResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [leftResizing])

  const handleLeftResize = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    function handleMouseMove (ev) {
      if (leftResizing && ev.clientX > 250) {
        setLeftReisizeWidth(ev.clientX)
      }
    }

    function handleMouseUp () {
      setLeftResizing(false)
    }
  }, [leftResizing])

  const toggleLeftCollapse = useCallback(() => {
    setCollapseLeft(prev => !prev)
  }, [])

  const confirm = useCallback((message) => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        zIndex: 10001,
        title: '确认',
        content: message,
        onOk: async () => {
          resolve()
        },
        onCancel: () => {
          reject(new Error())
        }
      })
    })
  }, [])

  const message = useCallback((msg) => {
    Modal.message(msg)
  }, [])

  const openInCodeEditor = useCallback((file) => {
    currentEditFile.current = file
    codeEditorRef.current?.openFile(file)
  }, [])

  const completeCodeEdit = useCallback((code) => {
    if (currentEditFile.current) {
      context.onCodeEditComplete(currentEditFile.current.id, code)
    }
  }, [])

  const openImage = useCallback((blob) => {
    setImagePreviewSrc(blobToDataUrl(blob))
    setImagePreviewVisible(true)
  }, [])

  const handleToggleLight = useCallback((lt) => {
    setIsLight(lt)
    context.setLight(lt)
  }, [])

  const handleSetEditorLoaded = useCallback(() => {
    setEditorLoading(false)
    handleLeftResize()
  }, [handleLeftResize])

  return (
    <>
      <div
        className='editor-root'
        style={{ display: isPreview ? 'none' : '' }}
      >
        <LayoutLeft
          isLight={isLight}
          toggleLight={handleToggleLight}
        />
        {!collapseLeft && (
          <div
            className='left-resizer'
            onMouseDown={(e) => {
              e.preventDefault()
              setLeftResizing(true)
            }}
          />
        )}
        <div className='editor-content'>
          <EditMenuBar />
          <div className='workspace-panel'>
            <div ref={workspaceRef} className='workspace'>
              <div className='view-port' ref={viewPortContainerRef} />
              {!pageOpened && (
                <div className='no-open-file'>
                  <ReactComposite app='ridge-editor-app' path='Welcome' />
                </div>
              )}
            </div>
            {pageOpened && <ConfigPanel />}
          </div>
        </div>
        <div />
      </div>

      <div
        className='preview-root'
        style={{ display: isPreview ? '' : 'none' }}
      >
        <PreviewMenuBar />
        <div className='preview-container'>
          <div className='preview-view-port' />
        </div>
      </div>

      <ImagePreview
        src={imagePreviewSrc}
        visible={imagePreviewVisible}
        onVisibleChange={() => setImagePreviewVisible(false)}
      />
      <DialogCodeEdit
        ref={codeEditorRef}
        title={codeEditTitle}
        onClose={() => setCodeEditVisible(false)}
      />
    </>
  )
}

export default Editor
