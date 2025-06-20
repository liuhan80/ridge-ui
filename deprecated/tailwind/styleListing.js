/* global tailwind */
const multiplyStringArrays = (array1, array2) => {
  const result = []
  // 遍历第一个数组
  for (let i = 0; i < array1.length; i++) {
    // 遍历第二个数组
    for (let j = 0; j < array2.length; j++) {
      // 将两个数组的元素通过横线相连，并添加到结果数组中
      if (array1[i] === '' || array2[j] === '') {
        result.push(array1[i] + array2[j])
      } else {
        result.push(array1[i] + '-' + array2[j])
      }
    }
  }
  // 返回结果数组
  return result
}

const colors = Object.keys(tailwind.colors).filter(c => ['black', 'lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray', 'transparent', 'white', 'inherit', 'current'].indexOf(c) === -1)

const colorList = []
for (const colorKey of colors) {
  for (const key in tailwind.colors[colorKey]) {
    colorList.push({
      colorKey,
      key: colorKey + '-' + key,
      value: tailwind.colors[colorKey][key]
    })
  }
}

const box = (text, cl) => {
  return `<div class="min-w-16 min-h-10 flex justify-center items-center outline outline-1 outline-slate-100 ${cl}">${text}</div>`
}

const children = (key, label, prefix, showText, clz) => {
  return {
    label,
    value: key,
    classList: Object.keys(tailwind.defaultTheme[key]).map(k => {
      return {
        key: prefix + k,
        html: box(showText ? k : '', typeof clz === 'function' ? clz(k) : (prefix + k + ' ' + clz))
      }
    })
  }
}

const childrenColor = (key, label, prefix, showText, extra) => {
  return {
    label,
    value: key,
    classList: colorList.map(color => {
      return {
        key: prefix + color.key,
        html: box(showText ? color.colorKey : '', typeof extra === 'function' ? extra(color) : (prefix + color.key + ' ' + extra))
      }
    })
  }
}

const listMap = (list, key, label, prefix, showText, extra) => {
  return {
    label,
    value: key,
    classList: list.map(item => {
      return {
        key: prefix + item,
        html: box(showText ? item : '', typeof extra === 'function' ? extra(item) : (prefix + item + ' ' + extra))
      }
    })
  }
}

export default [{
  label: '排版',
  value: 'typography',
  children: [
    children('fontSize', '字体大小', 'text-', true, 'text-base'),
    children('lineHeight', '行高', 'leading-', true, 'text-base'),
    children('fontWeight', '粗细', 'font-', true, 'text-sm'),
    childrenColor('text-color', '文字颜色', 'text-', true, 'font-semibold')
  ]
}, {
  label: '间隔',
  value: 'space',
  children: [
    listMap(multiplyStringArrays(['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'], ['px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4']),
      'padding', '内边距', '', true, () => 'w-26 h-8'),
    listMap(multiplyStringArrays(['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my'], ['px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4']),
      'margin', '外边距', '', true, () => 'w-24 h-8')
  ]
}, {
  label: '背景',
  value: 'background',
  children: [
    childrenColor('bg-color', '背景颜色', 'bg-', false, 'h-8'),
    children('backgroundImage', '线性渐变', 'bg-', false, 'from-sky-500 to-slate-300'),
    childrenColor('bg-from', '渐变起始', 'from-', false, (color) => 'bg-' + color.key + ' h-8'),
    childrenColor('bg-to', '渐变结束', 'to-', false, (color) => 'bg-' + color.key + ' h-8')
  ]
}, {
  label: '边框',
  value: 'border',
  children: [
    listMap([0, 1, 2, 3, 4, 5, 8], 'full-border', '四边', 'border-', false, k => 'border-' + k + ' border-solid border-indigo-600 h-16'),
    listMap(multiplyStringArrays(['t', 'r', 'b', 'l'], ['', '2', '4', '8']), 'single-border', '单独边', 'border-', false, 'border-solid border-indigo-600 h-16'),
    childrenColor('bd-color', '边框颜色', 'border-', false, (color) => 'border-2 border-solid border-' + color.key + ' h-8'),
    listMap(multiplyStringArrays(['', 's', 'e', 't', 'r', 'b', 'l', 'ss', 'se', 'ee', 'es', 'tl', 'tr', 'br', 'bl'], ['sm', '', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
      'border-radius', '边框圆角', 'rounded-', false, k => 'rounded-' + k + ' border-solid border-1 border-indigo-600 h-16'),
    children('outlineWidth', '外轮廓', 'outline outline-', false, 'outline-blue-500 h-16 m-2'),
    childrenColor('ol-color', '轮廓颜色', 'outline-', true, 'outline outline-1 '),
    children('boxShadow', '阴影', 'shadow-', false, 'h-16 m-3')
  ]
}, {
  label: '效果',
  value: 'effects',
  children: [
    children('cursor', '鼠标', 'cursor-', true, 'w-32 h-8'),
    children('opacity', '透明度', 'opacity-', true, 'w-16 h-8 bg-indigo-500'),
    children('animation', '动画', 'animate-', false, 'h-5 w-5 m-5 bg-indigo-500')
  ]
}]
