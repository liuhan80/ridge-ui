import React, { useEffect, useState } from 'react'
import { DatePicker, Table, Tag, Space, Select, Button, Tabs  } from 'antd'
import reviewStore from '../store/review'
import './style.css'

import ruleJSON from '../store/json/rule-quantity.json'
import SectionBox from '../components/section/SectionBox'

const Rule = () => {
  const breakDownTableData = reviewStore(state => state.breakDownTableData);

  console.log('rule', ruleJSON)
  return <div className='table-page rule-page'>
    <div className='action-bar'>
        <Tabs defaultActiveKey="quality" items={[{
            key: 'quality',
            label: '电量'
        }, {
            key: 'fault',
            label: '故障'
        }, {
            key: 'status',
            label: '状态'
        }, {
            key: 'line',
            label: '主接线图'
        }]}  />
        <div className='buttons'>
            <button >发电量</button>
            <button className='not-active'>上网电量</button>
            <button className='not-active'>损失电量</button>
            <button className='not-active'>购网电量</button>    
            <button className='not-active'>站用电量</button>    
            <button className='reset' style={{ marginLeft: '30px'}}>编辑</button>
        </div>
    </div>

    <div className='rule-container'>
        {ruleJSON.map(rule => {
            return <SectionBox title={rule.dimensionName} extra={<div className="rule-weight">
                <div className='label'>权重占比：</div>
                <div className='value'>{rule.weightRatio}</div>
            </div>}
            content={<div className='rule-content'>
                <div className='content'>{rule.formulas.map(fo => {
                    return <div>{fo}</div>
                })}</div>
                <div className="line"></div>
                <div className="sub-title">数据来源</div>
                <div className='content'>{rule.dataSource.map(fo => {
                    return <div>{fo}</div>
                })}</div>
                <div className="line"></div>
                <div className="sub-title">规则说明</div>
                <div className='content'>{rule.ruleDescription.map(fo => {
                    return <div>{fo}</div>
                })}</div>
            </div>}></SectionBox>
        })}
    </div>
  </div>
}


export default Rule