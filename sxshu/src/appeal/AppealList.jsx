import React, { useEffect, useState } from 'react'
import { DatePicker, Table, Tag, Space, Select, Button } from 'antd'

import CommonTablePage from '../components/common-table/ComonTablePage'
import appealStore from '../store/appeal'
import AppealCreateModal from './AppealCreateModal.jsx'
import { getNodeRequestUrl } from '../utils/utils'
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
                <Button size='small' type='link'>数据详情</Button>
                <Button size='small' type='link'>申请提交</Button>
            </Space>
        }
    }
];

const AppealListPage = () => {
    const openAppealCreateModal = appealStore(state => state.openAppealCreateModal)
    return <>
        <CommonTablePage actionBar={<>
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
                openAppealCreateModal()
            }}>新增申诉</button>
        </>} columns={columns} storeName='appeals' requestUrl={getNodeRequestUrl('/coll/appeals/list')}></CommonTablePage>
        <AppealCreateModal></AppealCreateModal>
        <StationAppealEditModal></StationAppealEditModal>
    </>
}

export default AppealListPage