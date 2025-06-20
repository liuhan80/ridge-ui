process.env.DEBUG = 'ridge:*'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const config = require('./config.js')
const Boostrap = require('ridge-boot') // 启动器
const bootApp = new Boostrap({
  // 组件包请按次序放置，一些依赖是要求次序的
  packages: [
    require('ridge-http'), // 基础http服务
    require('ridge-dao'), // dao 接口模块
    require('ridge-nedb'), // 使用nedb进行数据模块
    // require('ridge-delivery'),
    require('ridge-npm-service'), // npm 发布模块
    require('ridge-cloud-user'), // 用户管理 - Cloud
    require('ridge-cloud-storage') // 用户存储管理 - Cloud
  ],
  ...config,
  httpsKey: '/opt/cert/ridgeui.com.key',
  httpsCert: '/opt/cert/ridgeui.com_public.crt'
})

bootApp.start()
