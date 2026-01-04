module.exports = {
  localNpmDir: '../../public/npm',
  configureWebpack: {
    externals: {
      antd: 'antd',
      '@ant-design/icons': 'icons'
    }
  }
}
