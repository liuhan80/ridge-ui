import React from 'react'
export default ({
  src,
  objectFit,
  fitPosition = 'center',
  onClick,
  classList
}) => {
  const handleImageClick = () => {
    console.log('图片被点击了')
    onClick && onClick()
  }

  const style = {}

  style.objectPosition = fitPosition

  return (
    <img
      src={src} style={style} className={[...classList, objectFit, 'img-fluid', 'w-100', 'h-100'].join(' ')}
      onClick={handleImageClick}
    />
  )
}
