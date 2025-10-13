const imageCompress = require('./imageCompress.js')
const videoCompress = require('./videoCompress.js')

const prepare = async (source, target, opts) => {
  console.log('imageCompress', await imageCompress.prepare(source, target, opts))
  console.log('videoCompress', await videoCompress.prepare(source, target, opts))
}

const compress = async (source, target, opts) => {
  await imageCompress.process(source, target, opts)
  await videoCompress.process(source, target, opts)
}

// prepare('D:\\2023', 'D:\\Photos\\2023', {
//   overwrite: false, // 覆盖
//   fullScope: true, // 全目标路径搜索
//   remove: true, // 处理后删除
//   maxVideoSize: 480, // 最大视频宽度 480 即480p视频
//   maxImageLength: 4000, // 最大图片宽度（长度）4000 一般足够
//   each: ({ i, targetList, pair }) => {
//     console.log('Processing ' + i + '/' + targetList.length, pair[0], '->' + pair[1])
//   }
// })

const proc = async opts => {
  const method = opts.prepare ? prepare : compress
  await method(opts.from, opts.to, opts)
}
console.log(process.argv)

proc({
  from: process.argv[2] || 'D:\\2025',
  to: process.argv[3] || 'D:\\Photos\\2025',
  prepare: false,
  processor: ['video', 'image'],
  overwrite: false, // 覆盖
  fullScope: false, // 全目标路径搜索
  remove: false, // 处理后删除
  maxVideoSize: 640, // 最大视频宽度 640 即480p视频
  maxImageLength: 4000, // 最大图片宽度（长度）4000 一般足够
  each: ({ i, targetList, pair }) => {
    console.log('Processing ' + i + '/' + targetList.length, pair[0], '->' + pair[1])
  }
})
