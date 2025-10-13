import JSZip from 'jszip'
import axios from 'axios'
import { saveAs } from '../utils/blob.js'
import { rollup } from '@rollup/browser'
import { convertToValidVariableName } from 'ridgejs'

export default class DistributionService {
  constructor (context) {
    this.context = context
    this.appService = context.services.appService
  }

  async distributePage (id) {
    const zip = new JSZip()

    const includeFilesAndContents = []

    // 默认加载React  后面看是否根据依赖走
    includeFilesAndContents.push(await this.fetchUrlFile('npm/react@18.3.1/umd/react.production.min.js'))
    includeFilesAndContents.push(await this.fetchUrlFile('npm/react-dom@18.3.1/umd/react-dom.production.min.js'))
    includeFilesAndContents.push(await this.fetchUrlFile('npm/ridgejs/build/webstart.min.js'))

    const packageJSONObjct = await this.appService.getPackageJSONObject('/package.json')
    includeFilesAndContents.push({
      type: 'json',
      filePath: `npm/${packageJSONObjct.name}/package.json`,
      textContent: JSON.stringify(packageJSONObjct, null, 2)
    })

    const file = await this.appService.getFile(id)
    const path = await this.appService.getFilePath(file)

    const compositeFiles = await this.rollupComposite(file.content, packageJSONObjct.name, path)

    includeFilesAndContents.push(...compositeFiles)

    if (packageJSONObjct.themes) {
      for (const key in packageJSONObjct.themes) {
        if (!Object.hasOwn(packageJSONObjct.themes, key)) continue
        const themeUrl = packageJSONObjct.themes[key]

        includeFilesAndContents.push(await this.fetchUrlFile('npm/' + themeUrl))
      }
    }
    // await this.fetchUrlFileIntoZip('npm/ridgejs/build/webstart.min.js', zip)

    let html = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="favicon-32x32.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"></meta>
    <title></title>`

    html += `<script>
                window.RIDGE_NPM_REPO = './npm'
                window.RIDGE_HOME_APP = '${packageJSONObjct.name}'
                window.RIDGE_HOME_PATH = '${path}'
            </script>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="app"></div>`
    for (const includeFile of includeFilesAndContents) {
      switch (includeFile.type) {
        case 'js':
          zip.file(includeFile.filePath, includeFile.textContent)
          html += `<script src="./${includeFile.filePath}" ></script>`
          break
        case 'arraybuffer':
          zip.file(includeFile.filePath, includeFile.data)

          if (includeFile.filePath.endsWith('.js')) {
            html += `<script src="./${includeFile.filePath}" ></script>`
          }
          if (includeFile.filePath.endsWith('.css')) {
            html += `<link rel='stylesheet' href='${includeFile.filePath}' type='text/css' />`
          }
          break
        case 'json':
          zip.file(includeFile.filePath + '.js', `globalThis['json://./${includeFile.filePath}'] = ` + includeFile.textContent)
          html += `<script src="./${includeFile.filePath}.js" ></script>`
          break
        default:
          break
      }
    }
    html += `
        </body>
      </html>`
    zip.file('index.html', html)
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, file.name + '.zip')
  }

  /**
   * 打包composite内容
   * @param {*} content
   * @param {*} compositePath
   * @returns [{
   *    type: 'js/json/img/...',
   *    filePath: '文件路径',
   *    textContent: '',
   * }]
   */
  async rollupComposite (content, pkgName, pagePath) {
    const files = []
    const context = this.context
    if (Array.isArray(content.jsFiles)) {
      for (const jsFile of content.jsFiles) {
        // 使用rollup，将脚本js打包
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
          name: convertToValidVariableName(jsFile.startsWith('composite://') ? `/${pkgName}/${jsFile.substr('composite://'.length + 1)}` : jsFile)
        })
        const theCode = generated.output[0].code

        files.push({
          type: 'js',
          filePath: jsFile.startsWith('composite://') ? `npm/${pkgName}/${jsFile.substr('composite://'.length + 1)}` : jsFile,
          textContent: theCode
        })
      }
    }

    // 打包组件的源代码
    if (Array.isArray(content.elements)) {
      const componentPkgNames = Array.from(new Set(content.elements.map(el => el.path).filter(n => n).map(pt => pt.split('/')[0])))
      for (const componentPkgName of componentPkgNames) {
        const packageJSONObject = await this.fetchJSON(`/npm/${componentPkgName}/package.json`)
        if (Array.isArray(packageJSONObject.externals)) {
          for (const ex of packageJSONObject.externals) {
            files.push(await this.fetchUrlFile(`npm${ex}`))
          }
        }
        files.push(await this.fetchUrlFile(`npm/${componentPkgName}/${packageJSONObject.ridgeDist}`))
      }
    }

    files.push({
      type: 'json',
      filePath: `npm/${pkgName}/${pagePath}.json`,
      textContent: JSON.stringify(content, null, 2)
    })
    return files
  }

  // 将 基于baseUrl 的 baseUrl+path路径的web资源，压缩到 zip的 path路径上， zip为  new JSZip()实例 下载使用axios
  async fetchUrlFile (url) {
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

      return {
        type: 'arraybuffer',
        filePath: url,
        data: response.data
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

  async fetchJSON (url) {
    const response = await window.fetch(url, {
      mode: 'cors',
      credentials: 'include'
    })
    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }
}
