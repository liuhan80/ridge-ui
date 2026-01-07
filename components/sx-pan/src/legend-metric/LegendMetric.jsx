import React from 'react'
import './style.css'

const LegendMetric = ({
  boxColor = '#00AAFF',
  legendText = '总装机容量  万kW',
  value = '5330.13',
  tagValue = '',
  tagUnit = '万kW'
}) => {
  return (
    <div className='legend-metric'>
      <div className='legend'>
        <div
          className='legend-box' style={{
            backgroundColor: boxColor
          }}
        />
        <div className='legend-title'>{legendText}</div>
      </div>
      <div className='label-value'>
        <div className='sx-label'>{value}</div>
        <div className='sx-tag'>
          <div className='sx-tag-value'>{tagValue}</div>
          <div className='sx-tag-unit'>{tagUnit}</div>
        </div>
      </div>

    </div>
  )
}

export default LegendMetric
