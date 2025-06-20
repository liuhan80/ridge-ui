import React, { useId } from 'react'
import './style.css'
export default ({
  value,
  onChange
}) => {
  const name = useId()
  const handleChange = (event) => {
    onChange && onChange(event.target.value)
  }
  return (
    <div class='star-rating animated-stars'>
      {Array.from({ length: 5 }, (_, i) => i + 1).map(i => {
        const id = useId()
        return (
          <React.Fragment key={i}>
            <input type='radio' id={id} name={name} value={i} checked={parseInt(value) === 6 - i} onChange={handleChange} />
            <label htmlFor={id} class='bi bi-star-fill' />
          </React.Fragment>
        )
      })}
    </div>
  )
}
