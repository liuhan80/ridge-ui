import CHINA_POEMS from './poemList'
import { extractColors } from 'extract-colors'

function colorDistanceRGB (color1, color2) {
  // 提取 RGB 值
  const r1 = parseInt(color1.slice(1, 3), 16)
  const g1 = parseInt(color1.slice(3, 5), 16)
  const b1 = parseInt(color1.slice(5, 7), 16)
  const r2 = parseInt(color2.slice(1, 3), 16)
  const g2 = parseInt(color2.slice(3, 5), 16)
  const b2 = parseInt(color2.slice(5, 7), 16)
  // 计算欧几里得距离
  const distance = Math.sqrt(
    Math.pow(r1 - r2, 2) +
      Math.pow(g1 - g2, 2) +
      Math.pow(b1 - b2, 2)
  )
  return distance
}

const getColorPoems = async img => { // 获取照片的中国色及诗词
  return new Promise((resolve, reject) => {
    extractColors(img).then(data => {
      const colorList = new Set()
      for (const col of data) {
        let minVal = 99999
        let nearCol = null
        for (const color of CHINA_POEMS) {
          const val = colorDistanceRGB(col.hex, color.color)
          if (val < minVal) {
            minVal = val
            nearCol = Object.assign({}, color, { area: col.area })
          }
        }
        colorList.add(nearCol)
      }
      resolve(Array.from(colorList))
    })
  })
}

window.getColorPoems = getColorPoems
