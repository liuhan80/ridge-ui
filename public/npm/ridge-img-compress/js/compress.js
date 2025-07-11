export default {
  name: 'ImageCompress',
  state: {
    inputFiles: [], // 用户选择的原始文件列表
    inputFileDetail: [], // 原始文件详细信息（会包含处理后的数据）
    outputFiles: [], // 处理后的文件列表
    outputFileDetail: [], // 处理后的文件详细信息
    compressConfig: { // 压缩配置
      quality: 0.7, // 压缩质量 (0-1)
      scaleMode: 'ratio', // 缩放模式: 'ratio' | 'dimension'
      ratio: 50, // 缩放比例百分比 (1-100)
      dimensionMode: 'fixed', // 尺寸模式: 'fixed' | 'width' | 'height'
      fixedWidth: 800, // 固定宽度
      fixedHeight: 600 // 固定高度
    },
    processProgress: 0, // 整体处理进度百分比
    currentProcessing: -1 // 当前正在处理的文件索引
  },
  actions: {
    // 格式化文件大小（转换为B/K/M/G）
    formatFileSize (size) {
      if (size < 1024) {
        return `${size.toFixed(2)} B`
      } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)} K`
      } else if (size < 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} M`
      } else {
        return `${(size / (1024 * 1024 * 1024)).toFixed(2)} G`
      }
    },

    // 提取输入图片信息
    extractInputImageInfo (files) {
      return new Promise((resolve, reject) => {
        const promises = files.map((file, index) => {
          return new Promise((res, rej) => {
            const reader = new FileReader()

            reader.onload = (e) => {
              const img = new Image()

              img.onload = () => {
                // 格式化原始文件大小
                const formattedSize = this.formatFileSize(file.size)

                // 构建图片详细信息对象（包含处理状态字段）
                const detail = {
                  id: index,
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  formattedSize,
                  width: img.width,
                  height: img.height,
                  originalFile: file,
                  previewUrl: URL.createObjectURL(file),
                  // 处理相关字段（初始值）
                  processing: false,
                  progress: 0,
                  compressed: false,
                  compressedSize: 0,
                  compressedFormattedSize: '',
                  compressedWidth: 0,
                  compressedHeight: 0,
                  compressionRatio: 0 // 压缩比率（越小压缩越多）
                }

                res(detail)
              }

              img.onerror = (err) => rej(err)
              img.src = e.target.result
            }

            reader.onerror = (err) => rej(err)
            reader.readAsDataURL(file)
          })
        })

        Promise.all(promises)
          .then(details => {
            this.state.inputFileDetail = details
            resolve(details)
          })
          .catch(err => reject(err))
      })
    },

    // 批量调整图片大小
    resizeImages () {
      return new Promise((resolve, reject) => {
        const {
          quality,
          scaleMode,
          ratio,
          dimensionMode,
          fixedWidth,
          fixedHeight
        } = this.state.compressConfig

        const totalFiles = this.state.inputFileDetail.length
        let completedFiles = 0

        // 重置进度
        this.state.processProgress = 0

        const promises = this.state.inputFileDetail.map((detail, index) => {
          return new Promise((res, rej) => {
            // 标记开始处理当前文件
            detail.processing = true
            detail.progress = 0
            this.state.currentProcessing = index

            const img = new Image()

            img.onload = () => {
              // 更新进度：图片加载完成（30%）
              detail.progress = 30
              this.state.processProgress = Math.round(((completedFiles * 100) + 30) / totalFiles)

              let width = img.width
              let height = img.height

              // 计算新尺寸（50%进度）
              if (scaleMode === 'ratio') {
                const scale = ratio / 100
                width = Math.round(width * scale)
                height = Math.round(height * scale)
              } else {
                switch (dimensionMode) {
                  case 'fixed':
                    width = fixedWidth
                    height = fixedHeight
                    break
                  case 'width':
                    const widthRatio = fixedWidth / width
                    height = Math.round(height * widthRatio)
                    width = fixedWidth
                    break
                  case 'height':
                    const heightRatio = fixedHeight / height
                    width = Math.round(width * heightRatio)
                    height = fixedHeight
                    break
                }
              }

              // 更新进度：尺寸计算完成（50%）
              detail.progress = 50
              this.state.processProgress = Math.round(((completedFiles * 100) + 50) / totalFiles)

              // 创建canvas并绘制调整后的图片
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              canvas.width = width
              canvas.height = height

              ctx.drawImage(img, 0, 0, width, height)

              // 更新进度：绘制完成（70%）
              detail.progress = 70
              this.state.processProgress = Math.round(((completedFiles * 100) + 70) / totalFiles)

              // 将canvas内容转换为Blob
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    rej(new Error('Failed to create blob from canvas'))
                    return
                  }

                  // 计算压缩比率（新大小/原始大小）
                  const compressionRatio = blob.size / detail.size

                  // 构建处理后的文件详细信息
                  const outputDetail = {
                    id: detail.id,
                    name: detail.name,
                    type: blob.type,
                    size: blob.size,
                    formattedSize: this.formatFileSize(blob.size),
                    width,
                    height,
                    compressedFile: new File([blob], detail.name, { type: blob.type }),
                    previewUrl: URL.createObjectURL(blob),
                    compressionRatio
                  }

                  // 更新原始文件详情，添加处理后的数据
                  Object.assign(detail, {
                    processing: false,
                    progress: 100,
                    compressed: true,
                    compressedSize: blob.size,
                    compressedFormattedSize: outputDetail.formattedSize,
                    compressedWidth: width,
                    compressedHeight: height,
                    compressionRatio,
                    compressedPreviewUrl: outputDetail.previewUrl
                  })

                  // 更新整体进度
                  completedFiles++
                  this.state.processProgress = Math.round((completedFiles / totalFiles) * 100)

                  res(outputDetail)
                },
                detail.type,
                quality
              )
            }

            img.onerror = (err) => {
              detail.processing = false
              rej(err)
            }

            img.src = detail.previewUrl
          })
        })

        Promise.all(promises)
          .then(details => {
            this.state.outputFileDetail = details
            this.state.outputFiles = details.map(d => d.compressedFile)
            resolve({
              details,
              inputDetails: this.state.inputFileDetail
            })
          })
          .catch(err => reject(err))
      })
    }
  }
}
