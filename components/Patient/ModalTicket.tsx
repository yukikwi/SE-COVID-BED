import { AutoComplete, Button, Form, Input, Modal, Select } from 'antd'
import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideTicketModal } from '../../store/ticketModal/actions';
import { getTicketModalState } from '../../store/ticketModal/selectors';
import tambon from '../../public/location.json';
import Map from '../Map/Map'
import { getMapState } from '../../store/map/selectors';
import { setLoc } from '../../store/map/actions';
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
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const tambonData:Array<TambonType> | any = tambon["TAMBON"]
  const loc = useSelector(getMapState)
  const [preLat, setPreLat] = useState(0)
  const [preLong, setPreLong] = useState(0)

  // antd component
  const { Option } = Select;

  const handleApprove = () => {
    // bara submit
    console.log(loc)
  }

  const handleCancel = () => {
    // bara
    dispatch(hideTicketModal())
  }

  const addrToLoc = async () => {
    const address = form.getFieldValue('address')
    if(address !== ''){
      const tambonDataa = tambonData.filter((item:TambonType) => {
        return item.TAMBON_T.includes('บางขวัญ')
      } )
      console.log('tambonDataa', tambonDataa)
    }
    
  }

  const onSearch = (searchText: string) => {
    const tambonDataResult = tambonData.filter((item:TambonType) => {
      return item.TAMBON_T.includes(searchText)
    } )
    const tambonOnlyData = tambonDataResult.map((x:TambonType) => x.TAMBON_T)
    let tambonUI = []
    for(let i = 0; i < tambonOnlyData.length; i++){
      tambonUI.push({
        value: tambonOnlyData[i]
      })
    }
    console.log(tambonUI)
    if(searchText.length >= 2){
      setOptions(
        !searchText ? [] : tambonUI,
      );
    }
  };

  const onSelect = (data: string) => {
    const tambonDataResult = tambonData.filter((item:TambonType) => {
      return item.TAMBON_T.includes(data)
    } )
    form.setFieldsValue({
      district: tambonDataResult[0].AMPHOE_T,
      province: tambonDataResult[0].CHANGWAT_T
    })

    // update Map loc
    console.log('Update prop')
    dispatch(setLoc({
      lat: Number(tambonDataResult[0].LAT),
      long: Number(tambonDataResult[0].LONG),
    }))
    setPreLat(Number(tambonDataResult[0].LAT))
    setPreLong(Number(tambonDataResult[0].LONG))
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
          </Button>,,
          <Button type="default" onClick={() => {addrToLoc()}}>
            Get location from address
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
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please input your address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sub District"
          name="subdistrict"
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
          label="Phone number"
          name="phonenumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Severity Level"
          name="patientSeverity"
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
          name="email"
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
