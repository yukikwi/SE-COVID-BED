import React, { ReactElement, useState } from "react";
import { Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import PositiveButton from "./PositiveButton";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "../store/user/actions";
import { useDispatch } from 'react-redux';

interface Props {}

function LoginForm({}: Props): ReactElement {
  // state part
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // form submit event
  const handleFormSubmit = async () => {
    const { username, password } = form.getFieldsValue()
    try {
      const res = (await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/login`,
        {
          username,
          password,
        }
      )) as any;
      
      // check is credential correct
      if (res.status === 200) {
        const userData = res.data.userData

        // redirect by role
        if(userData.role === 'system_admin'){
          router.push("/system");
        }
        if(userData.role === 'hospital'){
          router.push("/hospital");
        }
        dispatch(setUser(userData))
        message.success("success");
      }
    } catch (err: any) {
      // check wrong credential or server error
      if (err.response.status !== 400) {
        form.setFieldsValue({
          password: ''
        })
        message.error("Wrong username / password");
      } else {
        message.error("Internal server error");
      }
    }
  };

  return (
    <div>
      <Form name="basic" form={form} onFinish={handleFormSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            placeholder="USERNAME"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            placeholder="PASSWORD"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item className="tw-text-center">
          <PositiveButton
            id="login"
            className="tw-mt-3 md:tw-mt-0 tw-w-full"
            onClick={()=>{}}
            htmlType="submit"
            text="Login"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;

