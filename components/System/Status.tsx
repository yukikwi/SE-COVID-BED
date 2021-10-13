import React, { ReactElement } from 'react'
import { Tag } from 'antd'

type Props = {
  avaliable: number,
  amount: number,
  isClose: boolean
}

function Status(props: Props): ReactElement {
  const { avaliable, amount, isClose } = props
  let color = ''
  let tag = ''
  if (isClose === true || avaliable === 0){
    color = 'red'
    tag = 'Close'
  }
  else if ((avaliable / amount) < 0.3){
    color = 'orange'
    tag = 'Unavaliable'
  }
  else {
    color = 'green'
    tag = 'Avaliable'
  }
  return (
    <Tag color={color} key={tag}>
      {tag}
    </Tag>
  )
}

export default Status
