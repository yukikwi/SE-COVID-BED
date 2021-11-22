import { AutoComplete, Button, Form, Input, Modal, notification, Select } from 'antd'
import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideTicketModal } from '../../store/ticketModal/actions';
import { getTicketModalState } from '../../store/ticketModal/selectors';
import tambon from '../../public/location.json';
import Map from '../Map/Map'
import { getMapState } from '../../store/map/selectors';
import { setLoc } from '../../store/map/actions';
import axios from "axios";

interface Props {
  
}

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
function ModalTicket({}: Props): ReactElement {
  const dispatch = useDispatch();
  const show = useSelector(getTicketModalState);
  const [form] = Form.useForm();
  const [options, setOptions] = useState<{ value: string, label: JSX.Element }[]>([]);
  const tambonData:Array<TambonType> | any = tambon["TAMBON"]
  const loc = useSelector(getMapState)
  const [preLat, setPreLat] = useState(0)
  const [preLong, setPreLong] = useState(0)

  // antd component
  const { Option } = Select;

  const handleApprove = async (formData: any) => {
    // bara submit
    try {
      console.log("formData", formData);
      
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/patient/add-request-bed`,
        {
          patientName: formData.patientName,
          patientAddress: formData.patientAddress,
          patientSubDistrict: formData.patientSubDistrict,
          patientDistrict: formData.patientDistrict,
          patientProvince: formData.patientProvince,
          patientLocation: {
            lat: loc.lat,
            long: loc.long,
          },
          patientPhoneNumber: formData.patientPhoneNumber,
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
      // handleCancel();
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  }

  const handleCancel = () => {
    // bara
    dispatch(hideTicketModal())
  }

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
        patientSubDistrict: data[0],
        patientDistrict: data[1],
        patientProvince: data[2]
      })

      // update Map loc
      console.log('Update prop')
      dispatch(setLoc({
        lat: Number(tambonDataResult[0].LAT),
        long: Number(tambonDataResult[0].LONG),
      }))
      setPreLat(Number(tambonDataResult[0].LAT))
      setPreLong(Number(tambonDataResult[0].LONG))
    }
  };

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
          name="patientName"
          rules={[
            { required: true, message: "Please input your name!" },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Address"
          name="patientAddress"
          rules={[
            { required: true, message: "Please input your address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sub District"
          name="patientSubDistrict"
          rules={[
            { required: true, message: "Please input your sub district!" },
          ]}
        >
          <AutoComplete
            options={options}
            onSearch={onSearch}
            onSelect={onSelect}
          />
        </Form.Item>

        <Form.Item
          label="District"
          name="patientDistrict"
          rules={[
            { required: true, message: "Please input your district!" },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Province"
          name="patientProvince"
          rules={[
            { required: true, message: "Please input your province!" },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="patientPhoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Severity Level"
          name="patientSeverityLabel"
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
          name="patientEmail"
          rules={[
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Map preLat={preLat} preLong={preLong} />

      </Form>
    </Modal>
  )
}

export default ModalTicket
