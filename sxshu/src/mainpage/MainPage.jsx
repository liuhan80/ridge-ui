import React, { useState } from 'react'
import './style.css'
import Metric1 from '../components/metric1/Metric1'
import AssetDistribution from '../components/asset/AssetDistribution'
import DeviceSituation from './DeviceSituation'

import leftImg from '../assets/image/left.png'
import SectionBox from '../components/section/SectionBox'
import RegionalDataQuality from './RegionalDataQuality'
import TotalScoreRanking from './TotalScoreRanking'

import homeStore from '../store/home'
import MoMComparison from './MoMComparison'

const MainPage = () => {
  const leftShow = homeStore(state => state.leftShow)
  const setLeftshow = homeStore(state => state.setLeftshow)

  const onToggleLeftShow = () => {
    setLeftshow(!leftShow)
  }
  return (
    <div className='sx-main-page sx-page'>
      <div className='sx-main-page-content'>
        <div className='content'>
          <div className='left'>
            <SectionBox title='资产分布' content={<AssetDistribution />} style={{ flex: 1 }} />
            <SectionBox title='设备情况' content={<DeviceSituation />} style={{ flex: 1 }} />
          </div>
          <div className='center'>
            <div className='metric-list'>
              <Metric1
                label='完整性' value='65.12%' onClick={() => {
                  location.href = '/#/case'
                }}
              />
              <Metric1 label='完整性' value='65.12%' />
              <Metric1 label='完整性' value='65.12%' />
              <Metric1 label='完整性' value='65.12%' />
              <Metric1 label='完整性' value='65.12%' />
            </div>
            <SectionBox style={{ overflow: 'hidden', flex: 1 }} title='区域数据质量' content={<RegionalDataQuality />} />
          </div>
        </div>
        <div className='toggle-button' onClick={onToggleLeftShow}>
          <div className='image-wrapper'>
            <img src={leftImg} />
          </div>
        </div>
        {leftShow && <div className='side'>
          <TotalScoreRanking> </TotalScoreRanking>
          <MoMComparison />
                     </div>}
      </div>
      {/* <Metric1 label="完整性" value='65.20%'></Metric1> */}
    </div>
  )
}

export default MainPage
