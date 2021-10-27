import { Button, Form, Input, Modal, notification, Radio, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientModalState } from "../../store/addPatientModal/selectors";
import { hidePatientModal } from "../../store/addPatientModal/actions";
import Status from "./Status";
import axios from "axios";
import { getUserState } from "../../store/user/selectors";

interface Props {
  patient: any;
  isView: boolean;
}

ModalAddPatient.defaultProps = {
  isView: false,
};

function ModalAddPatient(props: Props): ReactElement {
  const show = useSelector(getPatientModalState);
  const [mode, setMode] = useState("Add");
  const [form] = Form.useForm();
  const { isView, patient } = props;
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);
  const [isDataChange, setIsDataChange] = useState(false);
  const [isSeverityChange, setIsSeverityChange] = useState(false);

  const handleCancel = () => {
    dispatch(hidePatientModal());
  };

  // Antd component
  const { Option } = Select;

  // UI handle
  useEffect(() => {
    setIsDataChange(false);
    setIsSeverityChange(false);
    if (show === false) form.resetFields();
    else if (typeof patient !== "undefined") {
      console.log("patient", patient);

      form.setFieldsValue(patient);
      if (isView === true) setMode("View");
      else setMode("Edit");
    } else setMode("Add");
  }, [show]);

  const handleSeverityChange = (event: any) => {
    setIsSeverityChange(true);
  };

  const handleDataChange = (event: any) => {
    setIsDataChange(true);
  }

  const handleApprove = async (formData: any) => {
    // Api for approve here
    console.log("mode", mode);

    const hospitalId = userData.userinfo.hospitalId;
    if (mode === "Add") {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/patient/add-patient`,
          {
            patientName: formData.patientName,
            patientHospital: hospitalId,
            patientAddress: formData.patientAddress,
            patientPhoneNumber: formData.patientPhoneNumber,
            patientStatus: formData.patientStatus,
            patientSeverityLabel: formData.patientSeverityLabel,
          }
        );

        // Notification
        notification.open({
          message: "Success",
          description: "Add patient information successful",
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
    } else if (mode === "Edit") {
      try {
        console.log(formData);
        let newData = {};
        let newPatientSeverityLog = {};
        if(isDataChange && !isSeverityChange) {
          console.log("isDataChange");
          newData = {
            patientName: formData.patientName,
            patientAddress: formData.patientAddress,
            patientPhoneNumber: formData.patientPhoneNumber,
            patientStatus: formData.patientStatus
          };
          newPatientSeverityLog = {};
        } else if (!isDataChange && isSeverityChange) {
          console.log("isSeverityChange");
          newData = {};
          newPatientSeverityLog = {
            patientSeverityLabel: formData.patientSeverity,
            patient: patient._id
          };
        } else {
          console.log("change both");
          newData = {
            patientName: formData.patientName,
            patientAddress: formData.patientAddress,
            patientPhoneNumber: formData.patientPhoneNumber,
            patientStatus: formData.patientStatus
          };
          newPatientSeverityLog = {
            patientSeverityLabel: formData.patientSeverity,
            patient: patient._id
          };
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/patient/edit-patient`,
          {
            id: patient._id,
            newData,
            newPatientSeverityLog,
          });
          console.log(newData);
          console.log(newPatientSeverityLog);
          notification.open({
            message: "Success",
            description:
              "Edit patient information successful.",
          });
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
      title={`${mode} Patient Information`}
      visible={show}
      onCancel={handleCancel}
      width={1000}
      footer={
        mode === 'View'? 
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>
        :
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
          label="Patient name"
          name="patientName"
          rules={[
            { required: true, message: "Please input your patient name!" },
          ]}
        >
          <Input disabled={isView} onChange={handleDataChange} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="patientAddress"
          rules={[
            { required: true, message: "Please input your patient address!" },
          ]}
        >
          <Input disabled={isView} onChange={handleDataChange} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="patientPhoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your patient phone number!",
            },
          ]}
        >
          <Input disabled={isView} onChange={handleDataChange} />
        </Form.Item>

        <Form.Item
          label="Severity Level"
          name="patientSeverity"
          rules={[
            { required: true, message: "Please specific severity Level" },
          ]}
        >
          <Select disabled={isView} onChange={handleSeverityChange}>
            <Option value="Green">Green</Option>
            <Option value="Yellow">Yellow</Option>
            <Option value="Red">Red</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="patientStatus"
          rules={[
            { required: true, message: "Please specific patient status" },
          ]}
        >
          <Radio.Group disabled={isView} onChange={handleDataChange}>
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
  );
}

export default ModalAddPatient;
