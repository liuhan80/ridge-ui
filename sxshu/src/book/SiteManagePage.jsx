import React, { useEffect } from 'react'
import { Tree } from 'antd'
import CommonTablePage from '../components/common-table/ComonTablePage'
import bookStore from '../store/book'
import { fetchData } from '../utils/utils'

const SiteManagePage = () => {
  const provinceTreeData = bookStore(state => state.provinceTreeData)
  const setProvinceTreeData = bookStore(state => state.setProvinceTreeData)
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      width: 60,
      align: 'center'
    },
    {
      title: '电站编号',
      dataIndex: 'stationCode',
      key: 'stationCode',
      align: 'center'
    },
    {
      title: '省份',
      dataIndex: 'province',
      key: 'province',
      align: 'center'
    },
    {
      title: '电站名称',
      dataIndex: 'stationName',
      key: 'stationName',
      align: 'center'
    },
    {
      title: '集控电站编号',
      dataIndex: 'controlStationCode',
      key: 'controlStationCode',
      align: 'center'
    },
    {
      title: '电力生产管理系统编号',
      dataIndex: 'productionSystemCode',
      key: 'productionSystemCode',
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: 'center'
    }
  ]

  useEffect(async () => {
    const data = await fetchData('./public/province-tree.json')

    setProvinceTreeData(data.treeData)
  }, [])

  return (
    <div
      className='sx-page' style={{
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}
    >
      <div
        className='left-tree' style={{
          width: '320px'
        }}
      >
        <Tree
          treeData={provinceTreeData} defaultExpandAll expandedKeys={['group']} showLine
          renderLabel={(label, nodeData) => {
            return <div key={nodeData.key}>{nodeData} -1</div>
          }}
        />
      </div>
      <div
        className='right-table' style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: '100%'
        }}
      >
        <CommonTablePage requestUrl='./public/site-list.json' columns={columns} />
      </div>
    </div>
  )
}

export default SiteManagePage
