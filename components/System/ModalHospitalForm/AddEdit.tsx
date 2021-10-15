import React, { ReactElement, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import HospitalStatus from "./HospitalStatus";
import Resources from "./Resources";
import { IHospital } from "../../../class/data_struct/hospital";
import { initValue } from "../ModalAddEdit";
import axios from "axios";

interface Props {
  hospitalData: IHospital;
  mode?: "Add" | "Edit" | undefined;
}

interface IHospitalData {
  hospitalName?: string;
  hospitalAddress?: string;
  staff?: string;
  hospitalStatus?: "open" | "close";
}

function AddEditForm(props: Props): ReactElement {
  // let hospitalData: IHospitalData = { hospitalStatus: "open" };
  const { hospitalData, mode } = props;
  const [form] = Form.useForm();
  let formData: IHospital | any = {};

  console.log("hospitalData", hospitalData.isAvailable);

  // get Changed value
  const updateHospitalData = (changed: any) => {
    formData = { ...formData, ...changed };
    console.log(formData);
  };

  // update status toggle value on change
  const updateHospitalStatus = (status: boolean) => {
    updateHospitalData({ isAvailable: status });
  };
  // status getter
  const hospitalstatus = () => {
    // return hospitalData.hospitalStatus;
    return "open";
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/add-hospital`,
        {
          hospitalName: formData.hospitalName,
          hospitalPhoneNumber: formData.hospitalPhoneNumber,
          hospitalConvince: formData.hospitalConvince,
          hospitalAddress: formData.hospitalAddress,
          hospitalStatus: formData.hospitalPhoneNumber,
        }
      );
      notification.open({
        message: "Success",
        description: "Add hospital information successful",
      });
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/edit-hospital`,
        {
          id: hospitalData._id,
          newData: formData,
        }
      );
      notification.open({
        message: "Success",
        description: "Edit hospital information successful",
      });
    } catch (err) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  console.log("mode", mode);
  console.log("hospitalData?.hospitalName", hospitalData?.hospitalName);

  useEffect(() => {
    console.log("set form");
    form.resetFields();
  }, [hospitalData]);

  if (mode === "Edit" && hospitalData?.hospitalName === "") {
    console.log("loading");

    return <div></div>;
  } else if (mode === "Add" && hospitalData.hospitalName !== "") {
    console.log("loading2");

    return <div></div>;
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={hospitalData}
      onValuesChange={updateHospitalData}
      autoComplete="off"
      form={form}
      onFinish={mode === "Add" ? handleAdd : handleEdit}
    >
      <Form.Item
        label="Hospital name"
        name="hospitalName"
        rules={[{ required: true, message: "Please input Hospital name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hospital address"
        name="hospitalAddress"
        rules={[{ required: true, message: "Please input Hospital address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hospital convince"
        name="hospitalConvince"
        rules={[{ required: true, message: "Please input Hospital convince!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hospital phone number"
        name="hospitalPhoneNumber"
        rules={[
          { required: true, message: "Please input Hospital phone number!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Staff"
        name="staff"
        rules={[{ required: true, message: "Please input Staff!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Status">
        <HospitalStatus
          hospitalStatus={hospitalData.isAvailable}
          mode={mode}
          // hospitalStatus="open"
          updateHospitalStatus={updateHospitalStatus}
        />
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
  );
}

export default AddEditForm;
