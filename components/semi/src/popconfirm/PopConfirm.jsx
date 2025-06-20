import React, { useRef, useEffect } from 'react'
import { Tooltip, Popconfirm, Button } from '@douyinfe/semi-ui'

export default ({
  content,
  title,
  size = '',
  disabled,
  type,
  theme,
  onCancel,
  onConfirm,
  btnText
}) => {
  return (
    <Popconfirm
      disabled={disabled}
      content={content} title={title}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <Button
        disabled={disabled}
        type={type}
        theme={theme}
        size={size}
      >{btnText}
      </Button>
    </Popconfirm>
  )
}
