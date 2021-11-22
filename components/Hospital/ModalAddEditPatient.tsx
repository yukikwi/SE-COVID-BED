import { AutoComplete, Button, Form, Input, Modal, notification, Radio, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientModalState } from "../../store/addPatientModal/selectors";
import { hidePatientModal } from "../../store/addPatientModal/actions";
import Status from "./Status";
import axios from "axios";
import { getUserState } from "../../store/user/selectors";
import tambon from '../../public/location.json';
import { TambonType } from "../../class/data_struct/TamBonType";
import { validatePhoneNumber } from "../../utils/validate";

interface Props {
  patient: any;
  isView: boolean;
}

ModalAddPatient.defaultProps = {
  isView: false,
};

function ModalAddPatient(props: Props): ReactElement {
  // state and redux part
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
  const [phoneNumStatus, setPhoneNumStatus] = useState(false)

  // Antd component
  const { Option } = Select;

  // UI handle
  useEffect(() => {
    setIsDataChange(false);
    setIsSeverityChange(false);
    if (show === false) form.resetFields();
    else if (typeof patient !== "undefined") {
      form.setFieldsValue(patient);
      if (isView === true)
        setMode("View");
      else
        setMode("Edit");
    }
    else
      setMode("Add");
  }, [show]);

  // event handler
  const handleCancel = () => {
    dispatch(hidePatientModal());
  };

  const handleSeverityChange = () => {
    setIsSeverityChange(true);
  };

  const handleDataChange = () => {
    setIsDataChange(true);
  }

  const handleApprove = async (formData: any) => {
    // Api for approve here

    const hospitalId = userData.userinfo.hospitalId;
    if (mode === "Add") {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/patient/add-patient`,
          {
            ...formData,
            patientHospital: hospitalId
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
        let newData = {};
        let newPatientSeverityLog = {};
        if(isDataChange && !isSeverityChange) {
          newData = formData;
          newPatientSeverityLog = {};
        } else if (!isDataChange && isSeverityChange) {
          newData = {};
          newPatientSeverityLog = {
            patientSeverityLabel: formData.patientSeverity,
            patient: patient._id
          };
        } else {
          newData = formData;
          newPatientSeverityLog = {
            patientSeverityLabel: formData.patientSeverity,
            patient: patient._id
          };
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/patient/edit-patient`,
          {
            id: patient._id,
            newData,
            newPatientSeverityLog,
          });
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
    if(searchText.length >= 2)
      setOptions(tambonUI);
    else
      setOptions([]);
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
        patientSubDistrict: data[0],
        patientDistrict: data[1],
        patientProvince: data[2]
      })
    }
  };

  // validate phone number on change
  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update validate status
    const text = e.target.value
    setPhoneNumStatus(validatePhoneNumber(text))
  }

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
          name="patientSubDistrict"
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
          name="patientDistrict"
          rules={[
            { required: true, message: "Please choose sub district from provided list!" },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Province"
          name="patientProvince"
          rules={[
            { required: true, message: "Please choose sub district from provided list!" },
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
          hasFeedback
          validateStatus={phoneNumStatus? 'success':'error'}
        >
          <Input disabled={isView} onChange={(e) => {handleDataChange; onPhoneNumberChange(e)}} />
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
            {
              required: true,
              message: "Please input your email!"
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            }
          ]}
        >
          <Input disabled={isView}/>
        </Form.Item>

        <Form.Item
          label="Status"
          name="patientStatus"
          rules={[
            { required: true, message: "Please specific patient status" },
          ]}
        >
          <Radio.Group disabled={isView} onChange={handleDataChange}>
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
