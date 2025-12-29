import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // 注：若不再使用，可删除此导入
import { Segmented, DatePicker, Table, Select } from 'antd';
import { getCssAlignedGradientColor } from '../utils/utils';
// 导入独立的浮层组件
import GlobalPopoverQuality from './GlobalPopoverQuality'; // 路径根据实际项目调整
import ProvinceAppealForm from '../appeal/ProvinceAppealForm';
import AppealCreateModal from '../appeal/AppealCreateModal';

import homeStore from '../store/home'
import globalStore from '../store/globals'
import appealStore from '../store/appeal'

import slideImage from '../assets/image/slider.png'
const { RangePicker } = DatePicker;

const RegionalDataQuality = () => {
  // 1. 定义状态：存储Table的scroll.y像素值
  const [tableScrollY, setTableScrollY] = useState(0);
  const scores = homeStore(state => state.scores);
  const rootRef = useRef(null)
  const [tableWidth, setTableWidth] = useState('535px');
  
  const [appealVisible, setAppealVisible] = useState(false);

  const [clickedRecord, setClickedRecord] = useState({});
  const [clickedObject, setClickedObject] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const [segName, setSegName] = useState('全国')
  
  const leftShow = homeStore(state => state.leftShow)
  const provinces = globalStore(state => state.provinces)
  const createAppealHome = appealStore(state => state.createAppealHome)


  // 处理单元格点击事件
  const handleCellClick = (e) => {
    // 更新浮层位置（基于鼠标点击的坐标，也可以用元素的位置）
    setPopoverPosition({
      x: e.clientX,
      y: e.clientY
    });
    setPopoverVisible(true);
  };

  const columnRender = (value, record, label) => {
    return <div className="hot-cell" style={{
      backgroundColor: getCssAlignedGradientColor(value),
    }} onClick={e => {
      if (label === '总得分') {
        return;
      }
      setClickedObject([label, value, columns.find(t => t.title === label).dataIndex]);
      setClickedRecord(record);
      handleCellClick(e)
    }}>
      {value}
    </div>
  }

  const columns = [
    {
      width: '56px',
      dataIndex: 'name',
      className: 'column-name',
    },
    {
      className: 'column-score',
      width: '20%',
      render: (value, record) => {
        return columnRender(value, record, '总得分')
      },
      title: '总得分',
      sorter: {
        compare: (a, b) => a.total - b.total
      },
      dataIndex: 'total',
    },
    {
      title: '电量',
      render: (value, record) => {
        return columnRender(value, record, '电量')
      },
      width: '20%',
      className: 'column-score',
      dataIndex: 'energy',
      sorter: {
        compare: (a, b) => a.energy - b.energy
      },
    },
    {
      title: '状态',
      render: (value, record) => {
        return columnRender(value, record, '状态')
      },
      width: '20%',
      className: 'column-score',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.status - b.status
      },
    },
    {
      title: '故障',
      render: (value, record) => {
        return columnRender(value, record, '故障')
      },
      width: '20%',
      className: 'column-score',
      dataIndex: 'error',
      sorter: {
        compare: (a, b) => a.error - b.error
      },
    },
    {
      title: '一次接线图',
      render: (value, record) => {
        return columnRender(value, record, '一次接线图')
      },
      width: '20%',
      className: 'column-score',
      dataIndex: 'line',
      sorter: {
        compare: (a, b) => a.line - b.line
      },
    }
  ];

  // 2. 定义ref：绑定table-container和图片元素
  const tableContainerRef = useRef(null)

  // 3. useEffect：计算高度（组件挂载+窗口大小变化时触发）
  useEffect(() => {
    // 定义计算高度的函数
    const calculateTableHeight = () => {
      const qulityTable = document.querySelector('.table-container')

      if (qulityTable) {
        const containerHeight = qulityTable.clientHeight;
        // 获取图片的实际高度（像素值）
        setTableScrollY(Math.max(0, containerHeight - 46));
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

  // 新增：关闭浮层的方法
  const handlePopoverClose = appeal => {
    setPopoverVisible(false);
    if (appeal) {
      if (clickedRecord) {
        createAppealHome({
          provinceAppealObject: { ...clickedRecord, appealKey: clickedObject[2]}
        })
      }
    }
  };

  useEffect(() => {
    if (rootRef.current) {
      setTableWidth((rootRef.current.clientWidth - 20) + 'px')
    }
  }, [leftShow])

  return <div className='reginal-data-quality' ref={rootRef}>
    <div className='toolbar'>
      <Segmented
        value={segName}
        onChange={val => {
          setSegName(val)
        }}
        options={['全国', '省份']}
      />
      {segName === '省份' && <Select style={{ width: 90, height: 32 }} options={provinces}></Select>}
      <RangePicker style={{ width: '260px' }} />
      <button className="main">查询</button>
    </div>

    <div className="table-container" ref={tableContainerRef}>
      <Table
        scroll={{
          y: tableScrollY
        }}
        style={{
          width: tableWidth //leftShow ? 'calc(100vw - 960px)' : 'calc(100vw - 553px)'
        }}
        className='quality-table'
        rowHoverable={false}
        columns={columns} dataSource={scores} pagination={false} />

      <img className='slider-img' src={slideImage} style={{
      }}></img>
    </div>

    {/* 替换为独立的浮层组件，传递所需props */}
    <GlobalPopoverQuality
      visible={popoverVisible}
      position={popoverPosition}
      clickedRecord={clickedRecord}
      clickedObject={clickedObject}
      getCssAlignedGradientColor={getCssAlignedGradientColor}
      onClose={handlePopoverClose}
    />

    <AppealCreateModal ></AppealCreateModal>
  </div>
}

export default RegionalDataQuality;