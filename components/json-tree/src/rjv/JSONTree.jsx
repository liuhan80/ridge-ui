import React from 'react'
import ReactJsonView from '@microlink/react-json-view'

export default ({
  json,
  theme,
  inverted,
  onChange
}) => {
  const onAddEdit = change => {
    onChange && onChange(change.updated_src)
    return true
  }
  return (
    <ReactJsonView
      src={json} theme={theme + (inverted ? ':inverted' : '')} onEdit={onAddEdit} onAdd={onAddEdit}
    />
  )
}
