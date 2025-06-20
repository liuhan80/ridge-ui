import React, { useEffect, useRef, useState } from 'react'
import './style.css'
export default ({
  text = '',
  fontFamily,
  bgcolor,
  color,
  fontSize,
  effect,
  classList = [],
  onClick
}) => {
  const ref = useRef(null)
  const [previousText, setPreviousText] = useState(null)
  const [rootClass, setRootClass] = useState('')

  useEffect(() => {
    if (previousText != null && previousText !== text) {
      setRootClass('clock__block--bounce')
    }
    setTimeout(() => {
      setRootClass('')
      setPreviousText(text)
    }, 800)
    if (ref.current) {
      if (ref.current.parentElement?.style?.overflow === 'hidden') {
        ref.current.parentElement.style.overflow = 'initial'
      }
    }
  }, [text])
  const className = 'clock__block ' + rootClass + ' ' + classList.join(' ')

  const style = {
    width: '100%',
    height: '100%'
  }
  if (fontSize) {
    style.fontSize = fontSize + 'px'
  }
  if (bgcolor) {
    style.backgroundColor = bgcolor
  }
  if (color) {
    style.color = color
  }

  if (fontFamily) {
    style.fontFamily = fontFamily
  }

  return (
    <div className={className} style={style} ref={ref}>
      <div className='clock__digit-group'>
        <div class='clock__digits'>{text}</div>
        <div class='clock__digits'>{previousText}</div>
      </div>
    </div>
  )
}
