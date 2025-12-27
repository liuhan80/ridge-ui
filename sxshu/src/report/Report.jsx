import React, { useEffect, useState } from 'react'
import { DatePicker, Table, Tag, Space, Button } from 'antd'
import CommonTablePage from '../components/common-table/ComonTablePage'
import reportStore from '../store/report'
import { getNodeRequestUrl } from '../utils/utils'
import FormModal from '../components/form-modal/FormModal'
import tableStoreFactory from '../store/useStatusBookStore'
import { create } from '../utils/colclient'

import './style.css'

const { RangePicker } = DatePicker;


const ReportPage = () => {
    const [visible, setVisible] = useState(false)

    const caseTableStore = tableStoreFactory.getTableStore('reports')
    const refreshTable = caseTableStore(state => state.refreshTable)

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
            width: 240,
            dataIndex: 'published',
        },
        {
            title: '发布状态',
            dataIndex: 'status',
            width: 120,
            render: value => {
                if (value === '已发布') {
                    return <Tag className='success' >
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
            dataIndex: 'publisher',
            width: 160
        },
        {
            title: '操作',
            width: 260,
            render: (value, record) => {
                return <div style={{
                    display: 'flex',
                    gap: '5px'
                }}>
                    <Button onClick={() => {
                        
                    }} type='link'>下载</Button>
                    <Button type='link' onClick={() => {
                        
                    }}>预览</Button>
                    <Button type='link'>推送</Button>
                </div>
            }
        }
    ];

    const fields = [{
        type: 'input',
        name: 'name',
        label: '报告名称', // 补充label字段，用于表单标签
        required: true,
        placeholder: '' // 可选占位符
    }, {
        type: 'input',
        name: 'published',
        label: '发布时间', // 补充label字段，用于表单标签
        required: true,
        placeholder: '' // 可选占位符
    }, {
        type: 'select',
        name: 'status',
        label: '发布状态', // 补充label字段，用于表单标签
        required: true,
        options: [{
            label: '待发布',
            value: 'prepare'
        }, {
            label: '已发布',
            value: 'published'
        }]
    }, {
        type: 'select',
        name: 'publisher',
        label: '发布人' // 补充label字段，用于表单标签
    }, {
        type: 'file',
        name: 'attachment',
        label: '报告文件', // 补充label字段，用于表单标签
        required: true
    }];

    return <><CommonTablePage storeName='reports' actionBar={<>
        <div>报告状态</div>
        <RangePicker style={{ width: '260px' }} />
        <div>查询时间</div>
        <button className="main">查询</button>
        <button className="reset">重置</button>
        <button style={{
            marginLeft: 'auto'
        }} onClick={() => {
            debugger
            setVisible(true)
        }}>报告上传</button></>} requestUrl={getNodeRequestUrl('/coll/reports/list')} columns={columns} />
        <FormModal visible={visible} fields={fields} onConfirm={async object => {
            const result = await create(object, 'reports');
            refreshTable();
        }} onClose={() => {
            setVisible(false)
        }}></FormModal></>
}

export default ReportPage