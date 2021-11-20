import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification
} from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceModalState } from "../../store/addResourceModal/selectors";
import { hideResourceModal } from "../../store/addResourceModal/actions";
import axios from "axios";
import { getUserState } from "../../store/user/selectors";

interface Props {
  resource: any;
  isView: boolean;
}

ModalAddResource.defaultProps = {
  isView: false,
};

function ModalAddResource(props: Props): ReactElement {
  const show = useSelector(getResourceModalState);
  const [mode, setMode] = useState("Add");
  const [avaliableLimit, setAvaliableLimit] = useState(0)
  const [form] = Form.useForm();
  const userData = useSelector(getUserState);
  const { isView, resource } = props;
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideResourceModal());
  };

  // UI handle
  useEffect(() => {
    if (show === false)
      form.resetFields();
    else if (typeof resource !== "undefined") {
      form.setFieldsValue(resource);
      if (isView === true)
        setMode("View");
      else
        setMode("Edit");
    }
    else
      setMode("Add");
    
    // set limit
    setAvaliableLimit(form.getFieldValue("maximum"))
  }, [show]);

  const handleApprove = async (formData: any) => {
    // Api for call here
    if (mode === "Add") {
      try {
        const hospitalId = userData.userinfo.hospitalId;

        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/resource/add-resource`,
          {
            ...formData,
            resourceHospital: hospitalId
          }
        );
        notification.open({
          message: "Success",
          description: "Add resource information successful",
        });

        // Close this modal
        handleCancel();
      } catch (error) {
        notification.open({
          message: "Error",
          description:
            "Cannot connect to api. Please contact admin for more information.",
        });
      }
    } else {
      //call edit api
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/resource/edit-resource`,
          {
            id: resource._id,
            newData: formData
          }
        );

        notification.open({
          message: "Success",
          description: "Edit resource information successful",
        });

        // Close this modal
        handleCancel();
      } catch (error) {
        notification.open({
          message: "Error",
          description:
            "Cannot connect to api. Please contact admin for more information.",
        });
      }
    }
  };

  return (
    <Modal
      title={`${mode} Resource Information`}
      visible={show}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
      width={1000}
      footer={
        mode === "View" ? (
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>
        ) : (
          [
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              Save
            </Button>,
          ]
        )
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
          label="Resource name"
          name="resourceName"
          rules={[
            { required: true, message: "Please input your resource name!" },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>

        <Form.Item
          label="Resource code"
          name="resourceCode"
          rules={[
            { required: true, message: "Please input your resource code!" },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>

        <Form.Item
          label="Maximum"
          name="maximum"
          rules={[
            { required: true, message: "Please input your resource maximum!" },
          ]}
        >
          <InputNumber min="0" disabled={isView} onChange={() => setAvaliableLimit(form.getFieldValue("maximum"))} />
        </Form.Item>

        <Form.Item
          label="Available"
          name="available"
          rules={[
            {
              required: true,
              message: "Please input your resource available!",
            },
          ]}
        >
          <InputNumber min={0} max={avaliableLimit} disabled={isView} />
        </Form.Item>

        <Form.Item
          label="Remark"
          name="remark"
          rules={[
            { required: true, message: "Please input your resource remark!" },
          ]}
        >
          <Input disabled={isView} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAddResource;
