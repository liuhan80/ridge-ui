import React from 'react'
import { Upload, Button } from '@douyinfe/semi-ui'
import './style.css'
export default ({
  btnText = '点击上传',
  draggable = false,
  fileLimit,
  __isEdit,
  outputUrl = true,
  directory = false,
  maxSize = 10,
  renderContent,
  multiple = true,
  input,
  onChange
}) => {
  const fileChange = (fileList) => {
    const newFileList = [...fileList] // spread to get new array

    if (outputUrl) {
      let outputValue = newFileList.map(item => URL.createObjectURL(item))
      if (!multiple) {
        outputValue = outputValue[0]
      }
      input && input(outputValue)
      onChange && onChange(outputValue)
    } else {
      input && input(newFileList)
      onChange && onChange(newFileList)
    }
  }

  const config = {
    draggable,
    maxSize: maxSize * 1024,
    multiple,
    dragMainText: btnText,
    uploadTrigger: 'custom',
    showUploadList: false,
    directory,
    onFileChange: fileChange
  }

  if (fileLimit) {
    config.accept = fileLimit
  }

  if (__isEdit) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {renderContent && renderContent(config)}
        {!renderContent && <Button>{btnText}</Button>}
      </div>
    )
  } else {
    if (!renderContent) {
      return (
        <Upload {...config} style={{ width: '100%', height: '100%' }} >
          <Button>{btnText}</Button>
        </Upload>
      )
    } else {
      <Upload {...config} style={{ width: '100%', height: '100%' }}>
        {renderContent(config)}
      </Upload>
    }
  }
}
