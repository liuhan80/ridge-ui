import React, { useEffect, useState } from 'react'
import { DatePicker, Table, Tag, Space, Select, Button } from 'antd'
import reviewStore from '../store/review'

import CommonTablePage from '../components/common-table/ComonTablePage'

import useTableScrollHeight from '../utils/useTableScrollHeight'
import BreakdownDetailModal from './BreakdownDetailModal'
import BreakdownDetailModal2 from './BreakdownDetailModal2'

import './style.css'

const { RangePicker } = DatePicker;

const ReviewTable = () => {
  const tableScrollY = useTableScrollHeight('table-container', 96);
  const breakDownTableData = reviewStore(state => state.breakDownTableData);
  const [reviewItem, setReviewItem] = useState({})
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailModalVisible2, setDetailModalVisible2] = useState(false);

  const renderCell = label => {
    return (value, record, index) => {
      return <Button type='link' onClick={() => {
        setReviewItem({ ...record, 
          currentLabel: label,
          currentValue: value
        })
        if (label === '准确性') {
          setDetailModalVisible2(true)
        } else {
          setDetailModalVisible(true)
        }
      }}>{value}</Button>
    };
  }
  

  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      width: '60px',
      align: 'center',
    },
    {
      title: '省份',
      width: '240px',
      dataIndex: 'province',
    },
    {
      title: '场站名称',
      dataIndex: 'stationName',
    },
    {
      title: '总得分',
      dataIndex: 'totalScore',
      width: '140px',
      align: 'center',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '完整性(%)',
      dataIndex: 'integrity',
      align: 'center',
      render: renderCell('完整性'),
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '一致性(%)',
      dataIndex: 'consistency',
      align: 'center',
      render: renderCell('一致性'),
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '唯一性(%)',
      dataIndex: 'uniqueness',
      render: renderCell('唯一性'),
      align: 'center',
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '有效性(%)',
      dataIndex: 'validity',
      render: renderCell('有效性'),
      align: 'center',
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '准确性(%)',
      dataIndex: 'accuracy',
      render: renderCell('准确性'),
      align: 'center',
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
  ];

  return <div className='table-page'>
    <div className='content-container'>
      <div className="action-bar">
        <div>省份</div>
        <Select style={{ width: '120px' }}></Select>
        <div>场站名称</div>
        <Select style={{ width: '280px' }}></Select>
        <div>报告状态</div>
        <RangePicker style={{ width: '260px' }} />
        <div>查询时间</div>
        <button className="main">查询</button>
        <button className="reset">重置</button>
        <button style={{
          marginLeft: 'auto'
        }}>报告上传</button>
      </div>
      <div className="table-container">
        <Table
          className='sx-table-normal'
          scroll={{
            y: tableScrollY
          }}
          pagination={{
            showQuickJumper: true,
            pageSize: 20,
            // 显示总条数（关键：实现共xx条信息，自定义显示文案）
            showTotal: (total, range) => {
              // total：总条数；range：当前页的条数范围，如[1,10]
              return `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`;
              // 极简版：直接返回`共 ${total} 条`即可
              // return `共 ${total} 条`;
            },
            showSizeChanger: true
          }}
          columns={columns} dataSource={breakDownTableData} ></Table>
      </div>

      <BreakdownDetailModal reviewItem={reviewItem} visible={detailModalVisible} onClose={() => {
        setDetailModalVisible(false)
      }}></BreakdownDetailModal>


      <BreakdownDetailModal2 reviewItem={reviewItem} visible={detailModalVisible2} onClose={() => {
        setDetailModalVisible2(false)
      }}></BreakdownDetailModal2>

    </div>
  </div>
}

const BreakDownTablePage = () => {
  const [reviewItem, setReviewItem] = useState({})
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailModalVisible2, setDetailModalVisible2] = useState(false);

  const renderCell = label => {
    return (value, record, index) => {
      return <Button type='link' onClick={() => {
        setReviewItem({ ...record, 
          currentLabel: label,
          currentValue: value
        })
        if (label === '准确性') {
          setDetailModalVisible2(true)
        } else {
          setDetailModalVisible(true)
        }
      }}>{value}</Button>
    };
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      width: '60px',
      align: 'center',
    },
    {
      title: '省份',
      width: '240px',
      dataIndex: 'province',
    },
    {
      title: '场站名称',
      dataIndex: 'stationName',
    },
    {
      title: '总得分',
      dataIndex: 'totalScore',
      width: '140px',
      align: 'center',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '完整性(%)',
      dataIndex: 'integrity',
      align: 'center',
      render: renderCell('完整性'),
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '一致性(%)',
      dataIndex: 'consistency',
      align: 'center',
      render: renderCell('一致性'),
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '唯一性(%)',
      dataIndex: 'uniqueness',
      render: renderCell('唯一性'),
      align: 'center',
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '有效性(%)',
      dataIndex: 'validity',
      render: renderCell('有效性'),
      align: 'center',
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
    {
      title: '准确性(%)',
      dataIndex: 'accuracy',
      render: renderCell('准确性'),
      align: 'center',
      width: '140px',
      sorter: (a, b) => a.totalScore - b.totalScore,
    },
  ];

  return <>
    <CommonTablePage actionBar={
    <>
      <div>省份</div>
        <Select style={{ width: '120px' }}></Select>
        <div>场站名称</div>
        <Select style={{ width: '280px' }}></Select>
        <div>报告状态</div>
        <RangePicker style={{ width: '260px' }} />
        <div>查询时间</div>
        <button className="main">查询</button>
        <button className="reset">重置</button>
        <button style={{
          marginLeft: 'auto'
        }}>报告上传</button>
    </>
    } storeName='break-down' columns={columns} requestUrl='/public/break-down-list.json' ></CommonTablePage>

    <BreakdownDetailModal reviewItem={reviewItem} visible={detailModalVisible} onClose={() => {
        setDetailModalVisible(false)
    }}></BreakdownDetailModal>

    <BreakdownDetailModal2 reviewItem={reviewItem} visible={detailModalVisible2} onClose={() => {
        setDetailModalVisible2(false)
    }}></BreakdownDetailModal2>
  </>
}


export default BreakDownTablePage