import React, { ReactElement } from 'react'
import { Switch } from 'antd'
import { SwitchChangeEventHandler } from 'antd/lib/switch'

interface Props {
  hospitalStatus?: 'open'|'close'
  updateHospitalStatus: SwitchChangeEventHandler
}

HospitalStatus.defaultProps = {
  hospitalStatus: 'open'
}

function HospitalStatus(props: Props): ReactElement {
  const { hospitalStatus, updateHospitalStatus } = props
  if(hospitalStatus === 'open'){
    return <Switch onChange={ updateHospitalStatus } checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
  }
  else{
    return <Switch onChange={ updateHospitalStatus } checkedChildren="Open" unCheckedChildren="Close" />
  }
}

export default HospitalStatus
