import React from 'react'
import { Button, Space, InputNumber, Typography } from '@douyinfe/semi-ui'
import context from '../../service/RidgeEditorContext.js'

/*
const VIEW_PORTS = [{
  name: 'Apple iPhone 15 Pro Max',
  width: 430,
  height: 932
}, {
  name: 'Apple iPhone 15',
  width: 393,
  height: 852
}, {
  name: 'Apple iPad 10.2"',
  width: 810,
  height: 1080
}]
*/
class PreviewMenuBar extends React.Component {
  constructor () {
    super()
    context.services.previewBar = this

    // const viewPortList = VIEW_PORTS.map(vp => {
    //   return {
    //     value: vp.name,
    //     label: <Space>
    //       <Text>{vp.name}</Text>
    //       <Text type='tertiary'>{vp.width}-{vp.height}</Text>
    //     </Space>
    //   }
    // })
    this.state = {
      // vpName: 'default',
      // viewPortList: [...viewPortList, {
      //   value: 'config',
      //   label: '设计宽高'
      // }],
      width: 0,
      height: 0
    }
  }

  toggoleRunMode = () => {
    context.toggleMode()
  }

  exportRunablePage = () => {
    context.distributeCurrentPage()
  }

  changeViewPort = (width, height) => {
    this.setState({
      width,
      height
    })
    context.updatePreviewSize(width, height)
  }

  render () {
    const { toggoleRunMode, exportRunablePage } = this
    return (
      <div className='menu-bar'>
        <Button
          type='primary'
          onClick={toggoleRunMode}
        >返回
        </Button>

        <Button onClick={exportRunablePage}>
          导出为单运行页面
        </Button>
      </div>
    )
  }
}

export default PreviewMenuBar
