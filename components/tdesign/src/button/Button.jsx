import { Button } from 'tdesign-react'

export default ({
  content,
  ...props
}) => {
  return <Button {...props}>{content}</Button>
}
