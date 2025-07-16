import React from 'react'
import { TreeSelect } from '@douyinfe/semi-ui'
import { mapOptionToTree } from '../utils'
export default ({
  value = '',
  multiple,
  leafOnly,
  defaultExpandAll,
  treeData = [],
  checkRelation,
  filterTreeNode,
  disabled,
  size,
  input,
  onLoadData,
  onChange
}) => {
  return (
    <TreeSelect
      value={value}
      loadData={async (node) => {
        return onLoadData(node)
      }}
      treeData={mapOptionToTree(treeData)}
      size={size}
      multiple={multiple}
      leafOnly={leafOnly}
      checkRelation={checkRelation}
      filterTreeNode={filterTreeNode}
      searchPosition='trigger'
      disabled={disabled}
      defaultExpandAll={defaultExpandAll}
      onChange={(selectedKey, selected) => {
        if (!multiple && leafOnly) {
          if (!selected.children) {
            input && input(selectedKey)
            onChange && onChange(selectedKey)
          }
        } else {
          input && input(selectedKey)
          onChange && onChange(selectedKey)
        }
      }}
      style={{
        width: '100%'
      }}
    />
  )
}
