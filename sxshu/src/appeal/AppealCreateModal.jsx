import React, { useState } from 'react'
import { Modal, Form, Input, Space, Table, Select, Upload, Button, Radio, Pagination } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { processAppealData } from '../utils/utils.js'

import buildingImg from '../assets/image/building.png'
import successImg from '../assets/image/success.png'

import appealStore from '../store/appeal'
import globalStore from '../store/globals'
import SxUploader from '../components/upload/SxUploader.jsx'
import *  as client from '../utils/colclient.js'

const { TextArea } = Input

const RenderProvince = () => {
    const provinces = globalStore(state => state.provinces)
    const provinceSwitch = appealStore(state => state.provinceSwitch)
    const provinceAppealObject = appealStore(state => state.provinceAppealObject)
    const updateProvinceAppeal = appealStore(state => state.updateProvinceAppeal)
    
    return <div className='province'>
        <div className='select-prov'>
            <img src={buildingImg}></img>
            <div className="choose">省份选择</div>
            { provinceSwitch && <Select options={provinces} style={{width: 160}} ></Select>}
            { !provinceSwitch && provinceAppealObject && <div className="choose">{provinceAppealObject.name}</div>}
            {/* <div className="code">流程编号</div>
            <div className="code-number">123009892</div> */}
            <div className='score'>分数 {provinceAppealObject && provinceAppealObject[provinceAppealObject.appealKey]}%</div>
        </div>
        <div className='form-item'>
            <div className="label">申述类型</div>
            <Select options={[{
                label: '电量',
                value: 'energy'
            }, {
                label: '状态',
                value: 'status'
            }, {
                label: '故障',
                value: 'error'
            }, {
                label: '一次接线图',
                value: 'line'
            }]} value={provinceAppealObject && provinceAppealObject.appealKey} style={{ flex: 1 }} onChange={val => {
                updateProvinceAppeal({
                    appealKey: val
                })
            }}></Select>
        </div>
        <div className='form-item'>
            <div className="label">申诉说明</div>
            <TextArea placeholder='填写申诉说明' value={provinceAppealObject && provinceAppealObject.desc} onChange={e => {
                updateProvinceAppeal({
                    desc: e.target.value
                })
            }}  style={{ flex: 1, height: '108px' }}></TextArea>
        </div>
        <div className='form-item'>
            <div className="label">附件上传</div>
            <SxUploader value={provinceAppealObject && provinceAppealObject.attachment} onChange={val => {
                  updateProvinceAppeal({
                    attachment: val
                })              
            }}></SxUploader>
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
    const confirmStationCreate = appealStore(state => state.confirmStationCreate)

    const provinces = globalStore(state => state.provinces)

    const [siteOptions, setSiteOptions] = useState([])
    const [province, setProvince] = useState('天津')
    const [site, setSite] = useState('')

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
                    setCandinateSelectedKeys([record.key])
                    confirmStationCreate()
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

    const updateSites = async province => {
        setProvince(province)
        const sites = await client.list('sites', {
            province: province
        })
        setSiteOptions(sites.list.map(r => {
            return {
                label: r.name,
                psr_id: r.psr_id,
                value: r.name
            }
        }))
        updateStationAppealObject({
            province: province
        })
    }

    return <div className="station">
        <Space className='action-bar'>
            <div>省份</div>
            <Select onChange={val => {
                updateSites(val)
            }} value={province} options={provinces} style={{ width: '120px' }}></Select>
            <div>场站</div>
            <Select value={site} options={siteOptions} style={{ width: '260px' }} onChange={val => {
                setSite(val)
            }}></Select>
            <div>类别</div>
            <Select style={{ width: '120px' }}></Select>
            <button onClick={() => {

            }}>查询</button>
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
    province, // 带入的申诉省份
}) => {
    const candinateModalVisible = appealStore(state => state.candinateModalVisible)
    const confirmAppealCreate = appealStore(state => state.confirmAppealCreate)
    const cancelAppealRequest = appealStore(state => state.cancelAppealRequest)
    const candinateTypeSwitch = appealStore(state => state.candinateTypeSwitch)
    const candinateRange = appealStore(state => state.candinateRange)

    const setCandinateModalVisible = appealStore(state => state.setCandinateModalVisible)
    const setConfirmAppealModalVisible = appealStore(state => state.setConfirmAppealModalVisible)
    const successAppealModalVisible = appealStore(state => state.successAppealModalVisible)
    const updateCandinateRange = appealStore(state => state.updateCandinateRange)

    const handleOk = () => {
        confirmAppealCreate()
    }
    const handleCancel = () => {
        cancelAppealRequest()
    }

    return <>
        <Modal
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
                        confirmAppealCreate()
                    }}>申诉</button>
                    <button className='reset' onClick={() => {
                        handleCancel()
                    }}>取消</button>
                </Space>
            }}
        >
            <div className='create-appeal'>
                { candinateTypeSwitch && <Space className='range'>
                    <div>申诉范围</div>
                    <Radio.Group options={[
                        { label: '省份', value: 'province' },
                        { label: '场站', value: 'station' },
                    ]} onChange={ev => {
                        updateCandinateRange(ev.target.value)
                    }} value={candinateRange} />
                </Space> }
                {candinateRange === 'province' && <RenderProvince></RenderProvince>}
                {candinateRange === 'station' && <RenderStation></RenderStation>}
            </div>
        </Modal>
        <Modal
            title='申诉填写'
            width={356}
            height={230}
            closable
            open={successAppealModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <div className='appeal-success'>
                <img className="img" src={successImg}></img>
                <div className="text">申诉成功</div>
                <div className="desc">请到 <Button onClick={() => {
                    location.href = './#/appeal'
                }} size='small' type='link'> 数据申诉</Button> 页面查看审批状态</div>
            </div>
        </Modal>
    </>
    

}

export default AppealCreateModal