import React, { useState } from 'react'
import trim from 'lodash/trim'
import { Modal, Input } from '@douyinfe/semi-ui'
import { isValidFileName } from './fileUtils'

export default ({
  show,
  value,
  siblingNames,
  change,
  confirm,
  cancel
}) => {
  const [nameValid, setNameValid] = useState(true)
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
      title='重命名'
      visible={show}
      onOk={() => {
        if (nameValid) {
          confirm()
        }
      }}
      onCancel={() => {
        cancel()
      }}
    >
      <Input
        value={value}
        validateStatus={nameValid ? '' : 'error'}
        label='名称' onChange={val => {
          change(val)
          checkFileName(val)
        }}
      />
      {!nameValid && errorMsg && (
        <div style={{ color: 'red', marginTop: 8 }}>{errorMsg}</div>
      )}
    </Modal>
  )
}
