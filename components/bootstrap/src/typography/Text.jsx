import React, { useEffect, useRef } from 'react'

export default ({
  text = '',
  fontFamily,
  bgcolor,
  color,
  center,
  ellipsis,
  clamp,
  autoFontSize,
  fontSize,
  classList = [],
  effect,
  __applyEffect,
  onClick
}) => {
  const className = classList.join(' ')
  const ref = useRef(null)

  useEffect(() => {
    __applyEffect && __applyEffect(effect, ref.current)
  }, [effect])

  const style = {
    width: '100%',
    height: '100%'
  }
  if (ellipsis) {
    style.overflow = 'hidden'
    style.textOverflow = 'ellipsis'
    if (clamp > 1) {
      style.display = '-webkit-box'
      style.webkitBoxOrient = 'vertical'
      style.webkitLineClamp = clamp.toString()
    } else {
      style.whiteSpace = 'nowrap'
    }
  } else if (center) {
    style.display = 'flex'
    style.alignItems = 'center'
    style.justifyContent = 'center'
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

  useEffect(() => {
    if (autoFontSize) {
      adjustFontSize(fontSize)
    }
  }, [text])

  // 检查文本是否超出容器
  function adjustFontSize (fize) {
    let fontSize = fize
    ref.current.style.fontSize = `${fontSize}px`
    // 如果文本高度超过容器高度
    while (ref.current.scrollWidth > ref.current.clientWidth) {
      fontSize -= 0.5
      ref.current.style.fontSize = `${fontSize}px`
      // 防止无限循环（设置最小字体）
      if (fontSize < 8) break
    }
  }

  return (
    <div
      onClick={() => {
        onClick && onClick()
      }}
      ref={ref}
      style={style} className={className}
    >{text}
    </div>
  )
}
