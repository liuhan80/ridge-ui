import React, { useEffect, useRef, useState } from 'react'

const appendSplitTexts = (div, text) => {
  div.innerHTML = ''
  const texts = text.split('')

  for (const text of texts) {
    const span = document.createElement('span')

    span.textContent = text

    div.appendChild(span)
  }
}

const SplitDelay = ({
  text,
  effectIn,
  effectOut,
  __applyEffect,
  classList,
  fontSize = 24,
  color = '#333',
  gap,
  direction = 'horizontal'
}) => {
  const containerRef = useRef(null)
  const [currentText, setCurrentText] = useState(null) // 当前显示的文本

  // 触发消失动作，仅当前currentText存在并且不等于text 触发
  useEffect(() => {
    if (currentText != null && currentText !== text) {
      if (currentText !== '') {
        appendSplitTexts(containerRef.current, currentText, classList)
        __applyEffect && __applyEffect(effectOut, Array.from(containerRef.current.children), () => {
          setCurrentText(text)
        })
      } else {
        setCurrentText(text)
      }
    }
  }, [text])

  // 触发进场动画
  useEffect(() => {
    if (currentText == null) {
      setCurrentText(text)
      return
    }
    if (text === currentText) {
      const container = containerRef.current
      if (!container) {
        return
      }
      appendSplitTexts(containerRef.current, currentText, classList)

      const chars = Array.from(container.children)
      // 应用动画
      __applyEffect && __applyEffect(effectIn, chars)
    }
  }, [text, currentText])

  return (
    <div
      ref={containerRef}
      className={classList.join(' ')}
      style={{
        display: 'flex',
        gap,
        flexDirection: direction,
        fontSize: `${fontSize}px`,
        color,
        lineHeight: 1
      }}
    />
  )
}

export default SplitDelay
