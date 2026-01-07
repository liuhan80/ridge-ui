import React from 'react'
import './style.less'

const SectionBox = ({
  title = '标题',
  style,
  contentStyle,
  extra,
  content
}) => {
  return (
    <div className='full-size-hidden sx-section-box' style={style}>
      <div className='sx-section-title'>
        <div className='horline' />
        <div className='title-text'>{title}</div>
        {extra && <div className='extra'>{extra()}</div>}
      </div>
      <div className='sx-section-content' style={contentStyle}>{content && content()}</div>
    </div>
  )
}

export default SectionBox
