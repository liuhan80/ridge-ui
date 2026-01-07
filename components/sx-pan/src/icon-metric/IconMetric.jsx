import React from 'react'
import './style.css'

const IconMetric = ({
  url,
  label = '完整性',
  value = '98.23%',
  unit = '台'
}) => {
  return (
    <div className='icon-metric'>
      <img src={url} />
      <div className='metric-content'>
        <div className='label-unit'>
          <div className='label'>{label}</div>
          <div className='unit'>{unit}</div>
        </div>
        <div className='value'>{value}</div>
      </div>
    </div>
  )
}

export default IconMetric
