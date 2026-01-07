import React from 'react'
import './style.css'

const PercentMetric = ({
  label = '完整性',
  value = '98.23%'
}) => {
  return (
    <div class='percent-metric'><div class='sx-label'>{label}</div><div class='sx-value'>{value}</div></div>
  )
}

export default PercentMetric
