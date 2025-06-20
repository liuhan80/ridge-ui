const path = require('path')
process.env.DEBUG = 'ridge:boot,ridge:error,ridge:npm,ridge:http'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const Boostrap = require('ridge-boot') // 启动器
const bootApp = new Boostrap({
  // 组件包请按次序放置，一些依赖是要求次序的
  packages: [
    require('ridge-http'), // 基础http服务
    require('ridge-npm-service') // npm初始化相关工作
  ],
  public: path.resolve(__dirname, './public') // web public目录
})

bootApp.start()
