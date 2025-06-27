import React from 'react'
import { Highlight } from '@douyinfe/semi-ui'

export default ({
  sourceString,
  searchWords
}) => {
  return (
    <Highlight highlightStyle={{ borderRadius: 4 }} sourceString={sourceString} searchWords={searchWords} />
  )
}
