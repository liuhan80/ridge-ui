const path = require('path')
process.env.DEBUG = 'ridge:boot,ridge:http'

const rootStore = process.env.SXSHU_ROOT_STORE || '/opt/node/file'
const admins = process.env.SXSHU_ADMINS || 'zhang_wei83,liuhan'

module.exports = {
  public: path.resolve(__dirname, '../public'), // 静态资源目录：选择服务器目录同级的public
  bootPath: path.resolve(__dirname), // config文件所在路径， 为避免麻烦 后续存储都以此为基准
  storePath: path.resolve(__dirname, rootStore), // 文件上传管理路径
  dbDataDir: path.resolve(__dirname, path.resolve(rootStore, './dbStore')), 
  admins,
  cors: {
    credentials: true,
    origin: '*'
  }
}
