import React from 'react'
import { Button } from 'semantic-ui-react'

export default ({
  text,
  basic,
  inverted,
  color
}) => {
  return <Button inverted={inverted} basic={basic} color={color}>{text}</Button>
}
