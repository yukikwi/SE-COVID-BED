import React, { ReactElement } from 'react'
import { Form, Input, Button, Switch } from 'antd';

interface Props {
  
}

interface IHospitalData {
  hospitalName?: string,
  hospitalAddress?: string,
  staff?: string,
  hospitalStatus?: 'open'|'close'
}

function AddEditForm({}: Props): ReactElement {
  let hospitalData:IHospitalData = { hospitalStatus: 'open' }
  let formData:IHospitalData = {}

  // If fetch data from api
  hospitalData = { hospitalName: 'Capybara Hospital', hospitalStatus: 'close' }

  // UI status
  const HospitalStatus = () => {
    const hospitalStatus = hospitalData.hospitalStatus
    if(hospitalStatus === 'open'){
      return <Switch onChange={ updateHospitalStatus } checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
    }
    else{
      return <Switch onChange={ updateHospitalStatus } checkedChildren="Open" unCheckedChildren="Close" />
    }
  }

  // get Changed value 
  const updateHospitalData = (changed:IHospitalData) => {
    formData = {...formData, ...changed}
    console.log(formData)
  }

  // update status toggle value on change
  const updateHospitalStatus = (status:boolean) => {updateHospitalData({hospitalStatus: (status)? 'open':'close'})}

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={ hospitalData }
      onValuesChange={ updateHospitalData }
      autoComplete="off"
    >
      <Form.Item
        label="Hospital name"
        name="hospitalName"
        rules={[{ required: true, message: 'Please input Hospital name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hospital address"
        name="hospitalAddress"
        rules={[{ required: true, message: 'Please input Hospital address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Staff"
        name="staff"
        rules={[{ required: true, message: 'Please input Staff!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Staff"
        name="staff"
        rules={[{ required: true, message: 'Please input Staff!' }]}
      >
        <HospitalStatus />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddEditForm
