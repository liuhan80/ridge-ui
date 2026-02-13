import React, { useState } from 'react'
import { List, Card } from '@douyinfe/semi-ui'
import './style.less'
const { Meta } = Card
// 文件列表组件
const CardList = ({
  onItemClick,
  list = []
}) => {
  return (
    <List
      className='semi-card-list'
      grid={{
        gutter: [4, 4],
        span: 8
      }}
      dataSource={list}
      renderItem={file => {
        return (
          <List.Item key={file.name}>
            <Card
              headerLine={false} cover={
                <img
                  alt='example'
                  src={file.cover}
                />
            }
            >
              <Meta
                description='全面、易用、优质'
              />
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

export default CardList
