import React from 'react'
import { Segment } from 'semantic-ui-react'

export default ({
  text,
  ...rest
}) => {
  const props = {
    ...rest
  }

  if (rest.emphasis === 'secondary') {
    props.secondary = true
  }
  if (rest.emphasis === 'tertiary') {
    props.tertiary = true
  }

  return <Segment {...props}>{text}</Segment>
}
