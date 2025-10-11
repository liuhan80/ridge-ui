import { customAlphabet } from 'nanoid'
import camelCase from 'lodash/camelCase'
import trim from 'lodash/trim'
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const filename = fullPath => {
  const withExt = fullPath.substring(fullPath.lastIndexOf('/') + 1)
  // return withExt.includes('.') ? withExt.substring(0, withExt.lastIndexOf('.')) : withExt
  return withExt.split('.')[0]
}

const hashString = str => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

const generateUrlFontName = fontUrl => filename(fontUrl)
/*
const generateUrlFontName = fontUrl => {
  // 从字体 URL 中提取文件名部分
  const fileName = fontUrl.split('/').pop()
  // 生成基于 URL 的哈希值
  const urlHash = hashString(fontUrl)
  // 结合文件名和哈希值生成唯一的字体名称
  return `${fileName.replace(/\.\w+$/, '')}-${urlHash}`
}
*/

// 将数值转换为合法的css长度值  主要是  12-> 12px
const toCSSLength = (value) => {
  if (value == null) return value // 处理 null/undefined
  const str = String(value).trim()
  return /^(auto|inherit|initial|unset|0|calc|min|max|clamp)/.test(str) ||
         /[^\d.]\s*\d/.test(str)
    ? str
    : `${parseFloat(str) || 0}px`
}

const ensureLeading = (str, slash = '/') => {
  return str.startsWith(slash) ? str : (slash + str)
}

const convertToValidVariableName = str => {
  // 1. 移除所有非字母数字的字符，并用空字符串替换
  // 2. 确保变量名不以数字开头（如果以数字开头，前面添加下划线）
  let variableName = str.replace(/[^a-zA-Z0-9]/g, '_')

  // 检查是否以数字开头
  if (/^\d/.test(variableName)) {
    variableName = '_' + variableName
  }
  return variableName
}

export {
  convertToValidVariableName,
  filename,
  camelCase,
  trim,
  hashString,
  toCSSLength,
  generateUrlFontName,
  ensureLeading,
  nanoid
}
