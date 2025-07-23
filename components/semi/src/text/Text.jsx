import { Typography } from '@douyinfe/semi-ui'

const { Text } = Typography

export default ({
  text,
  size,
  type,
  copyable,
  link,
  ellipsis,
  rows = 1,
  onClick,
  classList = []
}) => {
  return (
    <Text
      style={{
        'word-break': 'break-all',
        'white-space': 'break-spaces'
      }} onClick={() => { onClick && onClick() }} link={link ? { href: link, target: '_blank' } : false} ellipsis={ellipsis ? { showTooltip: true, rows } : false} copyable={copyable} size={size} type={type} className={classList.join(' ')}
    >{text || ''}
    </Text>
  )
}
