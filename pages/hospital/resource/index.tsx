import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import { Table, Button, Popover } from "antd";
import Status from "../../../components/Hospital/Status";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

type TResource = {
  key: string;
  resource: string;
  amount: number;
  available: number;
};

const HospitalResourceIndex: NextPage = () => {
  // Dummy Hospital data
  const columns = [
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
    },
    {
      title: "Maximum",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Status",
      key: "status",
      render: (record: TResource) => (
        <Status available={record.available} amount={record.amount} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TResource) => (
        <div>
          <Popover
            content={(
              <span className="tw-font-bold">View</span>
            )}
          >
            <a className="hover:tw-text-green-500" href="#">
              <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Popover>

          <Popover
            content={(
              <span className="tw-font-bold">Edit</span>
            )}
          >
            <a className="hover:tw-text-yellow-500" href="#">
              <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Popover>

          <Popover
            content={(
              <span className="tw-font-bold">Remove</span>
            )}
          >
            <a className="hover:tw-text-red-500" href="#">
              <DeleteOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Popover>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      resource: "bed",
      amount: 32,
      available: 32,
    },
    {
      key: "2",
      resource: "Respirator",
      amount: 32,
      available: 32,
    },
  ];

  return (
    <LayoutHospital
      title="Capybara Hospital : Resource list"
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
      <div className="tw-overflow-x-scroll">
        <Table columns={columns} dataSource={data} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
