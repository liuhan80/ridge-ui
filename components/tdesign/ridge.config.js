module.exports = {
  localNpmDir: '../../public/npm',
  configureWebpack: {
    externals: {
      'tdesign-react': 'TDesign'
    }
  }
}
