import React, { useState, forwardRef, useImperativeHandle } from 'react'

export default forwardRef(({
  value = '',
  size = 'normal',
  placeholder,
  validState,
  validMsg,
  invalidMsg,
  classNames = [],
  disabled,
  onChange,
  input
}, ref) => {
  const [val, setVal] = useState(value)

  // 使用useImperativeHandle来定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    updateProps: ({ value }) => {
      setVal(value)
    }
  }))

  let validName = ''
  if (validState === true) {
    validName = 'is-valid'
  } else if (validState === false) {
    validName = 'is-invalid'
  }
  return (
    <>
      <textarea
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        disabled={disabled}
        type='text' className={['form-control', validName, 'form-control-' + size, ...classNames].join(' ')} placeholder={placeholder} value={val} onChange={e => {
          setVal(e.target.value)
          onChange && onChange(e.target.value)
        }}
      />
      {validState === true && <div class='valid-feedback'>{validMsg}</div>}
      {validState === false && <div class='invalid-feedback'>{invalidMsg}</div>}
    </>
  )
})
