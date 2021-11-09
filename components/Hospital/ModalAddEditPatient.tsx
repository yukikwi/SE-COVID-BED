import { AutoComplete, Button, Form, Input, Modal, notification, Radio, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientModalState } from "../../store/addPatientModal/selectors";
import { hidePatientModal } from "../../store/addPatientModal/actions";
import Status from "./Status";
import axios from "axios";
import { getUserState } from "../../store/user/selectors";
import tambon from '../../public/location.json';

interface Props {
  patient: any;
  isView: boolean;
}

ModalAddPatient.defaultProps = {
  isView: false,
};

type TambonType = {
  AD_LEVEL: string;
    TA_ID: string;
    TAMBON_T: string;
    TAMBON_E: string;
    AM_ID: string;
    AMPHOE_E: string;
    CH_ID: string;
    CHANGWAT_T: string;
    CHANGWAT_E: string;
    LAT: string;
    LONG: string;
    AMPHOE_T?: undefined;
}

function ModalAddPatient(props: Props): ReactElement {
  const show = useSelector(getPatientModalState);
  const [mode, setMode] = useState("Add");
  const [form] = Form.useForm();
  const { isView, patient } = props;
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);
  const [isDataChange, setIsDataChange] = useState(false);
  const [isSeverityChange, setIsSeverityChange] = useState(false);
  const [options, setOptions] = useState<{ value: string, label: JSX.Element }[]>([]);
  const tambonData:Array<TambonType> | any = tambon["TAMBON"]



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
            patientEmail: formData.patientEmail,
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

  const onSearch = (searchText: string) => {
    const tambonDataResult = tambonData.filter((item:TambonType) => {
      return item.TAMBON_T.includes(searchText)
    } )
    
    let tambonUI = []
    for(let i = 0; i < tambonDataResult.length; i++){
      tambonUI.push({
        value: `${tambonDataResult[i].TAMBON_T} - ${tambonDataResult[i].AMPHOE_T} - ${tambonDataResult[i].CHANGWAT_T}`,
        label: (
          <div className="tw-flex tw-justify-between">
            <span>
              {tambonDataResult[i].TAMBON_T} - {tambonDataResult[i].AMPHOE_T} - {tambonDataResult[i].CHANGWAT_T}
            </span>
          </div>
        ),
      })
    }
    if(searchText.length >= 2){
      setOptions(
        !searchText ? [{
          value: '-1',
          label: (
            <div className="tw-flex tw-justify-between">
            <span>
              Please enter more than 2 characters.
            </span>
          </div>
          )
        }] : tambonUI,
      );
    }
  };

  const onSelect = (value: string) => {
    const data = value.split(' - ')
    console.log(data)
    if(value != '-1'){
      const tambonDataResult = tambonData.filter((x:any) => {
        return x.TAMBON_T === data[0] && x.AMPHOE_T === data[1] && x.CHANGWAT_T === data[2]
      })
      console.log(tambonDataResult)
      form.setFieldsValue({
        subdistrict: data[0],
        district: data[1],
        province: data[2]
      })
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
          label="Sub District"
          name="subdistrict"
          rules={[
            { required: true, message: "Please input your sub district!" },
          ]}
        >
          <AutoComplete
            disabled={isView} 
            options={options}
            onSearch={onSearch}
            onSelect={onSelect}
          />
        </Form.Item>

        <Form.Item
          label="District"
          name="district"
          rules={[
            { required: true, message: "Please input your district!" },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Province"
          name="province"
          rules={[
            { required: true, message: "Please input your province!" },
          ]}
        >
          <Input disabled />
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
          label="Email"
          name="patientEmail"
          rules={[
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input />
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
