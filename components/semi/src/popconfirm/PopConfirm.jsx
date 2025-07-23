import React, { useRef, useEffect } from 'react'
import { Tooltip, Popconfirm, Button } from '@douyinfe/semi-ui'
import * as SemiIcons from '@douyinfe/semi-icons'

export default ({
  content,
  title,
  size = '',
  disabled,
  icon,
  type,
  theme,
  onCancel,
  onConfirm,
  btnText
}) => {
  const IconComponent = SemiIcons[icon]
  return (
    <Popconfirm
      disabled={disabled}
      content={content} title={title}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <Button
        icon={IconComponent
          ? <IconComponent
              size='inherit'
            />
          : null}
        disabled={disabled}
        type={type}
        theme={theme}
        size={size}
      >{btnText}
      </Button>
    </Popconfirm>
  )
}
