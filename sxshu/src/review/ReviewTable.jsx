import React, { useEffect, useState } from 'react'
import { DatePicker, Table, Tag, Space, Select } from 'antd'
import { useNavigate } from 'react-router-dom'

import CommonTablePage from '../components/common-table/ComonTablePage'
import reviewStore from '../store/review'
import useTableScrollHeight from '../utils/useTableScrollHeight'

import './style.css'

const { RangePicker } = DatePicker;

const ReviewTable = () => {
  const tableScrollY = useTableScrollHeight('review-table', 96);
  const reviewTableData = reviewStore(state => state.reviewTableData);
   // 获取导航方法
  const navigate = useNavigate();

  const onHeaderClick = column => ({
    onClick: () => {
      navigate({
        pathname: '/breakdown',
        search: new URLSearchParams({
          dataIndex: column.dataIndex
        }).toString()
      });

      // console.log('表头被点击了', '列名：', column.title, '字段：', column.dataIndex);
      // 这里可以添加你的业务逻辑，比如自定义排序、筛选等
    }
  })

  const columns = [
    {
      width: '64px',
      title: '排名',
      dataIndex: 'ranking', // 补充排名的英文字段名
    },
    {
      title: '省份',
      dataIndex: 'province',
    },
    {
      title: '场站名称',
      dataIndex: 'station',
    },
    {
      title: '主接线图',
      dataIndex: 'mainWiringDiagram', // 现为得分字段
       // 给当前列的表头绑定点击事件
       onHeaderCell: onHeaderClick
    },
    {
      title: '电量数据',
      dataIndex: 'powerData',
      onHeaderCell: onHeaderClick
    },
    {
      title: '状态数据',
      dataIndex: 'statusData',
      onHeaderCell: onHeaderClick
    },
    {
      title: '故障数据',
      dataIndex: 'faultData',
      onHeaderCell: onHeaderClick
    },
    {
      title: '总得分',
      dataIndex: 'totalScore',
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
      <div className="table-container review-table">
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
          columns={columns} dataSource={reviewTableData} ></Table>
      </div>
    </div>
  </div>
}

const ReviewTablePage = () => {

    // 获取导航方法
    const navigate = useNavigate();

    const onHeaderClick = column => ({
      onClick: () => {
        navigate({
          pathname: '/breakdown',
          search: new URLSearchParams({
            dataIndex: column.dataIndex
          }).toString()
        });
  
        // console.log('表头被点击了', '列名：', column.title, '字段：', column.dataIndex);
        // 这里可以添加你的业务逻辑，比如自定义排序、筛选等
      }
    })
  
    const columns = [
      {
        width: '64px',
        title: '排名',
        dataIndex: 'ranking', // 补充排名的英文字段名
      },
      {
        title: '省份',
        dataIndex: 'province',
      },
      {
        title: '场站名称',
        dataIndex: 'station',
      },
      {
        title: '主接线图',
        dataIndex: 'mainWiringDiagram', // 现为得分字段
         // 给当前列的表头绑定点击事件
         onHeaderCell: onHeaderClick
      },
      {
        title: '电量数据',
        dataIndex: 'powerData',
        onHeaderCell: onHeaderClick
      },
      {
        title: '状态数据',
        dataIndex: 'statusData',
        onHeaderCell: onHeaderClick
      },
      {
        title: '故障数据',
        dataIndex: 'faultData',
        onHeaderCell: onHeaderClick
      },
      {
        title: '总得分',
        dataIndex: 'totalScore',
      },
    ];

  return <CommonTablePage actionBar={<>
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
  </>} storeName='review' requestUrl='/public/review-list.json' columns={columns} ></CommonTablePage>
}


export default ReviewTablePage