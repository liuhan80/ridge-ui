const fsExtra = require('fs-extra')
const fetch = require('node-fetch')

// 这是使用豆包快速生成的方法，用于获取JSON地址的数据对象
async function fetchJson (url) {
  try {
    // 发起 fetch 请求
    const response = await fetch(url, {
      mode: 'cors'
    })

    // 检查响应状态是否为 200 - 299 之间
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    // 将响应数据解析为 JSON 格式
    const data = await response.json()
    return data
  } catch (error) {
    // 捕获请求过程中可能出现的错误，并返回 null
    console.error('请求出错:', error)
    return null
  }
}

const fullResult = []
const fetched = []

const getSubRegions = async (filename, pid = 0) => {
  let result = null
  let url = null
  if (filename == null) {
    url = 'https://geojson.cn/api/china/china.topo.json'
  } else {
    url = `https://geojson.cn/api/china/${filename}.topo.json`
  }
  result = await fetchJson(url)

  if (result == null) {
    return []
  } else {
    console.log(`fetched ${url}`)
    fetched.push(url)
    fsExtra.writeJSONSync('./fetched.json', fetched, { spaces: 2 })
  }

  return result.objects?.default?.geometries?.filter(item => {
    if (item.properties?.fullname) {
      return true
    } else {
      return false
    }
  }).map((item) => {
    return {
      pid,
      code: item.properties.code,
      fullname: item.properties.fullname,
      filename: item.properties.filename,
      center: item.properties.center
    }
  })
}

const fetchChildren = async (filename, pid) => {
  const result = await getSubRegions(filename, pid)
  if (result) {
    fullResult.push(...result)
    fsExtra.writeJSONSync('./data.json', fullResult, { spaces: 2 })
    for (const item of result) {
      if (item.filename && item.code) {
        await fetchChildren(item.filename, item.code)
      }
    }
  } else {
    return []
  }
}
const fetchAll = async () => {
  await fetchChildren(null, 0)
}

fetchAll()
