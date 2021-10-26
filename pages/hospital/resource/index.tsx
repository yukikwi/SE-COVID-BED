import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import { Table, Button, Tooltip } from "antd";
import Status from "../../../components/Hospital/Status";
import { showResourceDeleteModal as storeShowResourceDeleteModal } from "../../../store/deleteModal/actions"
import { showResourceModal as storeShowResourceModal } from "../../../store/addResourceModal/actions"
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ModalDelete from "../../../components/Hospital/ModalDeleteResource";
import ModalAddResource from "../../../components/Hospital/ModalAddEditResource";

type TResource = {
  key: string;
  resourceName: string;
  resourceCode?: string;
  maximum?: number;
  available?: number;
  remark?: string
};

const HospitalResourceIndex: NextPage = () => {
  // state part
  const [resource, setResource] = useState<TResource | undefined>({
    key: '0',
    resourceName: 'Loading...'
  })
  const [isView, setIsView] = useState<boolean>();
  const dispatch = useDispatch();

  // delete modal handler
  const showDeleteResourceModal = (resource:TResource) => {
    setResource(resource);
    dispatch(storeShowResourceDeleteModal());
  }

  const showAddEditResourceModal = (resource:TResource | undefined = undefined, isView: boolean = false) => {
    setResource(resource);
    setIsView(isView);
    dispatch(storeShowResourceModal());
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
      dataIndex: "maximum",
      key: "maximum",
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
        <Status available={record.available} amount={record.maximum} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TResource) => (
        <div>
          <Tooltip title="View">
            <a className="hover:tw-text-green-500" onClick={() => {showAddEditResourceModal(record, true)}}>
              <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Edit">
            <a className="hover:tw-text-yellow-500" onClick={() => {showAddEditResourceModal(record)}}>
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
      resourceCode: "BARA-0001",
      maximum: 32,
      available: 32,
      remark: 'BaraBed'
    },
    {
      key: "2",
      resourceName: "Respirator",
      resourceCode: "BARA-0002",
      maximum: 32,
      available: 32,
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
          onClick={() => {showAddEditResourceModal()}}
        >
          add resource
        </Button>
      }
    >
      <div className="tw-overflow-x-scroll">
        <Table columns={columns} dataSource={data} />
        
        <ModalDelete id={resource? resource.key:''} resourceName={resource? resource.resourceName : ''} />
        <ModalAddResource isView={isView} resource={resource} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
