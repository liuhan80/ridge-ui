import React, { useEffect } from 'react'
import { Table } from '@douyinfe/semi-ui'

export default ({
  columns = [],
  dataSource = [],
  size,
  rowKey,
  selectionChanged,
  onRowClicked,
  onRowDblClicked,
  pagination = false
}) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const convertOptionItemToSemiCol = (item, key) => {
    return Object.assign({}, item, {
      title: item.label,
      dataIndex: item.value
    })
  }
  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: false, // Column configuration not to be checked
      name: record.name
    }),
    onSelect: (record, selected) => {
    },
    onSelectAll: (selected, selectedRows) => {
    },
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows)
      selectionChanged && selectionChanged(selectedRowKeys, selectedRows)
    }
  }

  useEffect(() => {
    setSelectedRows([])
    selectionChanged && selectionChanged([], selectedRows)
  }, [dataSource])

  const onRow = (record, index) => {
    return {
      onClick: event => {
        onRowClicked && onRowClicked(record, index)
      }, // 点击行
      onDoubleClick: event => {
        onRowDblClicked && onRowDblClicked(record, index)
      },
      onMouseEnter: event => {}, // 鼠标移入行
      onMouseLeave: event => {}, // 鼠标移出行
      className: ''
    }
  }
  return <Table rowKey={rowKey} onRow={onRow} selectedRows={selectedRows} size={size} rowSelection={rowSelection} columns={columns.map(convertOptionItemToSemiCol)} dataSource={dataSource} pagination={pagination} />
}
