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
import { TambonType } from '../../class/data_struct/TamBonType';
import { validatePhoneNumber } from '../../utils/validate';

interface Props {
  
}

function ModalTicket({}: Props): ReactElement {
  // redux and state part
  const dispatch = useDispatch();
  const show = useSelector(getTicketModalState);
  const [form] = Form.useForm();
  const [options, setOptions] = useState<{ value: string, label: JSX.Element }[]>([]);
  const tambonData:Array<TambonType> | any = tambon["TAMBON"]
  const loc = useSelector(getMapState)
  const [preLat, setPreLat] = useState(0)
  const [preLong, setPreLong] = useState(0)
  const [phoneNumStatus, setPhoneNumStatus] = useState(false)

  // antd component
  const { Option } = Select;

  // event handler
  const handleSubmit = async (formData: any) => {
    if(phoneNumStatus){
      try {
        
        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API}/patient/add-request-bed`,
          {
            ...formData,
            patientLocation: {
              lat: loc.lat,
              long: loc.long,
            }
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
        console.log(error)
        notification.open({
          message: "Error",
          description:
            "Cannot connect to api. Please contact admin for more information.",
        });
      }
    }
    else{
      notification.open({
        message: "Error",
        description:
          "Please input valid phone number",
      });
    }
  }

  const handleCancel = () => {
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
      dispatch(setLoc({
        lat: Number(tambonDataResult[0].LAT),
        long: Number(tambonDataResult[0].LONG),
      }))
      setPreLat(Number(tambonDataResult[0].LAT))
      setPreLong(Number(tambonDataResult[0].LONG))
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
        onFinish={handleSubmit}
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
          label="Phone number"
          name="patientPhoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
          hasFeedback
          validateStatus={phoneNumStatus? 'success':'error'}
        >
          <Input onChange={onPhoneNumberChange} />
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
          <Input />
        </Form.Item>

        <Map preLat={preLat} preLong={preLong} />

      </Form>
    </Modal>
  )
}

export default ModalTicket
