import React, {  useState } from 'react'
import { DatePicker, Table, Tag, Space, Modal  } from 'antd'
import './style.css'
import SectionBox from '../components/section/SectionBox';

import BarChart from '../components/column_chart/ColumnChart.jsx'
import CenterRing from './CenterRing.jsx'
const { RangePicker } = DatePicker;
import caseStore from '../store/case'
import AnalysisModal from './AnalysisModal';

const CaseAnalysis = () => {
    const columnXData = caseStore(state => state.columnXData)
    const columnSeries = caseStore(state => state.columnSeries)
    const mainProviderData = caseStore(state => state.mainProviderData)
    const inverterManufacturer = caseStore(state => state.inverterManufacturer)
    const caseTableData = caseStore(state => state.caseTableData)

    const [open, setOpen] = useState(false)
    const [caseObject, setCaseObject] = useState(null)
    
    
    const columns = [
        {
            width: '72px',
            title: '序号',
            dataIndex: 'number',
            className: 'center',
        },
        {
            title: '剖析案例',
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
            title: '操作',
            className: 'column-score',
            width: 140,
            render: (value, record) => {
                return <Space size="middle">
                <a onClick={() => {
                    onCaseClick(record)
                }}>分析详情</a>
                <a>删除</a>
            </Space>
            }
        }
    ];

    const onCaseClick = record => {
        setCaseObject(record)
        setOpen(true)
    }
    return <div className='case-analysis sx-page'>
        <div className='case-analysis-content'>
            <div className="action-bar">
                <div>查询时间</div>
                <RangePicker style={{ width: '260px' }} />
                <button className="main">查询</button>
                <button className="reset">重置</button>

                <button style={{
                    marginLeft: 'auto'
                }}>新增案例</button>
            </div>
            <div className="chart-list">
                <SectionBox title='柱状分析图' content={<BarChart xData={columnXData} height={265} seriesData={columnSeries}></BarChart>}></SectionBox>
                <SectionBox title='主机厂家分析图' content={<CenterRing ringData={mainProviderData}></CenterRing>}></SectionBox>
                <SectionBox title='逆变器厂家分析图' content={<CenterRing ringData={inverterManufacturer}></CenterRing>}></SectionBox>
            </div>
            <div className="chart-table">
                <Table
                    className='sx-table-normal'
                    scroll={{
                        y: 320
                    }}
                    bordered
                    pagination={{
                        showQuickJumper: true,
                        // 显示总条数（关键：实现共xx条信息，自定义显示文案）
                        showTotal: (total, range) => {
                            // total：总条数；range：当前页的条数范围，如[1,10]
                            return `共 ${total} 条记录，当前显示 ${range[0]}-${range[1]} 条`;
                            // 极简版：直接返回`共 ${total} 条`即可
                            // return `共 ${total} 条`;
                        },
                        showSizeChanger: true
                    }}
                    columns={columns} dataSource={caseTableData} ></Table>
            </div>
        </div>

        <AnalysisModal visible={open} caseObject={caseObject} onClose={() => {
            setOpen(false)
        }}></AnalysisModal>
    </div>
}


export default CaseAnalysis