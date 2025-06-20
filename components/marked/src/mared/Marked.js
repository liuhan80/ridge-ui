import React, { useEffect } from 'react'
import './github-markdown.css'

const dataURLtoBlob = async (dataURL) => {
  const res = await fetch(dataURL)
  const blob = await res.blob()
  return blob
}

const dataURLToString = async dataURL => {
  const blob = await dataURLtoBlob(dataURL)
  return await blob.text()
}

export default ({
  transparent,
  mdfile,
  baseFontSize,
  mdstring,
  classList
}) => {
  const ref = React.createRef()
  const style = {
    fontSize: baseFontSize + 'px'
  }

  if (transparent) {
    style.background = 'transparent'
  }
  useEffect(() => {
    if (mdfile) {
      dataURLToString(mdfile).then(text => {
        ref.current.innerHTML = window.marked.parse(text)
      })
    } else if (mdstring) {
      ref.current.innerHTML = window.marked.parse(mdstring)
    }
    ref.current.scrollTop = 0
  })
  return <div className={classList.join(' ') + ' markdown-body'} style={style} ref={ref} />
}
