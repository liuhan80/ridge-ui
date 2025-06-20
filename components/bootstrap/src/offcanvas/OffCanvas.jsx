import React, { useRef, useEffect, useState } from 'react'
import './style.css'

import { createPortal } from 'react-dom'
export default ({
  value,
  title,
  body,
  width,
  height,
  padding = 8,
  input,
  full,
  onClose,
  __isEdit
}) => {
  const ref = useRef(null)
  const [lastShow, setLastShow] = useState(null)
  const onClickClose = () => {
    input && input(false)
    onClose && onClose()
  }

  useEffect(() => {
    if (value === true) {
      ref.current.classList.remove('hiding')
    } else if (value === false) {
      ref.current.classList.add('hiding')
    }
  }, [value])

  const modalStyle = __isEdit
    ? {
        '--bs-offcanvas-padding-x': padding + 'px',
        '--bs-offcanvas-padding-y': padding + 'px',
        width: '100%',
        height: '100%',
        margin: 0,
        maxHeight: 'initial',
        maxWidth: 'initial'
      }
    : {
        '--bs-offcanvas-padding-x': padding + 'px',
        '--bs-offcanvas-padding-y': padding + 'px',
        width: full ? '100%' : (width + 'px'),
        marginLeft: 'auto',
        marginRight: 'auto',
        maxHeight: 'initial',
        maxWidth: 'initial'
      }
  const ModalDialog = () => (
    <div ref={ref} className='show hiding offcanvas-start offcanvas' style={modalStyle}>
      <div className='offcanvas-header'>
        <h5 className='offcanvas-title'>{title ?? ''}</h5>
        <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' onClick={onClickClose} />
      </div>

      <div className='offcanvas-body'>
        {body && body()}
      </div>
    </div>
  )

  return (
    <>
      {__isEdit
        ? <div className='offcanvas-edit' style={{ display: 'block', position: 'relative', height: '100%' }}><ModalDialog show /></div>
        : createPortal(
          <ModalDialog />,
          document.body
        )}
    </>

  )
}
