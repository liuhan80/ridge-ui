import React, { useEffect, useState }  from 'react'
import { DatePicker, Table, Tag, Space } from 'antd'
import reportStore from '../store/report'

import './style.css'

const { RangePicker } = DatePicker;
const columns = [
    {
        width: '64px',
        title: '序号',
        dataIndex: 'number',
        className: 'column-name',
    },
    {
        title: '报告名称',
        dataIndex: 'name',
    },
    {
        title: '发布时间',
        dataIndex: 'published',
    },
    {
        title: '发布状态',
        dataIndex: 'status',
        render: value => {
            if (value === '已发布') {
                return <Tag color='green' >
                    {value}
                </Tag>
            }
            if (value === '审核中') {
                return <Tag color='green' >
                    {value}
                </Tag>
            }
        }
    },
    {
        title: '发布人',
        dataIndex: 'publisher'
    },
    {
        title: '推送状态',
        dataIndex: 'pushState',
        width: 120,
        render: () => {
            return <Tag color='green' >
                '已推送'
            </Tag>
        }
    }
];


const Report = () => {
    // 1. 定义状态：存储Table的scroll.y像素值
      const [tableScrollY, setTableScrollY] = useState(0);
    const reportTableData = reportStore(state => state.reportTableData)


    // 3. useEffect：计算高度（组件挂载+窗口大小变化时触发）
    useEffect(() => {
    // 定义计算高度的函数
    const calculateTableHeight = () => {
        const qulityTable = document.querySelector('.report')

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
    
    return <div className='report'>
        <div className='report-container'>
            <div className="action-bar">
                <div>报告状态</div>
                <RangePicker style={{ width: '260px' }} />
                <div>查询时间</div>
                <button className="main">查询</button>
                <button className="reset">重置</button>
                <button style={{
                    marginLeft: 'auto'
                }}>报告上传</button>
            </div>
            <div className="report-table">
                <Table
                    className='sx-table-normal'
                    scroll={{
                        y: tableScrollY
                    }}
                    pagination={{
                        showQuickJumper: true,
                        pageSize: 25,
                        // 显示总条数（关键：实现共xx条信息，自定义显示文案）
                        showTotal: (total, range) => {
                            // total：总条数；range：当前页的条数范围，如[1,10]
                            return `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`;
                            // 极简版：直接返回`共 ${total} 条`即可
                            // return `共 ${total} 条`;
                        },
                        showSizeChanger: true
                    }}
                    columns={columns} dataSource={reportTableData} ></Table>
            </div>
        </div>
    </div>
}


export default Report