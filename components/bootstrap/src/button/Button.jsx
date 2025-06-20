import React from 'react'
import './button.css'

export default ({
  text = '',
  type = 'primary',
  size = '',
  fontSize,
  style = 'general',
  rounded,
  full,
  src,
  icon,
  disabled,
  withBadge = false,
  badgeCount = '',
  onClick
}) => {
  const classList = ['btn', 'btn-' + size]
  const css = {
    'touch-action': 'manipulation'
  }
  if (style === 'general') {
    classList.push('btn-' + type)
  } else if (style === 'outline') {
    classList.push('btn-outline-' + type)
  } else if (style === 'light') {
    classList.push('bg-' + type + '-subtle')
    classList.push('text-' + type)
  }
  if (rounded) {
    classList.push('rounded-pill')
  }
  if (withBadge) {
    classList.push('position-relative')
  }

  if (full) {
    css.width = '100%'
    css.height = '100%'
  }
  if (fontSize) {
    css.fontSize = fontSize + 'px'
  }
  return (
    <button
      style={css}
      type='button'
      disabled={disabled}
      onClick={ev => {
        onClick && onClick(ev, 'ok')
      }}
      className={'b-btn ' + classList.join(' ')}
    >
      {src && <img src={src} style={{ width: '100%', height: '100%' }} />}
      {icon && !src && <i className={'me-2 bi bi-' + icon} />}
      {text}
      {withBadge && badgeCount === '' &&
        <span class='position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
          <span class='visually-hidden'>New alerts</span>
        </span>}
      {withBadge && badgeCount &&
        <span class='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
          {badgeCount}
          <span class='visually-hidden'>unread messages</span>
        </span>}
    </button>
  )
}
