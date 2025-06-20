const walker = require('./walker')
const path = require('path')
const fse = require('fs-extra')

const walkerAsync = async (dir) => {
  return new Promise((resolve, reject) => {
    walker(dir, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const compareDir = (source, target, compare) => {
  walker(source, async function (err, data) {
    if (err) {
      throw err
    }
    console.log('Files:' + data.length)

    for (const fullPath of data) {
      const relPath = path.relative(source, fullPath)
      const result = await compare(source, relPath, target)
      if (result === false) {
        console.log('Diff: ' + path.normalize(relPath))
      }
    }
    // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
  })
}

const compareByNameAndSize = async (source, target) => {
  const srcFullObject = new Map()
  const srcList = await walkerAsync(source)
  for (const filePath of srcList) {
    srcFullObject.set(path.basename(filePath), (await fse.statSync(filePath)).size)
  }

  const targetFullObject = new Map()
  const targetList = await walkerAsync(target)

  const noe = []
  for (const filePath of targetList) {
    const name = path.basename(filePath)
    const size = (await fse.statSync(filePath)).size
    targetFullObject.set(name, size)

    if (srcFullObject.get(name) !== size) {
      noe.push(filePath)
    }
  }
  console.log(noe)
}

const compare = (sourcePath, relPath, destFolder) => {
  const fullPath = path.resolve(sourcePath, relPath)
  let newPath = ''
  if (path.extname(fullPath).toLowerCase() === '.png' || path.extname(fullPath).toLocaleLowerCase() === '.jpg') {
    newPath = path.resolve(destFolder, relPath.replace(path.extname(relPath), '.webp'))
  } else {
    newPath = path.resolve(destFolder, relPath.replace(path.extname(relPath), '.mp4'))
  }
  if (fse.existsSync(newPath)) {
    return true
  } else {
    return false
  }
}

let count = 0
const fullcopy = async (sourcePath, relPath, destFolder) => {
  const fullPath = path.resolve(sourcePath, relPath)
  const newPath = path.resolve(destFolder, relPath)

  if (!fse.existsSync(newPath)) {
    count++
    console.log(count + '.' + fullPath, '->', newPath)
    // await fse.copyFileSync(fullPath, newPath)
  }
}
// compareDir('D:\\2021', 'D:\\Photos\\2021', compare)

// compareDir('F:\\2023', 'E:\\2023', fullcopy)
compareByNameAndSize('E:\\2023', 'F:\\2023')
