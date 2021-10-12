import React, { ReactElement } from 'react'
import { Tag } from 'antd'

type Props = {
  avaliable: number,
  amount: number
}

function Status(props: Props): ReactElement {
  const { avaliable, amount } = props
  let color = ''
  let tag = ''
  if ((avaliable / amount) < 0.3){
    color = 'orange'
    tag = 'Lowstock'
  }
  else if (avaliable === 0){
    color = 'red'
    tag = 'Outofstock'
  }
  else {
    color = 'green'
    tag = 'Instock'
  }
  return (
    <Tag color={color} key={tag}>
      {tag}
    </Tag>
  )
}

export default Status
