import type { NextPage } from "next";
import LayoutHospital from "../../components/Layout/Hospital";
import { List, Switch } from "antd";
import axios from "axios";
import { getUserState } from "../../store/user/selectors";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

const HospitalIndex: NextPage = () => {
  // pre-set data
  const data = [
    {
      type: "string",
      title: "Hospital Name",
      data: "loading...",
    },
    {
      type: "string",
      title: "Hospital address",
      data: "loading...",
    },
    {
      type: "string",
      title: "Staff Name",
      data: "loading...",
    },
    {
      type: "switch",
      title: "Status",
      data: "",
    },
  ];

  // state part
  const [hospitalInfo, setHospitalInfo] = useState(data)
  const userData = useSelector(getUserState);

  // fetch hospital information
  const fetchApi = async () => {
    const hospitalData = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API}/hospital/${userData.userinfo.hospitalId}` 
    ) as any

    setHospitalInfo(
      [
        {
          type: "string",
          title: "Hospital Name",
          data: hospitalData.data.hospitalName,
        },
        {
          type: "string",
          title: "Hospital address",
          data: hospitalData.data.hospitalAddress,
        },
        {
          type: "string",
          title: "Staff Name",
          data: hospitalData.data.staff.username,
        },
        {
          type: "switch",
          title: "Status",
          data: hospitalData.data.staff.isAvailable? 'avaliable':'unavaliable',
        },
      ]
    )
  }

  // onMount
  useEffect(() => {
    console.log('baraEffect')
    fetchApi()
  }, [])

  return (
    <LayoutHospital
      title="Capybara Hospital : Info"
      button={<></>}
    >
      <List
        bordered
        dataSource={hospitalInfo}
        renderItem={(item) => (
          <List.Item>
            <span>
              <label className="tw-font-bold">{item.title}: </label>
              {item.type === "switch" ? (
                <Switch
                  checkedChildren="เปิด"
                  unCheckedChildren="ปิด"
                  defaultChecked={(item.data === 'avaliable')? true: false}
                />
              ) : (
                item.data
              )}
            </span>
          </List.Item>
        )}
      />
    </LayoutHospital>
  );
};

export default HospitalIndex;
