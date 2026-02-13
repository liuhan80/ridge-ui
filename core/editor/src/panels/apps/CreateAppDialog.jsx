import React, { useState } from 'react'
import { Button, Modal, Input } from '@douyinfe/semi-ui'
import CardList from '../../components/CardList/CardList.jsx'
import BytesizeFolder from '../../icons/ProiconsFolder.svg'

const CreateAppDialog = ({
  visible,
  onConfirm
}) => {
  const [appName, setAppName] = useState('未命名应用')
  const handleOk = () => {

  }
  return (
    <Modal title='新增应用' visible={visible} onOk={handleOk} width={1078}>
      <div>
        <Input
          value={appName} onChange={val => {
            setAppName(val)
          }}
        />
        <CardList list={[{
          cover: BytesizeFolder,
          name: 'empty'
        }]}
        />
      </div>
    </Modal>
  )
}

export default CreateAppDialog
