import React, { useEffect, useRef } from 'react'

/**
 * 替换文本中的关键词为带样式的 span 标签，避免二次替换已被 span 包裹的内容
 * @param {string} originalText - 原始文本
 * @param {string} word - 需要替换的关键词
 * @param {string} color - 文本颜色 (CSS 颜色值)
 * @param {string} backgroundColor - 背景颜色 (CSS 颜色值)
 * @param {string} className - 额外的类名
 * @returns {string} 替换后的文本
 */
function replaceKeyStyle (originalText, word, color, backgroundColor, className) {
  if (!originalText || !word) return originalText

  // 创建正则表达式，匹配关键词但排除已在 span 内的情况
  // 负向前瞻断言确保匹配的关键词后面不是 </span>
  // 负向后瞻断言确保匹配的关键词前面不是 <span...>
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(
    `(?<!<[^>]*?)${escapedWord}(?!\\s*</span>)`,
    'gi'
  )

  // 生成替换用的 span 标签
  const styleAttr = [
    color && `color:${color}`,
    backgroundColor && `background-color:${backgroundColor}`
  ]
    .filter(Boolean)
    .join(';')

  const spanStart = className
    ? `<span class="${className}" style="${styleAttr}">`
    : `<span style="${styleAttr}">`

  // 执行替换
  return originalText.replace(regex, `${spanStart}$&</span>`)
}

export default ({
  text = '',
  fontSize,
  searchWords,
  classList = []
}) => {
  const ref = useRef(null)

  const style = {
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6rem',
    width: '100%',
    height: '100%'
  }

  if (fontSize) {
    style.fontSize = fontSize + 'px'
  }

  useEffect(() => {
    let outputText = text

    for (const word of searchWords) {
      if (typeof word === 'string') {
        outputText = replaceKeyStyle(outputText, word, '#fbda32', '', classList.join(' '))
      } else if (word.text) {
        outputText = replaceKeyStyle(outputText, word.text, word.style?.color, word.style?.backgroundColor, classList.join(' '))
      }
    }
    ref.current.innerHTML = outputText
  }, [text, searchWords])
  return (
    <pre
      ref={ref}
      style={style}
    >{text}
    </pre>
  )
}
