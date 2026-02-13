import React, { useState, useEffect, useCallback } from 'react'
import LayoutLeft from './LayoutLeft.jsx'
import ConfigPanel from './panels/config/ConfigPanel.jsx'
import DialogCodeEdit from './panels/files/DialogCodeEdit.jsx'

import workSpaceStore from './store/workspace.store'
import './editor.less'

const Editor = () => {
  const [leftReisizeWidth, setLeftResizeWidth] = useState(360)
  const [leftResizing, setLeftResizing] = useState(false)

  const fileOpened = workSpaceStore((state) => state.fileOpened)

  // 用 useCallback 缓存事件处理函数，避免闭包陷阱
  const handleMouseMove = useCallback((ev) => {
    if (leftResizing) {
      // 限制宽度范围，避免拖到看不见或占满屏幕
      const newWidth = Math.max(200, Math.min(ev.clientX, 800))
      setLeftResizeWidth(newWidth)
    }
  }, [leftResizing])

  const handleMouseUp = useCallback(() => {
    setLeftResizing(false)
  }, [])

  // 正确管理事件监听和移除
  useEffect(() => {
    // 只有开始拖拽时才监听 mousemove，性能更好
    if (leftResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    // 组件卸载/状态变化时移除事件，避免内存泄漏
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [leftResizing, handleMouseMove, handleMouseUp])

  const handleMouseDown = (e) => {
    e.preventDefault() // 阻止默认行为（如选中文本）
    setLeftResizing(true)
  }

  return (
    <div className='editor-root'>
      <LayoutLeft risizeWidth={leftReisizeWidth} />
      <div
        className='left-resizer' onMouseDown={handleMouseDown}
      />
      {fileOpened && <ConfigPanel />}

      <DialogCodeEdit
        onClose={() => {
        }}
      />
    </div>
  )
}

export default Editor
