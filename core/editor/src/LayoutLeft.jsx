import React, { useEffect, useState } from 'react'

import { Dropdown, Tabs, TabPane, Icon, Button, Tooltip, Space } from '@douyinfe/semi-ui'

import ComponentListing from './panels/component/ComponentListing.jsx'
import AppFileList from './panels/files/AppFileList.jsx'
import OutLineTree from './panels/outline/OutLineTree.jsx'
import context from './service/RidgeEditorContext.js'
import SvgLoader from './utils/SVGFromSrc.js'

import BytesizeFolder from './icons/BytesizeFolder.svg'
import IconClist from './icons/CilList.svg'

const THEMES = [{
  label: '默认',
  value: '@douyinfe/semi-ui/dist/css/semi.min.css'
}, {
  label: '抖音',
  value: '@semi-bot/semi-theme-doucreator/semi.min.css'
}, {
  label: '飞书',
  value: '@semi-bot/semi-theme-universedesign/semi.min.css'
}, {
  label: 'Strapi',
  value: '@semi-bot/semi-theme-strapi/semi.min.css'
}, {
  label: '深蓝',
  value: '@semi-bot/semi-theme-ultim-dark-blue/semi.min.css'
}, {
  label: '剪映',
  value: '@semi-bot/semi-theme-jianying/semi.min.css'
}]

export default ({
  isLight,
  toggleLight
}) => {
  const [currentTabKey, setCurrentTabKey] = useState('app')
  const [collapseLeft, setCollapseLeft] = useState(false)

  const [appPackageObject, setAppObject] = useState(null)
  const [packageList, setPackageList] = useState([])

  const loadPackages = async () => {
    const { loadedPackages, appPackageObject } = await context.loadAppPackages()

    if (loadedPackages.length) {
      setPackageList(loadedPackages)
    }

    setAppObject(appPackageObject)
    // await this.ensurePackageComponents(loadedPackages[0], loadedPackages)
  }
  useEffect(() => {
    loadPackages()
  }, [])
  return (
    <Tabs
      className='root-nav'
      activeKey={currentTabKey}
      style={{
        width: collapseLeft ? '58px' : '300px'
      }}
      onTabClick={(key, ev) => {
        if (key === currentTabKey) {
          setCollapseLeft(!collapseLeft)
        }
        setCurrentTabKey(key)
      }}
      tabPosition='left' type='button' tabBarExtraContent={
        <Space vertical>
          <Tooltip content='夜间/日间模式'>
            <Button
              type='tertiary'
              theme='borderless'
              icon={isLight ? <i className='bi bi-moon-stars-fill' /> : <i className='bi bi-sun' />}
              onClick={() => {
                toggleLight(!isLight)
              }}
            />
          </Tooltip>
          <Dropdown
            trigger='click'
            position='right'
            render={
              <Dropdown.Menu>
                <Dropdown.Item>切换主题配色</Dropdown.Item>
                <Dropdown.Divider />
                {THEMES.map(theme =>
                  <Dropdown.Item
                    key={theme.value}
                    onClick={() => {
                      context.setTheme(theme.value)
                    }}
                  >{theme.label}
                  </Dropdown.Item>)}
              </Dropdown.Menu>
            }
          >
            <Button icon={<i className='bi bi-palette2' />} theme='borderless' size='small' type='tertiary' />
          </Dropdown>
        </Space>
              }
    >
      <TabPane tab={<Tooltip content='应用文件管理' position='rightTop'> <Icon svg={<BytesizeFolder />} size='default' /></Tooltip>} itemKey='app'>
        <AppFileList />
      </TabPane>
      <TabPane position='' tab={<Tooltip content='页面大纲视图' position='rightTop'><Icon svg={<IconClist />} /> </Tooltip>} itemKey='outline'>
        <OutLineTree />
      </TabPane>
      {packageList && packageList.map(packageObject => {
        return (
          <TabPane
            itemKey={packageObject.name}
            key={packageObject.name}
            tab={
              <Tooltip
                content={packageObject.description} position='rightTop'
              >
                <div className='package-icon'>
                  <SvgLoader src={context.baseUrl + '/' + packageObject.name + '/' + packageObject.icon} />
                </div>
              </Tooltip>
            }
          >
            <ComponentListing packageObject={packageObject} appPackageObject={appPackageObject} />
          </TabPane>
        )
      })}
      {/* <TabPane tab={<Tooltip content='组件面板' position='rightTop'> <Icon svg={<FluentAppsAddIn28Filled />} /></Tooltip>} itemKey='app'>
        <ComponentListing />
      </TabPane> */}
    </Tabs>
  )
}
