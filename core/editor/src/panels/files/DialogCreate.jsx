import React, { useState } from 'react'
import { Modal, Form } from '@douyinfe/semi-ui'
import { isValidFileName } from './fileUtils'

export default ({
  show,
  title,
  parentPaths,
  siblingNames,
  confirm,
  cancel
}) => {
  const [nameValid, setNameValid] = useState(true)
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  /**
   * 实时检查名称是否冲突
   */
  const checkFileName = (val) => {
    const trimVal = isValidFileName(val)
    setNameValid(true)
    setErrorMsg('')
    if (!trimVal.valid) {
      setNameValid(false)
      setErrorMsg(trimVal.message)
    } else {
      if (siblingNames && siblingNames.indexOf(trimVal) > -1) {
        setNameValid(false)
      }
    }
  }

  return (
    <Modal
      title={title || '新增..'}
      visible={show}
      onOk={() => {
        if (nameValid) {
          confirm(value)
          setValue('')
        }
      }}
      onCancel={() => {
        cancel()
        setValue('')
      }}
    >
      <Form
        labelPosition='left'
        labelAlign='right'
        labelWidth={80}
      >
        <Form.Input disabled label='所在目录' initValue={parentPaths} />
        <Form.Input
          value={value}
          validateStatus={nameValid ? '' : 'error'}
          validate
          label='名称' onChange={val => {
            setValue(val)
            checkFileName(val)
          }}
        />
        {!nameValid && errorMsg && (
          <div style={{ color: 'red', marginTop: 8 }}>{errorMsg}</div>
        )}
      </Form>
    </Modal>
  )
}
