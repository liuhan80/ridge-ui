// webpack.config.js
const path = require('path')
module.exports = {
  // 入口文件，指定 Webpack 开始打包的文件
  entry: './extract.js',
  // 输出配置，指定打包后的文件存储位置和文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extract-colors.js'
  },
  // 模式，设置为 production 会进行代码压缩等优化
  mode: 'production'
}
