import React, { useState } from 'react'
import { Modal, Form, Input, Space, Table, Select, Upload, Button, Radio, Pagination } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { processAppealData } from '../utils/utils.js'

import buildingImg from '../assets/image/building.png'

import appealStore from '../store/appeal'
import globalStore from '../store/globals'

const { TextArea } = Input

const RenderProvince = () => {
    return <div className='province'>
        <div className='select-prov'>
            <img src={buildingImg}></img>
            <div className="choose">省份选择</div>
            <Select></Select>
            <div className="code">流程编号</div>
            <div className="code-number">123009892</div>
            <div className='score'>分数 88.21%</div>
        </div>
        <div className='form-item'>
            <div className="label">申述类型</div>
            <Select style={{ flex: 1 }}></Select>
        </div>
        <div className='form-item'>
            <div className="label">申诉说明</div>
            <TextArea placeholder='填写申诉说明' style={{ flex: 1, height: '108px' }}></TextArea>
        </div>
        <div className='form-item'>
            <div className="label">附件上传</div>
            <Upload>
                <Button icon={<UploadOutlined />} variant="outlined">上传文件</Button>
                <div style={{ marginTop: '6px' }}>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
            </Upload>
        </div>
    </div>
}

const RenderStation = () => {
    const appealCandinateData = appealStore(state => state.appealCandinateData)
    const appealTableTotal = appealStore(state => state.candinateDataTotal)
    const appealTableCurrent = appealStore(state => state.candinateDataCurrent)
    const candinateGotoPage = appealStore(state => state.candinateGotoPage)
    const setCandinateSelectedKeys = appealStore(state => state.setCandinateSelectedKeys)
    const candinateSelectedKeys = appealStore(state => state.candinateSelectedKeys)

    const columns = [
        {
            width: '36px',
            dataIndex: 'number',
            className: 'center',
        },
        {
            title: '类别',
            dataIndex: 'category',
            onCell: (record, index) => {
                return {
                    rowSpan: record.categorySpan ?? 1
                }
            }
        },
        {
            title: '指标1',
            dataIndex: 'indicator',
            onCell: (record, index) => {
                return {
                    rowSpan: record.indicatorSpan ?? 1
                }
            }
        },
        {
            title: '指标2',
            dataIndex: 'indicatorType',
        },
        {
            title: '分数',
            dataIndex: 'score',
        },
        {
            title: '操作',
            className: 'column-score',
            width: 120,
            render: (value, record) => {
                return <Button type='link' onClick={() => {
                    setCandinateSelectedKeys[record.key]
                }}>申诉</Button>
            }
        }
    ];

    const rowSelection = {
        selectedRowKeys: candinateSelectedKeys,
        onChange: (keys) => {
            setCandinateSelectedKeys(keys)
        },
    };


    const handleTableChange = (index) => {
        candinateGotoPage(index)
    }


    return <div className="station">
        <Space className='action-bar'>
            <div>省份</div>
            <Select style={{ width: '120px' }}></Select>
            <div>场站</div>
            <Select style={{ width: '120px' }}></Select>
            <div>类别</div>
            <Select style={{ width: '120px' }}></Select>
            <button>查询</button>
            <button className='reset'>重置</button>
        </Space>
        <Table scroll={{
            y: 480
        }}
            pagination={false}
            rowSelection={rowSelection}
            bordered className='sx-table-normal' columns={columns} dataSource={processAppealData(appealCandinateData)}>
        </Table>
        <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Pagination
                current={appealTableCurrent}
                pageSize={20}
                total={appealTableTotal} // 总数据条数
                onChange={handleTableChange}
                showSizeChanger // 显示每页条数选择器
                showQuickJumper // 显示快速跳页
                pageSizeOptions={['10', '20', '50']} // 可选每页条数
            />
        </div>
    </div>
}

const AppealCreateModal = ({
    province, // 默认带入省份
    visible,
    onClose
}) => {
    const [range, setRange] = useState(province ? 'province' : 'station')

    const candinateModalVisible = appealStore(state => state.candinateModalVisible)
    const confirmStationCreate = appealStore(state => state.confirmStationCreate)
    const cancelAppealRequest = appealStore(state => state.cancelAppealRequest)

    const setCandinateModalVisible = appealStore(state => state.setCandinateModalVisible)
    const setConfirmAppealModalVisible = appealStore(state => state.setConfirmAppealModalVisible)


    const handleOk = () => {
        confirmStationCreate()
    }
    const handleCancel = () => {
        cancelAppealRequest()
    }

    return <Modal
        title='新增申诉'
        style={{ top: 28 }}
        width={982}
        height={810}
        closable
        open={candinateModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => {
            return <Space style={{ padding: '0 16px 16px' }}>
                <button onClick={() => {
                    confirmStationCreate()
                }}>申诉</button>
                <button className='reset' onClick={() => {
                    handleCancel()
                }}>取消</button>
            </Space>
        }}
    >
        <div className='create-appeal'>
            <Space className='range'>
                <div>申诉范围</div>
                <Radio.Group options={[
                    { label: '省份', value: 'province' },
                    { label: '场站', value: 'station' },
                ]} onChange={ev => {
                    setRange(ev.target.value)
                }} value={range} />
            </Space>
            {range === 'province' && <RenderProvince></RenderProvince>}
            {range === 'station' && <RenderStation></RenderStation>}
        </div>
    </Modal>

}

export default AppealCreateModal