import React, { ReactElement, useEffect, useState } from "react";
import { Form, Input, Button, notification, Select, AutoComplete } from "antd";
import HospitalStatus from "./HospitalStatus";
import Resources from "./Resources";
import { IHospital } from "../../../class/data_struct/hospital";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAddOrEditModalState } from "../../../store/addOrEditHospitalModal/selectors";
import { getMapState } from '../../../store/map/selectors';
import { setLoc } from "../../../store/map/actions";
import { TambonType } from '../../TamBonType'
import tambon from '../../../public/location.json';
import Map from '../../Map/Map'

interface Props {
  hospitalData: IHospital;
  mode?: "Add" | "Edit" | undefined;
  isShow: boolean;
}

function AddEditForm(props: Props): ReactElement {
  const { Option } = Select;
  const [dummyUser, setDummyUser] = useState<Array<any>>([]);
  const [addHospital, setAddHospital] = useState<any>({ _id: null });
  const [options, setOptions] = useState<{ value: string, label: JSX.Element }[]>([]);
  const dispatch = useDispatch();
  const [preLat, setPreLat] = useState(0)
  const [preLong, setPreLong] = useState(0)
  const tambonData:Array<TambonType> | any = tambon["TAMBON"]
  const loc = useSelector(getMapState)
  const [isAvailable, setIsAvaliable] = useState<boolean>()

  // Fetch Data
  const setUserData = async () => {
    const userList = await axios.get(`${process.env.NEXT_PUBLIC_APP_API}/get-hospital-staff`) as any
    setDummyUser(userList.data.data);
  };

  useEffect(() => {
    setUserData();
  }, []);

  const { hospitalData, mode } = props;
  const [form] = Form.useForm();
  const { show } = useSelector(getAddOrEditModalState);

  console.log("hospitalData", hospitalData.isAvailable);

  // Event handler
  const updateHospitalStatus = (status: boolean) => {
    setIsAvaliable(status)
  };

  const handleAdd = async () => {
    let formData = form.getFieldsValue()
    try {
      const res = (await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/hospital/add-hospital`,
        {
          hospitalName: formData.hospitalName,
          hospitalPhoneNumber: formData.hospitalPhoneNumber,
          hospitalConvince: formData.hospitalConvince,
          hospitalSubDistrict: formData.hospitalSubDistrict,
          hospitalDistrict: formData.hospitalDistrict,
          hospitalProvince: formData.hospitalProvince,
          hospitalAddress: formData.hospitalAddress,
          hospitalLocationLat: loc.lat,
          hospitalLocationLong: loc.long,
          hospitalStatus: formData.hospitalPhoneNumber,
          staff: formData.staff,
          isAvailable
        }
      )) as any;
      notification.open({
        message: "Success",
        description: "Add hospital information successful",
      });
      console.log("res", res.data);

      setAddHospital(res.data.hospitalData);
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
      let formData = form.getFieldsValue()
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/edit-hospital`,
        {
          id: hospitalData._id,
          newData: {
            ...formData, 
            isAvailable
          },
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

  // map handler
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
      setOptions(tambonUI);
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
        hospitalSubDistrict: data[0],
        hospitalDistrict: data[1],
        hospitalProvince: data[2]
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
  // end map handler

  useEffect(() => {
    setAddHospital({ _id: null });
    form.resetFields();
  }, [hospitalData, show]);

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
          label="Sub District"
          name="hospitalSubDistrict"
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
          name="hospitalDistrict"
          rules={[
            { required: true, message: "Please input your district!" },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Province"
          name="hospitalProvince"
          rules={[
            { required: true, message: "Please input your province!" },
          ]}
        >
          <Input disabled />
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

      <Form.Item name="staff" label="Staff" rules={[{ required: true }]}>
        <Select placeholder="Select a option and change input text above">
          {dummyUser.map((user) => {
            return <Option key={user._id} value={user._id}>{user.username}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Status">
        <HospitalStatus
          hospitalStatus={hospitalData.isAvailable}
          mode={mode}
          updateHospitalStatus={updateHospitalStatus}
        />
      </Form.Item>

      <Map preLat={preLat} preLong={preLong} />

      <Form.Item className="tw-my-5" wrapperCol={{ span: 24 }}>
        <Button
          className="tw-w-full"
          type="primary"
          htmlType="submit"
          disabled={mode === "Add" && addHospital._id ? true : false}
        >
          Submit
        </Button>
      </Form.Item>

      <div className="tw-mb-5">
        <Resources
          hospitalId={mode === "Edit" ? hospitalData._id : addHospital._id}
          isShow
        />
      </div>
    </Form>
  );
}

export default AddEditForm;
