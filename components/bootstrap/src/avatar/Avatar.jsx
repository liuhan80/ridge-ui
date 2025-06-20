import React from 'react'
export default ({
  src,
  text,
  withBadge,
  badgeNumber,
  badgeIcon,
  classList,
  onClick
}) => {
  const className = classList.join(' ')
  const classArray = ['object-fit-cover', 'w-100', 'h-100']
  if (className.indexOf('rounded-') === -1) {
    classArray.push('rounded-circle')
  }
  if (className.indexOf('bg-') === -1) {
    classArray.push('bg-secondary-subtle')
  }
  if (className.indexOf('fs-') === -1) {
    classArray.push('fs-3')
  }
  if (className.indexOf('text-') === -1) {
    classArray.push('text-uppercase')
  }

  let avatar = null
  if (src) {
    return (
      avatar = <img className={className + ' ' + classArray.join(' ')} src={src} />
    )
  } else if (text) {
    avatar = <div className={className + ' ' + classArray.join(' ') + ' justify-content-center  d-flex align-items-center'}>{text}</div>
  }
  if (withBadge) {
    return (
      <div className='position-relative'>
        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>11</span>
        {avatar}
      </div>
    )
  } else {
    return avatar
  }
}
