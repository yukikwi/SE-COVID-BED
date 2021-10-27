import type { NextPage } from "next";
import LayoutHospital from "../../components/Layout/Hospital";
import { List, Switch } from "antd";

const HospitalIndex: NextPage = () => {
  const data = [
    {
      type: "string",
      title: "Hospital Name",
      data: "Capybara Hospital",
    },
    {
      type: "string",
      title: "Hospital address",
      data: "BaraLand",
    },
    {
      type: "string",
      title: "Staff Name",
      data: "Dr.DIO",
    },
    {
      type: "switch",
      title: "Status",
      data: "",
    },
  ];

  return (
    <LayoutHospital
      title="Capybara Hospital : Info"
      button={<></>}
    >
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <span>
              <label className="tw-font-bold">{item.title}: </label>
              {item.type === "switch" ? (
                <Switch
                  checkedChildren="เปิด"
                  unCheckedChildren="ปิด"
                  defaultChecked
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
