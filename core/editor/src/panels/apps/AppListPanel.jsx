import React, { useState } from 'react'
import './app-list.less'
import { Button, Modal } from '@douyinfe/semi-ui'
import { FileList } from '../../components/FileList/FileList.jsx'
import CreateAppDialog from './CreateAppDialog.jsx'
import appStore from '../../store/app.store.js'

const AppListPanel = () => {
  const [createDialogVisible, setCreateDialogVisible] = useState(false)
  const appList = appStore((state) => state.appList)
  const openApp = appStore((state) => state.openApp)

  const removeApp = appStore((state) => state.removeApp)
  const createApp = appStore((state) => state.createApp)

  return (
    <div className='app-list-panel'>
      <div className='action-bar'>
        <Button
          theme='outline' type='primary' onClick={() => {
            setCreateDialogVisible(true)
          }}
        >新增应用
        </Button>
        <Button theme='outline' type='tertiary'>导入应用</Button>
      </div>
      <CreateAppDialog
        visible={createDialogVisible} onConfirm={async (name, tplName) => {
          setCreateDialogVisible(false)
          await createApp(name, tplName)
        }}
      />
      <FileList
        onItemClick={item => {
          openApp(item.id)
        }} fileData={appList}
        menu={[
          {
            node: 'item',
            name: '打开',
            onClick: item => {
              openApp(item.id)
            }
          },
          { node: 'item', name: '导出可执行包', type: 'tertiary' },
          { node: 'item', name: '导出归档', type: 'tertiary' },
          { node: 'divider' },
          {
            node: 'item',
            name: '删除',
            type: 'danger',
            onClick: async file => {
              await Modal.confirm('确认删除？')
              await removeApp(file.id)
            }
          }
        ]}
      />
    </div>
  )
}

export default AppListPanel
