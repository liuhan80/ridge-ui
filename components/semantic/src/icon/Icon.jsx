import React from 'react'
import { Icon } from 'semantic-ui-react'

export default ({
  icon,
  ...rest
}) => {
  return <Icon name={icon} {...rest} />
}
