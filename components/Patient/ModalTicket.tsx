import { Button, Form, Input, Modal, Select } from 'antd'
import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideTicketModal } from '../../store/ticketModal/actions';
import { getTicketModalState } from '../../store/ticketModal/selectors';

interface Props {
  
}

function ModalTicket({}: Props): ReactElement {
  const dispatch = useDispatch();
  const show = useSelector(getTicketModalState);
  const [form] = Form.useForm();

  // antd component
  const { Option } = Select;

  const handleApprove = () => {
    // bara submit
  }

  const handleCancel = () => {
    // bara
    dispatch(hideTicketModal())
  }

  return (
    <Modal
      title={`Request Bed Information`}
      visible={show}
      onCancel={handleCancel}
      width={1000}
      footer={
        [
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={() => {form.submit()}}>
            Save
          </Button>
        ]
      }
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
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please input your address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phonenumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Severity Level"
          name="patientSeverity"
          rules={[
            { required: true, message: "Please specific severity Level" },
          ]}
        >
          <Select>
            <Option value="Green">Green</Option>
            <Option value="Yellow">Yellow</Option>
            <Option value="Red">Red</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default ModalTicket
