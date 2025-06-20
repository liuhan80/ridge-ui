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
    this.setState({
      isPreview: !this.state.isPreview
    })
  }

  changeViewPort = (width, height) => {
    this.setState({
      width,
      height
    })
    context.updatePreviewSize(width, height)
  }

  onSelectVpChange = (key) => {
    if (key === 'config') {
      this.changeViewPort(context.pageContent.style.width, context.pageContent.style.height)
      this.setState({
        vpName: key,
        width: context.pageContent.style.width,
        height: context.pageContent.style.height
      })
    } else {
      const vp = VIEW_PORTS.filter(vp => vp.name === key)[0]
      this.changeViewPort(vp.width, vp.height)
      this.setState({
        vpName: key,
        width: vp.width,
        height: vp.height
      })
    }
  }

  render () {
    const { toggoleRunMode, state, props, changeViewPort, onSelectVpChange } = this
    const { width, height, vpName, viewPortList } = state
    const { visible } = props
    return (
      <Button
        style={{
          display: visible ? '' : 'none',
          position: 'fixed',
          zIndex: 100001,
          right: '15px',
          bottom: '15px'
        }}
        type='primary'
        onClick={toggoleRunMode}
      >返回
      </Button>
    )
  }
}

export default PreviewMenuBar
