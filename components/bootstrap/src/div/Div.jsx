import React, { useEffect, useRef } from 'react'
export default ({
  text,
  mask,
  bgcolor,
  color,
  pluginAttr,
  classList,
  center,
  onMouseDown,
  effect,
  __applyEffect,
  onClick
}) => {
  const className = classList.join(' ')
  const ref = useRef(null)

  const style = {
    width: '100%',
    height: '100%'
  }
  if (center) {
    style.display = 'flex'
    style.alignItems = 'center'
    style.justifyContent = 'center'
  }
  if (mask) {
    style.maskSize = 'contain'
    style.maskImage = `url("${mask}")`
    style.maskRepeat = 'no-repeat'
  }
  if (bgcolor) {
    style.backgroundColor = bgcolor
  }
  if (color) {
    style.color = color
  }

  useEffect(() => {
    __applyEffect && __applyEffect(effect, ref.current)
  }, [effect])

  return (
    <div
      ref={ref}
      className={className} style={style}
      onMouseDown={() => {
        onMouseDown && onMouseDown()
      }}
      onClick={() => {
        onClick && onClick()
      }}
    >{text}
    </div>
  )
}
