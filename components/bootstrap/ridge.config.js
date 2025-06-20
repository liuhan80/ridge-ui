module.exports = {
  localNpmDir: '../../public/npm',
  configureWebpack: {
    externals: {
      ridgejs: 'ridgejs',
      '@douyinfe/semi-ui': 'SemiUI',
      '@douyinfe/semi-icons': 'SemiIcons'
    }
  }
}
