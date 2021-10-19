import type { NextPage } from "next";
import LayoutHospital from "../../components/Layout/Hospital";
import { List, Switch, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

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
      button={
        <Button
          className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto"
          type="primary"
          shape="round"
          icon={<PlusSquareOutlined />}
          size="large"
        >
          add resource
        </Button>
      }
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
