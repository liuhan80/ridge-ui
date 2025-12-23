import React, { useState } from 'react'
import { Modal, Form, Input, Space, Table, Select, Upload, Button, Radio, Pagination } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import appealStore from '../store/appeal.js'
import globalStore from '../store/globals.js'
import SectionBox from '../components/section/SectionBox.jsx'

const { TextArea } = Input

const RenderSingleAppeal = ({ appeal }) => {
    return <div className='single-appeal'>
        <div className='line'>
            <div className='form-item'>
                <div className='label'>流程编号:</div>
                <div className='value'>12600001</div>
            </div>
            <div className='form-item'>
                <div className='label'>分数：</div>
                <div className='value'>48.41%</div>
            </div>
            <div className='form-item'>
                <div className='label'>场站：</div>
                <div className='value'>xx 风电场</div>
            </div>
        </div>
        <div className='line'>
            <div className='form-item'>
                <div className='label'>申诉类型：</div>
                <div className='value'>电量</div>
            </div>
            <div className='form-item'>
                <div className='label'>指标1：</div>
                <div className='value'>上网电量</div>
            </div>
            <div className='form-item'>
                <div className='label'>指标2：</div>
                <div className='value'>完整性</div>
            </div>
        </div>
        <div className='line'>
            <div className='form-item'>
                <div className='label' style={{ alignSelf: 'start'}}>申诉说明</div>
                <TextArea style={{flex: 1}} placeholder='填写申诉说明'></TextArea>
            </div>
        </div>
        <div className='line'>
            <div className='form-item'>
                <div className='label'>附件上传</div>
                <Upload>
                    <Button icon={<UploadOutlined />} variant="outlined">上传文件</Button>
                    <span style={{marginLeft: '6px'}}>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</span>
                </Upload>
            </div>
        </div>
    </div>
}


const StationAppealEditModal = () => {
    const confirmAppealModalVisible = appealStore(state => state.confirmAppealModalVisible)
    const appealStationSelectedData = appealStore(state => state.appealStationSelectedData)
    const goBackCreateAppealModal = appealStore(state => state.goBackCreateAppealModal)
    const cancelAppealRequest = appealStore(state => state.cancelAppealRequest)

    const handleOk = () => {

    }
    const handleCancel = () => {
        cancelAppealRequest()
    }

    return <Modal
        title='申诉填写'
        style={{ top: 28 }}
        width={982}
        height={810}
        closable
        open={confirmAppealModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => {
            return <Space style={{ padding :  '0 16px 16px'}}>
                <button>申诉</button>
                <button className='reset' onClick={() => {
                    handleCancel()
                }}>取消</button>
            </Space>
        }}
    >
        <div className='appeal-edit'>
            <div style={{
                marginBottom: '16px'
            }}><button onClick={() => {
                goBackCreateAppealModal();
            }}>返回上一级</button> </div>
            {appealStationSelectedData && appealStationSelectedData.map((appealEdit, index) => {
                return <SectionBox title={'申诉' + (index + 1)} 
                    extra={<Button type='link' >删除</Button>}
                    content={<RenderSingleAppeal appeal={appealEdit}></RenderSingleAppeal>}>
                    
                </SectionBox>
            })}
        </div>
    </Modal>

}

export default StationAppealEditModal