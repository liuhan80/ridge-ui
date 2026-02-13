import React from 'react'
import { Button, Modal } from '@douyinfe/semi-ui'
import CardList from '../../components/CardList/CardList.jsx'
import BytesizeFolder from '../../icons/ProiconsFolder.svg'

const CreateAppDialog = ({
  visible,
  onConfirm
}) => {
  const handleOk = () => {

  }
  return (
    <Modal title='新增应用' visible={visible} onOk={handleOk}>
      <div>
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
