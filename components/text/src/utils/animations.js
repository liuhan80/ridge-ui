const scaleOut = {
  scale: [1, 0],
  reverse: true,
  ease: 'outQuad'
}

const rotateOut = {
  rotate: [0, '45deg'],
  opacity: [1, 0],
  ease: 'outQuad'
}

const rotateOutBack = {
  rotate: [0, '45deg'],
  translateZ: [0, -180],
  opacity: [1, 0],
  ease: 'outQuad'
}

const rotateOutFwd = {
  rotate: [0, '45deg'],
  translateZ: [0, 180],
  opacity: [1, 0],
  ease: 'outQuad'
}

const flipOutHorTop = {
  rotateX: [0, 70],
  opacity: [1, 0]
}
const flipOutVerLeft = {
  rotateY: [0, -70],
  opacity: [1, 0]
}
const slideOutTop = {
  translateY: [0, '-100%'],
  opacity: [1, 0]
}

const swingOutTopBack = {
  rotateX: [0, '-100deg'],
  transformOrigin: 'top',
  opacity: [1, 0]
}
const animations = {
  rotateOutBack,
  rotateOut,
  flipOutHorTop,
  flipOutVerLeft,
  swingOutTopBack,
  rotateOutFwd,
  slideOutTop,
  scaleOut
}
const eases = [
  'inQuad', 'outQuad', 'inOutQuad',
  'inCubic', 'outCubic', 'inOutCubic',
  'inQuart', 'outQuart', 'inOutQuart',
  'inQuint', 'outQuint', 'inOutQuint',
  'inSine', 'outSine', 'inOutSine',
  'inCirc', 'outCirc', 'inOutCirc',
  'inExpo', 'outExpo', 'inOutExpo',
  'inBounce', 'outBounce', 'inOutBounce'
]

export {
  animations,
  eases
}
