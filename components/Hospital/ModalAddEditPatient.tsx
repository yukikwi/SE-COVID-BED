import { Form, Input, Modal, Radio, Select } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPatientModalState } from '../../store/addPatientModal/selectors';
import { hidePatientModal } from '../../store/addPatientModal/actions';
import Status from './Status';

interface Props {
  
}

function ModalAddPatient({}: Props): ReactElement {
  const show = useSelector(getPatientModalState);
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(hidePatientModal())
  }

  const handleApprove = () => {
    form.submit()
    // Api for approve here
  }

  // Antd component
  const { Option } = Select;

  // UI handle
  useEffect(() => {
    if(show === false)
      form.resetFields()
  }, [show])

  return (
    <Modal
      title="Add Patient Information"
      visible={show}
      onOk={handleApprove}
      okText="Save"
      onCancel={handleCancel}
      width={1000}
    >
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Patient name"
          name="patientName"
          rules={[{ required: true, message: 'Please input your patient name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="patientAddress"
          rules={[{ required: true, message: 'Please input your patient address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="patientPhoneNumber"
          rules={[{ required: true, message: 'Please input your patient phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Severity Level"
          name="patientSeverity"
          rules={[{ required: true, message: 'Please specific severity Level' }]}
        >
          <Select>
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
          <Radio.Group>
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
