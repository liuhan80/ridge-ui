const config = require('./config.js')
process.env.DEBUG = config.debug || 'ridge:boot,ridge:error'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const Boostrap = require('ridge-boot') // 启动器
const bootApp = new Boostrap({
  // 组件包请按次序放置，一些依赖是要求次序的
  packages: [
    require('ridge-http'), // 基础http服务
    require('ridge-npm-service') // npm初始化相关工作
  ],
  ...config
})

bootApp.start()
