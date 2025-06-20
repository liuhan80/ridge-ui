const OSS = require('ali-oss')

const client = new OSS({
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  authorizationV4: true,
  // yourBucketName填写Bucket名称。
  bucket: 'ridgeui-v1'
})

/**
 * 负责提供用户aliyun文件存储上传服务，计划给用户提供以下接口
 * 1、上传文件流
 */
class AliyunOSSStorageService {
  constructor (app) {
    this.app = app
    this.config = app.config
  }

  async getDirSize (dirPath) {

  }

  async putFile (fullPath, file, meta) {
    // 自定义请求头
    const headers = {
    // 指定Object的存储类型。
      'x-oss-storage-class': 'Standard',
      // 指定Object的访问权限。
      'x-oss-object-acl': 'private',
      // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
      'Content-Disposition': 'attachment; filename="example.txt"',
      // 设置Object的标签，可同时设置多个标签。
      'x-oss-tagging': 'Tag1=1&Tag2=2',
      // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'true'
    }
    try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      const result = await client.put('exampleobject.txt', file
        // 自定义headers
        , { headers }
      )
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = AliyunOSSStorageService
