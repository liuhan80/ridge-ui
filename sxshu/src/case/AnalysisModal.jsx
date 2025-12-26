import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Space, Table, Select, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios';
import caseStore from '../store/case'
import globalStore from '../store/globals'
import { getNodeRequestUrl, formatIsoToDate } from '../utils/utils'

import tableStoreFactory from '../store/useStatusBookStore'
import { create, update } from '../utils/colclient';

const AnalysisModal = ({
    caseObject,
    visible,
    onClose
}) => {
    // const caseDetailData = caseStore(state => state.caseDetailData)
    const dateTypes = globalStore(state => state.dateTypes)
    const anaType = globalStore(state => state.anaType)

    const [newCase, setNewCase] = useState(null)
    const [editCase, setEditCase] = useState(null)
    const [currentEditFile, setCurrentEditFile] = useState('')

    const caseAnalysisTableStore = tableStoreFactory.getTableStore('caseAnalysis')
    const fetchTableData = caseAnalysisTableStore(state => state.fetchTableData)
    const tableState = caseAnalysisTableStore(state => state.tableState)
    const caseDetailData = tableState.list

    const refreshDetails = async () => {
        if (caseObject && caseObject._id) {
            fetchTableData(getNodeRequestUrl('/coll/casedetails/list'), {
                case: caseObject._id
            })
        }
    }
    useEffect(() => {
        refreshDetails()
    }, [caseObject])
    // 存储上传成功后的文件路径
    // const [filePath, setFilePath] = useState('');
    // 控制上传按钮加载状态
    const [loading, setLoading] = useState(false);

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
            render: (_, record, index) => {
                return index + 1
            },
            className: 'center',
        },
        {
            title: '提交时间',
            dataIndex: 'updatedAt',
            width: '120px',
            render : (value, record) => {
                return formatIsoToDate(value)
            }
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
                    return dateTypes.find(dt => dt.value === value)?.label
                }
            },
            width: 140
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
                    return anaType.find(dt => dt.value === value)?.label
                }
            },
            width: 140
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
                    return <Input placeholder='请输入' value={getEditValue(record, 'desc')} onChange={ev => {
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
                if (isRecordEdit(record)) {
                    if (currentEditFile) {
                        return <Space><Button type='link'>${currentEditFile}</Button></Space>
                    } else {
                        return <Upload
                            showUploadList={false}
                            name="file" // 与后端接收的 key 保持一致（file）
                            customRequest={handleUpload} // 自定义上传逻辑（替代默认上传）
                        >
                            <Button loading={loading} icon={<UploadOutlined />} type="link">上传文件</Button>
                        </Upload>
                    }
                } else {
                    if (record.attachment) {
                        return record.attachment
                    } else {
                        return ''
                    }
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
                            handleSave()
                            // setNewCase(null)
                        }}>保存</a>
                        <a onClick={() => {
                            setNewCase(null)
                            setEditCase(null)
                        }}>取消</a>
                    </Space >
                } else {
                    return <Space size="middle">
                        <a onClick={() => {
                            setNewCase(null)
                            if (record.attachment) {
                                setCurrentEditFile(record.attachment)
                            } else {
                                setCurrentEditFile('')
                            }
                            setEditCase({
                                ...record,
                                isEditing: true
                            })
                        }}>编辑</a>
                        <a>删除</a>
                    </Space >
                }
            }
        }
    ];

    // 自定义上传逻辑（核心）
    const handleUpload = async (file) => {
        setLoading(true);
        try {
            // 1. 创建 FormData（适配后端接收文件的格式）
            const formData = new FormData();
            // 注意：后端 ctx.request.files.file 对应 key 是 "file"，需保持一致
            formData.append('file', file.file);

            // 2. 调用后端上传接口 /sxfile/upload
            const response = await axios.post(getNodeRequestUrl('/sxfile/upload'), formData, {
                headers: {
                    // 必须设置 Content-Type 为 multipart/form-data（FormData 自动处理）
                    'Content-Type': 'multipart/form-data',
                },
                // 可选：设置上传超时（比如30秒）
                timeout: 30000,
            });

            // 3. 解析后端返回结果（匹配你 Koa 接口的返回格式）
            if (response.data.result === 'ok') {
                const { relativePath: uploadFilePath } = response.data;
                setCurrentEditFile(uploadFilePath); // 保存文件路径
            } else {
                message.error(`上传失败：${response.data.message}`);
            }
        } catch (error) {
            // 异常处理（网络错误/接口报错）
            message.error(`上传失败：${error.message || '服务器异常'}`);
            console.error('上传错误：', error);
        } finally {
            setLoading(false);
        }

        // 阻止 Upload 组件默认的上传行为（我们用自定义逻辑）
        return false;
    };

    const handleAdd = () => {
        const newData = {
            "isEditing": true,
            "dataType": "电量",
            "anaType": "完整性",
            "desc": "",
            "advice": ""
        };
        setCurrentEditFile('')
        setNewCase(newData)
    };

    // 保存详情
    const handleSave = async () => {
        if (newCase) { // 新增
            const newCaseObject = {
                case: caseObject._id,
                ...newCase
            }
            delete newCaseObject.isEditing
            if (currentEditFile) {
                newCase.attachment = currentEditFile
            }
            await create(newCaseObject, getNodeRequestUrl('/coll/casedetails/doc/create'))
            await refreshDetails()
        } 
        if (editCase) { // 更新编辑
            const updateCaseObject = {
                case: caseObject._id,
                ...editCase
            }
            delete updateCaseObject.isEditing
            if (currentEditFile) {
                updateCaseObject.attachment = currentEditFile
            }
            await update(editCase._id, updateCaseObject, 'casedetails')
            await refreshDetails()
        }
        setCurrentEditFile('')
        setEditCase(null)
        setNewCase(null)
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