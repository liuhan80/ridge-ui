import React, { useEffect, useState }  from 'react'
import { DatePicker, Table, Tag, Space, Select, Button } from 'antd'
import appealStore from '../store/appeal'
import AppealCreateModal from './AppealCreateModal.jsx'

import './style.css'
import StationAppealEditModal from './StationAppealEditModal'

const { RangePicker } = DatePicker;
const columns = [
    {
        width: '64px',
        title: '序号',
        dataIndex: 'number',
        className: 'column-name',
    },
    {
        title: '省份',
        dataIndex: 'province',
        width: 100
    },
    {
        title: '场站名称',
        width: 240,
        dataIndex: 'stationName',
    },
    {
        title: '流程编号',
        dataIndex: 'processNumber',
        width: 140
    },
    {
        title: '申诉类型',
        dataIndex: 'appealType',
        width: 140
    },
    {
        title: '提交人',
        dataIndex: 'committer',
        width: 80
    },
    {
        title: '详细描述',
        dataIndex: 'desc',
    },
    {
        title: '审批状态',
        dataIndex: 'status',
        width: 120,
        render: value => {
            if (value === '已申请') {
                return <Tag className='success' >
                    {value}
                </Tag>
            }
            if (value === '已审核') {
                return <Tag className='primary' >
                    {value}
                </Tag>
            }
            if (value === '待申请') {
                return <Tag className='warn' >
                    {value}
                </Tag>
            }
            if (value === '待审核') {
                return <Tag className='error' >
                    {value}
                </Tag>
            }
        }
    },
    {
        title: '操作',
        width: 200,
        render: value => {
            return <Space>
                <Button type='link'>数据详情</Button>
                <Button type='link'>申请提交</Button>
            </Space>
        }
    }
];

const AppealList = () => {
    // 1. 定义状态：存储Table的scroll.y像素值
    const [tableScrollY, setTableScrollY] = useState(0);
    const [createModalVisible, setCreateModalVisible] = useState(false);
      
    const appealTableData = appealStore(state => state.appealTableData)
    const setCandinateModalVisible = appealStore(state => state.setCandinateModalVisible)

    // 3. useEffect：计算高度（组件挂载+窗口大小变化时触发）
    useEffect(() => {
    // 定义计算高度的函数
    const calculateTableHeight = () => {
        const qulityTable = document.querySelector('.appeal')

        if (qulityTable) {
            const containerHeight = qulityTable.clientHeight;
            // 获取图片的实际高度（像素值）
            setTableScrollY(Math.max(0, containerHeight - 256));
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
    
    return <div className='appeal'>
        <div className='appeal-container'>
            <div className="action-bar">
                <div>省份</div>
                <Select style={{ width: '120px' }}></Select>
                <div>场站名称</div>
                <Select style={{ width: '280px' }}></Select>
                <div>流程编号</div>
                <Select style={{ width: '180px' }}></Select>
                <div>审批状态</div>
                <Select style={{ width: '180px' }}></Select>
                <div>查询时间</div>
                <RangePicker style={{ width: '300px' }} />
                <button className="main">查询</button>
                <button className="reset">重置</button>
                <button style={{
                    marginLeft: 'auto'
                }} onClick={() => {
                    setCandinateModalVisible(true)
                }}>新增申诉</button>
            </div>
            <div className="report-table">
                <Table
                    className='sx-table-normal'
                    scroll={{
                        y: tableScrollY
                    }}
                    pagination={{
                        showQuickJumper: true,
                        pageSize: 50,
                        // 显示总条数（关键：实现共xx条信息，自定义显示文案）
                        showTotal: (total, range) => {
                            // total：总条数；range：当前页的条数范围，如[1,10]
                            return `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`;
                            // 极简版：直接返回`共 ${total} 条`即可
                            // return `共 ${total} 条`;
                        },
                        showSizeChanger: true
                    }}
                    columns={columns} dataSource={appealTableData} ></Table>
            </div>
        </div>
        <AppealCreateModal></AppealCreateModal>
        <StationAppealEditModal></StationAppealEditModal>
    </div>
}


export default AppealList