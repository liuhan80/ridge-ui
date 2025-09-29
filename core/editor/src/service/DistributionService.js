import JSZip from 'jszip'
import axios from 'axios'
import { saveAs } from '../utils/blob.js'
import { rollup } from '@rollup/browser'

export default class DistributionService {
  constructor (context) {
    this.context = context
    this.appService = context.services.appService
  }

  async distributePage (id) {
    const zip = new JSZip()
    const packageJSONObjct = await this.appService.getPackageJSONObject('/package.json')

    const includeFilesAndContents = []
    let html = `<!DOCTYPE html>
      <html>
        <head>
            <meta charset="utf-8" />
            <link rel="icon" type="image/png" href="favicon-32x32.png">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"></meta>
            <title></title>`

    includeFilesAndContents.push(this.extractJSON(`npm/${packageJSONObjct.name}/package.json`, packageJSONObjct))
    const file = await this.appService.getFile(id)
    const path = await this.appService.getFilePath(file)

    const compositeFiles = await this.rollupComposite(file.content, `npm/${packageJSONObjct.name}/${path}.json`)

    includeFilesAndContents.push(...compositeFiles)

    for (const compositeFile of includeFilesAndContents) {
      zip.file(compositeFile.filePath, compositeFile.jsContent)
      html += `<script src="./${compositeFile.filePath}" ></script>`
    }
    // html = this.zipAndLinkJSON(`npm/${packageJSONObjct.name}/${path}.json`, file.content)

    // zip.file(`npm/${packageJSONObjct.name}/${path}.json`, JSON.stringify(file.content, null, 2))

    await this.fetchUrlFileIntoZip('npm/ridgejs/build/webstart.min.js', zip)

    html += `<script>
                window.RIDGE_NPM_REPO = './npm'
                window.RIDGE_HOME_APP = '${packageJSONObjct.name}'
                window.RIDGE_HOME_PATH = '${path}'


            </script>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="app"></div>
          <script src="./npm/ridgejs/build/webstart.min.js" ></script>
        </body>
      </html>`
    zip.file('index.html', html)
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, file.name + '.zip')
  }

  // 打包一个应用的内容
  async rollupComposite (content, appName, pageName) {
    const files = []
    const context = this.context
    if (content.jsFiles && content.jsFiles.length) {
      for (const jsFile of content.jsFiles) {
        const rolluped = await rollup({
          input: jsFile,
          plugins: [
            {
              resolveId (source, importer) {
                console.log(source)
                return source
              },
              async load (id) {
                if (id.startsWith('/')) {
                  const result = await fetch(id)
                  const text = await result.text()
                  return text
                } else {
                  const Module = await context.loadModule(null, id)
                  if (Module) {
                    return Module.jsContent
                  }
                }
              }
            }
          ]
        })
        const generated = await rolluped.generate({
          format: 'iife',
          name: 'storeObjectName'
        })
        const theCode = generated.output[0].code

        files.push({
          filePath: jsFile,
          jsContent: theCode
        })
      }
    }

    files.push(this.extractJSON(`npm/${appName}/${pageName}.json`, content))
    return files
  }

  extractJSON (jsonPath, jsonObject) {
    return {
      filePath: jsonPath + '.js',
      jsContent: `globalThis['json://./${jsonPath}'] = ` + JSON.stringify(jsonObject, null, 2)
    }
  }

  // 将 基于baseUrl 的 baseUrl+path路径的web资源，压缩到 zip的 path路径上， zip为  new JSZip()实例 下载使用axios
  async fetchUrlFileIntoZip (url, zip) {
    try {
      // 构建完整的URL
      const fullUrl = '/' + url

      // 配置axios请求，获取二进制数据
      const response = await axios.get(fullUrl, {
        responseType: 'arraybuffer',
        headers: {
          Accept: '*/*'
        }
      })

      // 检查响应状态
      if (response.status !== 200) {
        throw new Error(`Failed to fetch ${fullUrl}, status code: ${response.status}`)
      }

      // 将获取到的内容添加到zip中，使用指定的path作为zip内部路径
      zip.file(url, response.data)

      // 返回成功信息
      return {
        success: true,
        url,
        message: `Successfully added ${url} to zip`
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message)
      return {
        success: false,
        url,
        message: error.message
      }
    }
  }

  distributeFullApp () {

  }
}
