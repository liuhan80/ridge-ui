// 将csv字符串转换为二维数组，用空格或者逗号作为间隔，数组可以选择行模式或者模式。 返回数组 如出错返回空白数组
const csvToArray = (text, type = 'column') => {
  try {
    // 检查输入是否为有效字符串
    if (typeof text !== 'string' || text.trim() === '') {
      return []
    }

    // 按行分割文本，处理可能的空行
    const rows = text.split('\n')
      .map(row => row.trim())
      .filter(row => row.length > 0)

    // 处理每行，使用逗号或空格作为分隔符
    const matrix = rows.map(row => {
      // 先按逗号分割，再处理可能的空格分隔
      return row.split(',').flatMap(part =>
        part.split(/\s+/).filter(item => item.length > 0)
      )
    })

    // 如果是列模式，需要转置矩阵
    if (type === 'column' && matrix.length > 0) {
      // 找到最长的行长度，确保转置后的矩阵结构完整
      const maxLength = Math.max(...matrix.map(row => row.length))

      // 转置矩阵
      const transposed = []
      for (let i = 0; i < maxLength; i++) {
        const column = []
        for (let j = 0; j < matrix.length; j++) {
          // 对于长度不足的行，用空字符串填充
          column.push(matrix[j][i] || '')
        }
        transposed.push(column)
      }
      return transposed
    }

    // 行模式直接返回处理后的矩阵
    return matrix
  } catch (error) {
    // 发生任何错误都返回空数组
    console.error('CSV转换错误:', error)
    return []
  }
}

export { csvToArray }
