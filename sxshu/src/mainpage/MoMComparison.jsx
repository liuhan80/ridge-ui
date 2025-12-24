import React, { useEffect, useState, useRef } from 'react'
import SectionBox from '../components/section/SectionBox'
import { Segmented, DatePicker, Table, Select } from 'antd'
import homeStore from '../store/home'

import useTableScrollHeightRef from '../utils/useTableScrollHeight'

const columns = [
  {
    width: '56px',
    title: '序号',
    dataIndex: 'serialNumber',
    className: 'column-name',
  },
  {
    className: 'column-score',
    width: '96px',
    title: '场站名称',
    dataIndex: 'windFarmName',
  },
  {
    title: '场站得分',
    width: '52px',
    className: 'column-score',
    dataIndex: 'score'
  },
  {
    title: '同比得分',
    width: '52px',
    className: 'column-score',
    dataIndex: 'yearOnYearScore'
  },
  {
    title: '同比排名',
    width: '52px',
    className: 'column-score',
    dataIndex: 'yearOnYearRank',
  },
  {
    title: '场站排名',
    width: '52px',
    className: 'column-score',
    dataIndex: 'stationRank',
  }
];


const Content = () => {
  const tableRef = useRef(null)
  const [tableScrollY] = useTableScrollHeightRef(tableRef, 116)
  const rankFarmList = homeStore(state => state.rankFarmList)
  const provincesList = homeStore(state => state.provincesList)

  const [showProvince, setShowProvince] = useState('')
  return <div className='mom-comparison' ref={tableRef}>
    <div className="position">
      <Segmented
        onChange={ev => {
          console.log('ev', ev)
        }}
        options={['全国', '省份']}
      />
      <Select style={{ width: 90, height: 32 }} options={provincesList}></Select>
      <DatePicker size='small' style={{ width: 120, height: '32px' }} onChange={() => {}} picker="month" />
    </div>
    <Table
      className='sx-table mom-table'
      scroll={{
        y: tableScrollY
      }}
      columns={columns} dataSource={rankFarmList} pagination={false}></Table>
  </div>
}

const MoMComparison = () => {
  return <SectionBox title='同环比情况' content={<Content></Content>} >
  </SectionBox>
}

export default MoMComparison