import { Button, Form, Input, Modal, Radio, Select } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPatientModalState } from '../../store/addPatientModal/selectors';
import { hidePatientModal } from '../../store/addPatientModal/actions';
import Status from './Status';

interface Props {
  patient: any,
  isView: boolean
}

ModalAddPatient.defaultProps = {
  isView: false
}

function ModalAddPatient(props: Props): ReactElement {
  const show = useSelector(getPatientModalState);
  const [mode, setMode] = useState('Add')
  const [form] = Form.useForm()
  const { isView, patient } = props
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(hidePatientModal())
  }

  // Antd component
  const { Option } = Select;

  // UI handle
  useEffect(() => {
    if(show === false)
      form.resetFields()
    else if(typeof(patient) !== 'undefined'){
      form.setFieldsValue(patient)
      if(isView === true)
        setMode('View')
      else
        setMode('Edit')
    }
    else
      setMode('Add')
  }, [show])

  const handleApprove = () => {
    form.submit()
    // Api for approve here
  }

  return (
    <Modal
      title={ `${mode} Patient Information` }
      visible={show}
      onOk={() => { form.submit() }}
      okText="Save"
      onCancel={handleCancel}
      width={1000}
    >
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={handleApprove}
        form={form}
      >
        <Form.Item
          label="Patient name"
          name="patientName"
          rules={[{ required: true, message: 'Please input your patient name!' }]}
        >
          <Input disabled={isView}/>
        </Form.Item>

        <Form.Item
          label="Address"
          name="patientAddress"
          rules={[{ required: true, message: 'Please input your patient address!' }]}
        >
          <Input disabled={isView}/>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="patientPhoneNumber"
          rules={[{ required: true, message: 'Please input your patient phone number!' }]}
        >
          <Input disabled={isView}/>
        </Form.Item>

        <Form.Item
          label="Severity Level"
          name="patientSeverity"
          rules={[{ required: true, message: 'Please specific severity Level' }]}
        >
          <Select disabled={isView}>
            <Option value="Green">Green</Option>
            <Option value="Yellow">Yellow</Option>
            <Option value="Red">Red</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="patientStatus"
          rules={[{ required: true, message: 'Please specific patient status' }]}
        >
          <Radio.Group disabled={isView}>
            <Radio value="Request">
              <Status type="patient" status="Request" />
            </Radio>
            <Radio value="In progress">
              <Status type="patient" status="In progress" />
            </Radio>
            <Radio value="Complete">
              <Status type="patient" status="Complete" />
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalAddPatient
