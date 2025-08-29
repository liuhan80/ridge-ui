import React, { useEffect } from 'react'

const ArrayDataSource = ({
  initValue, // 字符串作为csv文本， 用空格或者逗号作为间隔
  type = 'column', // 内容转换模式
  onChange // 点击确认后，将字符串转换为二维数组， 可以选择行模式或者模式
}) => {
  return (
    <>
      <textarea />
      <button>确认</button>
    </>
  )
}

export default ArrayDataSource
