import React from 'react'
export default ({
  children
}) => {
  return (
    <div className='swiper'>
      <div className='swiper-wrapper'>
        {children && children.map((content, idx) => {
          return <div key={idx} className='swiper-slide'>{content()}</div>
        })}
      </div>
      <div className='swiper-pagination' />

      <div className='swiper-button-prev' />
      <div className='swiper-button-next' />

      <div className='swiper-scrollbar' />
    </div>
  )
}
