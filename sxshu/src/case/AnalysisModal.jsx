import React, { useState } from 'react'
import { Modal, Form, Input, Space, Table, Select, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import caseStore from '../store/case'
import globalStore from '../store/globals'

const AnalysisModal = ({
    caseObject,
    visible,
    onClose
}) => {
    const caseDetailData = caseStore(state => state.caseDetailData)
    const dateTypes = globalStore(state => state.dateTypes)
    const anaType = globalStore(state => state.anaType)

    const [newCase, setNewCase] = useState(null)
    const [editCase, setEditCase] = useState(null)

    const updateEditValue = (key, value) => {
        if (newCase) {
            setNewCase({
                ...newCase,
                [key]: value
            })
        } else if (editCase) {
            setEditCase({
                ...editCase,
                [key]: value
            })
        }
    }

    const isRecordEdit = record => {
        return record.isEditing || (record && editCase && record.number === editCase.number)
    }

    const getEditValue = (record, key) => {
        if (newCase) {
            return newCase[key]
        } else if (editCase) {
            return editCase[key]
        }
    }

    const columns = [
        {
            width: '72px',
            title: '序号',
            dataIndex: 'number',
            className: 'center',
        },
        {
            title: '提交时间',
            dataIndex: 'commited',
        },
        {
            title: '数据类型',
            dataIndex: 'dataType',
            render: (value, record, index) => {
                if (isRecordEdit(record)) {
                    return <Select style={{
                        width: '160px'
                    }} options={dateTypes} value={getEditValue(record, 'dataType')} onChange={val => {
                        updateEditValue('dataType', val)
                    }}></Select>
                } else {
                    return value
                }
            },
            width: 200
        },
        {
            title: '剖析类型',
            dataIndex: 'anaType',
            render: (value, record, index) => {
                if (isRecordEdit(record)) {
                    return <Select style={{
                        width: '160px'
                    }} options={anaType} value={getEditValue(record, 'anaType')} onChange={val => {
                        updateEditValue('anaType', val)
                    }}></Select>
                } else {
                    return value
                }
            },
            width: 200
        },
        {
            title: '提交人',
            dataIndex: 'committer',
            width: 120
        },
        {
            title: '详情描述',
            width: 320,
            dataIndex: 'desc',
            render: (value, record, index) => {
                if (isRecordEdit(record)) {
                    return <Input placeholder='请输入' value={getEditValue(record, 'desc')}  onChange={ev => {
                        updateEditValue('desc', ev.target.value)
                    }}></Input>
                } else {
                    return value
                }
            }
        },
        {
            title: '数据收资',
            dataIndex: 'fileUrl',
            render: (value, record) => {
                if (value) {

                } else {
                    return <Upload >
                        <Button icon={<UploadOutlined />} type="link">上传文件</Button>
                    </Upload>
                }
            }
        },
        {
            title: '处理建议',
            width: 320,
            dataIndex: 'advice',
            render: (value, record, index) => {
                if (isRecordEdit(record)) {
                    return <Input placeholder='请输入' value={getEditValue(record, 'advice')} onChange={ev => {
                        updateEditValue('advice', ev.target.value)
                    }}></Input>
                } else {
                    return value
                }
            },
        },
        {
            title: '操作',
            className: 'column-score',
            width: 120,
            render: (value, record) => {

                if (isRecordEdit(record)) {
                    return <Space size="middle">
                        <a onClick={() => {
                            setNewCase(null)
                            setEditCase({ ...record, 
                                isEditing: true
                            })
                        }}>保存</a>
                        <a onClick={ () => {
                            setNewCase(null)
                            setEditCase(null)
                        }}>取消</a>
                    </Space >
                } else {
                    return <Space size="middle">
                        <a onClick={() => {
                            setNewCase(null)
                            setEditCase({ ...record, 
                                isEditing: true
                            })
                        }}>编辑</a>
                        <a>删除</a>
                    </Space >
                }
            }
        }
    ];


const handleAdd = () => {
    const newData = {
        "isEditing": true,
        "dataType": "电量",
        "anaType": "完整性",
        "desc": "",
        "advice": ""
    };
    setNewCase(newData)
};

const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
        ...item,
        ...row,
    });
    setDataSource(newData);
};

const handleOk = () => {

}
const handleCancel = () => {
    setNewCase(null)
    onClose && onClose()
}

const withEditData = [...caseDetailData]

if (newCase) {
    withEditData.push(newCase)
}
return <Modal
    title={caseObject && caseObject.name}
    width={1666}
    height={810}
    closable
    open={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    footer={() => {
        return <Space>
            <button>保存</button>
            <button className='reset' onClick={() => {
                handleCancel()
            }}>取消</button>
        </Space>
    }}
>
    <div className='case-detail'>
        <button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            新增
        </button>
        <div style={{
            height: '560px',
            overflowY: 'auto'
        }}>
            <Table
                bordered
                className='sx-table-normal'
                pagination={false}
                columns={columns} dataSource={withEditData} ></Table>

        </div>
    </div>
</Modal>

}

export default AnalysisModal