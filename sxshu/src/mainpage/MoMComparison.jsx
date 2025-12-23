import React, { useEffect, useState } from 'react'
import SectionBox from '../components/section/SectionBox'
import { Segmented, DatePicker, Table, Select } from 'antd'
import homeStore from '../store/home'

const { RangePicker } = DatePicker;

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
  // 1. 定义状态：存储Table的scroll.y像素值
  const [tableScrollY, setTableScrollY] = useState(0);

  // 3. useEffect：计算高度（组件挂载+窗口大小变化时触发）
  useEffect(() => {
    // 定义计算高度的函数
    const calculateTableHeight = () => {
      const qulityTable = document.querySelector('.mom-comparison')

      if (qulityTable) {
        const containerHeight = qulityTable.clientHeight;
        // 获取图片的实际高度（像素值）
        setTableScrollY(Math.max(0, containerHeight - 196));
      }
    };

    calculateTableHeight();

    // 监听窗口大小变化，重新计算高度（适配响应式）
    window.addEventListener('resize', calculateTableHeight);

    // 清理函数：移除事件监听，避免内存泄漏
    return () => {
      window.removeEventListener('resize', calculateTableHeight);
    };
  }, []); // 空依赖：仅在组件挂载时执行（若有依赖数据，可添加到依赖数组）

  const rankFarmList = homeStore(state => state.rankFarmList)
  const provincesList = homeStore(state => state.provincesList)
  return <div className='mom-comparison'>
    <div className="position">
      <Segmented
        options={['全国', '省份']}
      />
      <Select  style={{ width: 250 }} options={provincesList}></Select>
    </div>
    <div className="date-range">
      <RangePicker style={{ width: '260px' }} />
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