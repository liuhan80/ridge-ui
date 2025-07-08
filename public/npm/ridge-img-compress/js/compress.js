export default {
  name: 'ImageCompress',
  state: {
    inputFiles: [],           // 用户选择的原始文件列表
    inputFileDetail: [],      // 原始文件详细信息
    outputFiles: [],          // 处理后的文件列表
    outputFileDetail: [],     // 处理后的文件详细信息
    compressConfig: {         // 压缩配置
      quality: 0.7,           // 压缩质量 (0-1)
      scaleMode: 'ratio',     // 缩放模式: 'ratio' | 'dimension'
      ratio: 50,              // 缩放比例百分比 (1-100)
      dimensionMode: 'fixed', // 尺寸模式: 'fixed' | 'width' | 'height'
      fixedWidth: 800,        // 固定宽度
      fixedHeight: 600,       // 固定高度
    }
  },
  actions: {
    // 提取输入图片信息
    extractInputImageInfo() {
      return new Promise((resolve, reject) => {
        const promises = this.state.inputFiles.map((file, index) => {
          return new Promise((res, rej) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
              const img = new Image();
              
              img.onload = () => {
                // 构建图片详细信息对象
                const detail = {
                  id: index,
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  width: img.width,
                  height: img.height,
                  originalFile: file,
                  previewUrl: URL.createObjectURL(file)
                };
                
                res(detail);
              };
              
              img.onerror = (err) => rej(err);
              img.src = e.target.result;
            };
            
            reader.onerror = (err) => rej(err);
            reader.readAsDataURL(file);
          });
        });
        
        Promise.all(promises)
          .then(details => {
            this.state.inputFileDetail = details;
            resolve(details);
          })
          .catch(err => reject(err));
      });
    },
    
    // 批量调整图片大小
    resizeImages() {
      return new Promise((resolve, reject) => {
        const { 
          quality, 
          scaleMode, 
          ratio, 
          dimensionMode, 
          fixedWidth, 
          fixedHeight 
        } = this.state.compressConfig;
        
        const promises = this.state.inputFileDetail.map(detail => {
          return new Promise((res, rej) => {
            const img = new Image();
            
            img.onload = () => {
              let width = img.width;
              let height = img.height;
              
              // 根据不同缩放模式计算新尺寸
              if (scaleMode === 'ratio') {
                // 按比例缩放
                const scale = ratio / 100;
                width = Math.round(width * scale);
                height = Math.round(height * scale);
              } else {
                // 按尺寸缩放
                switch (dimensionMode) {
                  case 'fixed':
                    // 固定宽高，可能会改变比例
                    width = fixedWidth;
                    height = fixedHeight;
                    break;
                  case 'width':
                    // 固定宽度，保持比例
                    const widthRatio = fixedWidth / width;
                    height = Math.round(height * widthRatio);
                    width = fixedWidth;
                    break;
                  case 'height':
                    // 固定高度，保持比例
                    const heightRatio = fixedHeight / height;
                    width = Math.round(width * heightRatio);
                    height = fixedHeight;
                    break;
                }
              }
              
              // 创建canvas并绘制调整后的图片
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = width;
              canvas.height = height;
              
              ctx.drawImage(img, 0, 0, width, height);
              
              // 将canvas内容转换为Blob
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    rej(new Error('Failed to create blob from canvas'));
                    return;
                  }
                  
                  // 构建处理后的文件详细信息
                  const outputDetail = {
                    id: detail.id,
                    name: detail.name,
                    type: blob.type,
                    size: blob.size,
                    width: width,
                    height: height,
                    compressedFile: new File([blob], detail.name, { type: blob.type }),
                    previewUrl: URL.createObjectURL(blob)
                  };
                  
                  res(outputDetail);
                },
                detail.type,
                quality
              );
            };
            
            img.onerror = (err) => rej(err);
            img.src = detail.previewUrl;
          });
        });
        
        Promise.all(promises)
          .then(details => {
            this.state.outputFileDetail = details;
            this.state.outputFiles = details.map(d => d.compressedFile);
            resolve(details);
          })
          .catch(err => reject(err));
      });
    }
  }
}