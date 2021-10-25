import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import { Table, Button, Tooltip } from "antd";
import Status from "../../../components/Hospital/Status";
import { showResourceDeleteModal as storeShowResourceDeleteModal } from "../../../store/deleteModal/actions"
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ModalDelete from "../../../components/Hospital/ModalDeleteResource";

type TResource = {
  key: string;
  resourceName: string;
  resourceAmount?: number;
  resourceAvailable?: number;
};

const HospitalResourceIndex: NextPage = () => {
  // state part
  const [resource, setResource] = useState<TResource>({
    key: '0',
    resourceName: 'Loading...'
  })
  const dispatch = useDispatch();

  // delete modal handler
  const showDeleteResourceModal = (resource:TResource) => {
    setResource(resource);
    dispatch(storeShowResourceDeleteModal());
  }

  // Dummy Hospital data
  const columns = [
    {
      title: "Resource",
      dataIndex: "resourceName",
      key: "resourceName",
    },
    {
      title: "Maximum",
      dataIndex: "resourceAmount",
      key: "resourceAmount",
    },
    {
      title: "Available",
      dataIndex: "resourceAvailable",
      key: "resourceAvailable",
    },
    {
      title: "Status",
      key: "status",
      render: (record: TResource) => (
        <Status available={record.resourceAvailable} amount={record.resourceAmount} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TResource) => (
        <div>
          <Tooltip title="View">
            <a className="hover:tw-text-green-500" href="#">
              <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Edit">
            <a className="hover:tw-text-yellow-500" href="#">
              <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Remove">
            <a className="hover:tw-text-red-500" onClick={() => {showDeleteResourceModal(record)}}>
              <DeleteOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Dummy data (api here)
  const data = [
    {
      key: "1",
      resourceName: "bed",
      resourceAmount: 32,
      resourceAvailable: 32,
    },
    {
      key: "2",
      resourceName: "Respirator",
      resourceAmount: 32,
      resourceAvailable: 32,
    },
  ];

  return (
    <LayoutHospital
      title="Capybara Hospital : Resource list"
      button={
        <Button
          className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto"
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
        
        <ModalDelete id={resource.key} resourceName={resource.resourceName} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
