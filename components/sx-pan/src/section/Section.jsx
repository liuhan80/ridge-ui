import React, { useRef } from 'react'
import { Table } from 'antd'
import { useSize } from 'ahooks'
import './style.css'

import { getCssAlignedGradientColor } from './color.js'

const HotTable = ({
  colorStops = [
    { position: 0, color: '#11AB84' }, // CSS: 0%
    { position: 48, color: '#F6BD16' }, // CSS: 48%（原50%改为48%）
    { position: 100, color: '#FF6400' } // CSS: 100%
  ],
  columns = [{
    dataIndex: 'name',
    align: 'left'
  },
  {
    title: '总得分',
    dataIndex: 'total'
  },
  {
    title: '电量',
    dataIndex: 'energy'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '故障',
    dataIndex: 'error'
  },
  {
    title: '一次接线图',
    dataIndex: 'line'
  }
  ],
  dataSource = [],
  cellClicked
}) => {
  const tableContainerRef = useRef(null)
  const size = useSize(tableContainerRef)

  const columnRender = column => {
    return (value, record) => {
      return (
        <div
          className='hot-cell' style={{
            backgroundColor: getCssAlignedGradientColor(value, colorStops)
          }} onClick={e => {
            cellClicked && cellClicked({
              ...column,
              value,
              record
            })
          }}
        >
          {value}
        </div>
      )
    }
  }

  const finalColumns = columns.map((column, index) => {
    if (!column.dataIndex) {
      return null
    }
    const result = {
      ...column
    }
    if (index > 0) {
      result.sorter = {
        compare: (a, b) => a[column.dataIndex] - b.error
      }
      result.render = columnRender(column)
    }
    return result
  }).filter(c => c)
  return (
    <div className='full-size-hidden hot-table-container' ref={tableContainerRef}>
      {size &&
        <Table
          table
          scroll={{
            y: size.height - 54
          }}
          style={{
            width: size.width + 'px' // leftShow ? 'calc(100vw - 960px)' : 'calc(100vw - 553px)'
          }}
          className='hot-table'
          rowHoverable={false}
          columns={finalColumns} dataSource={dataSource} pagination={false}
        />}
    </div>
  )
}

export default HotTable
