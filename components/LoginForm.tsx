import React, { ReactElement } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PositiveButton from './PositiveButton';

interface Props {
  
}

function LoginForm({}: Props): ReactElement {
  return (
    <div>
      <Form
        name="basic"
        initialValues={{}}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" placeholder="USERNAME" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input size="large" placeholder="PASSWORD" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item className="tw-text-center">
          <PositiveButton className="tw-mt-3 md:tw-mt-0 tw-w-full md:tw-w-4/5" htmlType="submit" text="Login"/>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
