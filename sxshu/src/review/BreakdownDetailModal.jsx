import React, { useState } from 'react'
import { Modal, Form, Input, Space, Table, Select, Upload, Button } from 'antd'

import reviewStore from '../store/review'
import globalStore from '../store/globals'

const BreakdownDetailModal = ({
    reviewItem = {},
    visible,
    onClose
}) => {
    const breakDownDetailTableData = reviewStore(state => state.breakDownDetailTableData)

    const columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            width: '60px',
            align: 'center',
        },
        {
            title: '日期',
            dataIndex: 'date',
            width: '180px',
            align: 'center',
        },
        {
            title: '异常指标',
            dataIndex: 'abnormalIndex',
            width: '100px',
            align: 'center',
        },
        {
            title: '异常描述',
            dataIndex: 'abnormalDesc',
            align: 'left',
            ellipsis: true, // 超长文本省略（可选）
        },
        {
            title: '发电',
            dataIndex: 'powerGeneration',
            align: 'center', 
            width: '100px',
        },
        {
            title: '理论',
            dataIndex: 'theoreticalValue',
            align: 'center', 
            width: '100px',
        },
        {
            title: '上网',
            dataIndex: 'gridValue',
            align: 'center', 
            width: '100px'
        },
    ];
    const handleCancel = () => {
        onClose && onClose()
    }


    return <Modal
        title='详情'
        width={1175}
        height={694}
        closable
        open={visible}
        onCancel={handleCancel}
        footer={null}
    >
        <div className='break-down-item-detail'>
            <Space className='basic'> 
                <div>省份：{reviewItem.province} </div>
                <div>电场名称： {reviewItem.stationName} </div>
                <div>总得分：{reviewItem.totalScore}% </div>
                <div>{reviewItem.currentLabel}: {reviewItem.currentValue}</div>
            </Space>
            <div style={{
                height: '560px',
                overflowY: 'auto'
            }}>
                <Table
                    bordered
                    className='sx-table-normal'
                    columns={columns} dataSource={breakDownDetailTableData} ></Table>

            </div>
        </div>
    </Modal>

}

export default BreakdownDetailModal