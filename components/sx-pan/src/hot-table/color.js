/**
 * 根据0-100的数值，获取与CSS linear-gradient一致的渐变色
 * CSS对应：background: linear-gradient(270deg, #11AB84 0%, #F6BD16 48%, #FF6400 100%);
 * @param {number} n - 0-100的数值（超出范围会被限制在0-100之间），对应渐变轴上的0%~100%位置
 * @returns {string} 对应的十六进制渐变色（如#xxyyzz）
 */
const getCssAlignedGradientColor = (n, colorStops = [
  { position: 0, color: '#11AB84' }, // CSS: 0%
  { position: 48, color: '#F6BD16' }, // CSS: 48%（原50%改为48%）
  { position: 100, color: '#FF6400' } // CSS: 100%
]) => {
  // 限制输入数值在0-100之间（对应渐变轴的0%~100%位置）
  const inputValue = Math.max(0, Math.min(100, Number(n) || 0))

  // 辅助函数：将十六进制颜色转换为RGB数组 [r, g, b]（范围0-255）
  function hexToRgb (hex) {
    const pureHex = hex.replace(/^#/, '')
    // 处理简写（如#fff）和全写（如#ffffff），这里统一处理为6位
    const fullHex = pureHex.length === 3
      ? pureHex.split('').map(c => c + c).join('')
      : pureHex
    const r = parseInt(fullHex.substring(0, 2), 16)
    const g = parseInt(fullHex.substring(2, 4), 16)
    const b = parseInt(fullHex.substring(4, 6), 16)
    return [r, g, b]
  }

  // 辅助函数：将RGB数组转换为十六进制颜色（补全两位）
  function rgbToHex (r, g, b) {
    const toHex = (val) => {
      const clamped = Math.max(0, Math.min(255, Math.round(val))) // 限制0-255并取整
      return clamped.toString(16).padStart(2, '0') // 自动补0
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase() // 统一小写，和CSS一致
  }

  // 辅助函数：线性插值（CSS渐变的核心计算方式）
  function lerp (a, b, t) {
    return a + (b - a) * t
  }

  // 2. 查找输入值在渐变轴上对应的颜色节点区间（模拟CSS的节点查找）
  let startStop, endStop
  // 遍历颜色节点，找到包含输入值的相邻节点对
  for (let i = 0; i < colorStops.length - 1; i++) {
    const current = colorStops[i]
    const next = colorStops[i + 1]
    if (inputValue >= current.position && inputValue <= next.position) {
      startStop = current
      endStop = next
      break
    }
  }
  // 兜底（理论上不会触发，因为inputValue被限制在0-100）
  if (!startStop || !endStop) {
    startStop = colorStops[0]
    endStop = colorStops[colorStops.length - 1]
  }

  // 3. 计算输入值在当前区间内的插值比例t（0-1，和CSS的插值比例一致）
  const t = (inputValue - startStop.position) / (endStop.position - startStop.position)

  // 4. 转换颜色为RGB并执行线性插值
  const [startR, startG, startB] = hexToRgb(startStop.color)
  const [endR, endG, endB] = hexToRgb(endStop.color)
  const currentR = lerp(startR, endR, t)
  const currentG = lerp(startG, endG, t)
  const currentB = lerp(startB, endB, t)

  // 5. 转回十六进制颜色并返回
  return rgbToHex(currentR, currentG, currentB)
}

export { getCssAlignedGradientColor }
