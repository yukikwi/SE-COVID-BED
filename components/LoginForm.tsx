import React, { ReactElement, useState } from "react";
import { Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import PositiveButton from "./PositiveButton";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {}

function LoginForm({}: Props): ReactElement {
  const router = useRouter();
  const [form] = Form.useForm();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnChangeUsername = (e: any) => {
    console.log('Username: '+username)
    setUsername(e.target.value);
  };

  const handleOnChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleClickLogin = async () => {
    try {
      const res = (await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/login`,
        {
          username,
          password,
        }
      )) as any;
      console.log("connected");
      if (res.status === 200) {
        // router.push("/home");
        message.success("success");
      }
    } catch (err: any) {
      console.log("error");
      if (err.response.status !== 400) {
        setUsername('');
        setPassword('');
        form.setFieldsValue({
          password: ''
        })
        message.error(err.response.data.error);
      } else {
        message.error("Internal server error");
      }
    }
  };

  return (
    <div>
      <Form name="basic" form={form} initialValues={{}} autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            placeholder="USERNAME"
            prefix={<UserOutlined />}
            value={username}
            onChange={handleOnChangeUsername}
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
            value={password}
            onChange={handleOnChangePassword}
          />
        </Form.Item>

        <Form.Item className="tw-text-center">
          <PositiveButton
            className="tw-mt-3 md:tw-mt-0 tw-w-full"
            htmlType="submit"
            onClick={handleClickLogin}
            text="Login"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
