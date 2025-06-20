import React from 'react'

export default ({
  icon = '',
  btn = false,
  color,
  size,
  classList,
  onClick
}) => {
  return (
    <i
      className={['bi', 'bi-' + icon, icon, ...classList].join(' ')} style={{
        width: '100%',
        cursor: btn ? 'pointer' : '',
        height: '100%',
        color,
        display: 'block',
        fontSize: size + 'px',
        textAlign: 'center'
      }}
      onClick={() => {
        onClick && onClick()
      }}
    />
  )
}
