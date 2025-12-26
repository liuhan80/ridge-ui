import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Modal } from 'antd'
import CommonTablePage from '../components/common-table/ComonTablePage'
import LocalTable from '../components/common-table/LocalTable'
import LabelValue from '../components/label-value/LabelValue'
const StatusBookTable = () => {
  const [detailViewModalVisible, setDetailViewModalVisible] = useState(false)
  const columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 76, align: 'center' },
    // { title: '省份', dataIndex: 'province', key: 'province', width: 120, align: 'center' },
    { title: '场站', dataIndex: 'stationName', key: 'stationName' },
    { title: '设备类型', dataIndex: 'type', key: 'type', width: 160, align: 'center' },
    { title: '生产厂家全称', dataIndex: 'manufacturerFullName', key: 'manufacturerFullName', width: 220, align: 'center' },
    { title: '规格型号', dataIndex: 'specModel', key: 'specModel', width: 220, align: 'center' },
    { title: '物理设备描述', dataIndex: 'physicalDeviceDesc', key: 'physicalDeviceDesc', width: 160, align: 'center' },
    { title: '逻辑设备编码', dataIndex: 'logicalDeviceCode', key: 'logicalDeviceCode', width: 180, align: 'center' },
    { title: '逻辑设备描述', dataIndex: 'logicalDeviceDesc', key: 'logicalDeviceDesc', width: 180, align: 'center' },
    {
      title: '操作',
      width: 160,
      key: 'action',
      align: 'center',
      render: (value, record) => (
        <span>
          <a
            style={{ marginRight: 8 }} onClick={() => {
              setDetailViewModalVisible(true)
            }}
          >状态字典
          </a>
          <a>删除</a>
        </span>
      )
    }
  ]

  const DetailModal = () => {
    const dcolumns = [
      {
        title: '状态值',
        dataIndex: 'statusValue',
        key: 'statusValue',
        width: 80,
        align: 'center'
      },
      {
        title: '状态描述',
        dataIndex: 'statusDesc',
        key: 'statusDesc',
        align: 'center'
      }
    ]
    return (
      <Modal
        title='状态字典详情'
        open={detailViewModalVisible}
        onCancel={() => {
          setDetailViewModalVisible(false)
        }}
        footer={false}
      >
        <div style={{
          height: '646px',
          display: 'flex',
          flexDirection: 'column'
        }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px'
          }}>
            <LabelValue label='创建方式:' value='新增字典' />
            <LabelValue label='字典名称' value='新增字典' />
          </div>
          <LocalTable
            columns={dcolumns} requestUrl='./public/status-dict.json' storeName='status-dict'
          />
        </div>
      </Modal>
    )
  }

  return (
    <>
      <CommonTablePage storeName='status-book' requestUrl='./public/status-book.json' columns={columns} />
      <DetailModal />
    </>
  )
}

export default StatusBookTable
