import type { NextPage } from "next";
import LayoutHospital from "../../components/Layout/Hospital";
import { List, notification, Switch } from "antd";
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
  const [loading, setLoading] = useState(true)
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
          data: hospitalData.data.isAvailable? 'avaliable':'unavaliable',
        },
      ]
    )
  }

  const handleSwitch = async (event: any) => {
    try{
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/edit-hospital`,
        {
          id: userData.userinfo.hospitalId,
          newData: {
            isAvailable: event
          },
        }
      )
      await fetchApi()
      notification.open({
        message: "Success",
        description: "Change hospital status successful",
      });
    } catch (err) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    } finally {
      setLoading(false);
    }
    
  }

  // onMount
  useEffect(() => {
    console.log('baraEffect')
    fetchApi()
    setLoading(false);
  }, [])

  return (
    <LayoutHospital
      title="Capybara Hospital : Information"
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
                  checked={(item.data === 'avaliable')? true: false}
                  onClick={handleSwitch}
                  loading={loading}
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
