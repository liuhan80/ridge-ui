import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { JsonViewer } from '@douyinfe/semi-ui'

export default ({
  value,
  valueChange
}) => {
  return (
    <JsonViewer height='100%' width='100%' value={value} onChange={valueChange} options={{ formatOptions: { tabSize: 4, insertSpaces: true, eol: '\n' } }} />
  )
}
