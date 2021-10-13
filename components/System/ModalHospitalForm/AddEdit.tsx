import React, { ReactElement } from 'react'
import { Form, Input, Button } from 'antd';
import HospitalStatus from './HospitalStatus'
import Resources from './Resources'

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

  // get Changed value 
  const updateHospitalData = (changed:IHospitalData) => {
    formData = {...formData, ...changed}
    console.log(formData)
  }

  // update status toggle value on change
  const updateHospitalStatus = (status:boolean) => {updateHospitalData({hospitalStatus: (status)? 'open':'close'})}
  // status getter
  const hospitalstatus = () => { return hospitalData.hospitalStatus }

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
        label="Status"
      >
        <HospitalStatus hospitalStatus={hospitalstatus()} updateHospitalStatus={updateHospitalStatus}/>
      </Form.Item>
      
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <div className="tw-mb-5">
        <Resources />
      </div>

    </Form>
  )
}

export default AddEditForm
