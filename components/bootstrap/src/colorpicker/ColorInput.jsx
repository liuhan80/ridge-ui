import React, { useState, forwardRef, useImperativeHandle } from 'react'
export default forwardRef(({
  value = '',
  size = '',
  onChange,
  input
}, ref) => {
  return (
    <>
      <input
        value={value}
        type='color'
        className={['form-control', 'form-control-color', 'form-control-' + size].join(' ')} 
        onChange={e => {
          onChange && onChange(e.target.value)
          input && input(e.target.value)
        }}
      />
    </>
  )
})
