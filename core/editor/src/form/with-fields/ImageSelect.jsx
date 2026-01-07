import React, { useState, useMemo } from 'react'
import { Input, Select, Button, Popover, Image, Typography, Space, withField } from '@douyinfe/semi-ui'
import { IconImage, IconCheckList } from '@douyinfe/semi-icons'

const ImageSelect = ({
  value,
  onChange,
  label,
  field,
  disabled = false,
  options = {},
  placeholder = '请输入图片地址或从列表选择'
}) => {
  // 解构配置项：图片列表、预览尺寸等
  const { imageList = [], previewWidth = 100, previewHeight = 100 } = options

  // 状态管理：弹出层显隐、选中的图片key
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [selectedImgKey, setSelectedImgKey] = useState('')

  // 格式化图片列表为Select选项格式
  const formattedImageOptions = useMemo(() => {
    return imageList.map((item, index) => {
      const imgKey = item.key || `img_${index}`
      return {
        label: item.label || `图片${index + 1}`,
        value: item.url,
        key: imgKey,
        url: item.url
      }
    })
  }, [imageList])

  // 处理输入框变化
  const handleInputChange = (val) => {
    if (disabled) return
    onChange(val)
  }

  // 处理下拉选择变化
  const handleSelectChange = (val) => {
    if (disabled) return
    onChange(val)
  }

  // 处理弹出层选择图片
  const handleImageSelect = (url, key) => {
    onChange(url)
    setSelectedImgKey(key)
    setPopoverVisible(false)
  }

  // 渲染图片选择弹窗内容
  const renderPopoverContent = () => {
    if (imageList.length === 0) {
      return <Typography.Text type='secondary'>暂无可选图片</Typography.Text>
    }

    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        maxHeight: 300,
        overflowY: 'auto',
        padding: 8
      }}
      >
        {imageList.map((item, index) => {
          const imgKey = item.key || `img_${index}`
          const isSelected = imgKey === selectedImgKey
          const imgUrl = item.url

          return (
            <div
              key={imgKey}
              style={{
                position: 'relative',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1
              }}
              onClick={() => !disabled && handleImageSelect(imgUrl, imgKey)}
            >
              <Image
                src={imgUrl}
                alt={item.label || `图片${index + 1}`}
                width={previewWidth}
                height={previewHeight}
                style={{
                  border: isSelected ? '2px solid var(--semi-color-primary)' : '1px solid var(--semi-color-border)',
                  borderRadius: 4,
                  objectFit: 'cover'
                }}
              />
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'var(--semi-color-primary)',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconCheckList size='small' color='#fff' />
                </div>
              )}
              <Typography.Text
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 4,
                  maxWidth: previewWidth,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                size='small'
              >
                {item.label || `图片${index + 1}`}
              </Typography.Text>
            </div>
          )
        })}
      </div>
    )
  }

  // 初始化选中的图片key
  React.useEffect(() => {
    if (value) {
      const matchedImg = formattedImageOptions.find(item => item.value === value)
      if (matchedImg) {
        setSelectedImgKey(matchedImg.key)
      }
    }
  }, [value, formattedImageOptions])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* 图片地址输入框 */}
      <Input
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ flex: 1 }}
        label={label}
        field={field}
      />

      {/* 下拉选择快捷选择 */}
      {formattedImageOptions.length > 0 && (
        <Select
          value={value}
          onChange={handleSelectChange}
          options={formattedImageOptions}
          disabled={disabled}
          placeholder='选择图片'
          style={{ width: 180 }}
        />
      )}

      {/* 图片选择弹窗 */}
      <Popover
        content={renderPopoverContent()}
        trigger='click'
        visible={popoverVisible}
        onVisibleChange={setPopoverVisible}
        placement='bottomRight'
        style={{ width: 400 }}
      >
        <Button
          icon={<IconImage />}
          disabled={disabled || imageList.length === 0}
          size='small'
          type='secondary'
        >
          选择
        </Button>
      </Popover>

      {/* 图片预览 */}
      {value && (
        <Image
          src={value}
          alt='预览'
          width={40}
          height={40}
          style={{ borderRadius: 4, border: '1px solid var(--semi-color-border)' }}
        />
      )}
    </div>
  )
}

export default withField(ImageSelect)
