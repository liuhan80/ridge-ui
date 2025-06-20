import React, { useId } from 'react'

import './style.less'
export default ({
  tabs,
  value,
  size = '',
  containerClassList = [],
  gliderClassList = [],
  onChange
}) => {
  const name = useId()
  const handleChange = (val) => {
    onChange && onChange(val)
  }
  return (
    <div className={'jello-tab-container ' + size + ' ' + containerClassList.join(' ')}>
      <div className='tabs'>
        {tabs && tabs.map((tab, i) => {
          const id = name + '-' + i
          return (
            <React.Fragment key={i}>
              <input
                type='radio' id={id} name={name} checked={value === tab.value} onChange={() => {
                  handleChange(tab.value)
                }}
              />
              <label className={'tab ' + (value === tab.value ? 'text-body-emphasis' : 'text-body-secondary')} htmlFor={id}>{tab.label}</label>
            </React.Fragment>
          )
        })}
        <span
          className={'glider ' + gliderClassList.join(' ')} style={{
            width: (100 / tabs.length) + '%',
            transform: `translateX(${tabs.findIndex((tab) => tab.value === value)}00%)`
          }}
        />
      </div>
    </div>
  )
}
