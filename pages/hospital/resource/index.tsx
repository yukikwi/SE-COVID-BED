import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import { Table, Button, Tooltip, notification } from "antd";
import Status from "../../../components/Hospital/Status";
import { showResourceDeleteModal as storeShowResourceDeleteModal } from "../../../store/deleteModal/actions";
import { showResourceModal as storeShowResourceModal } from "../../../store/addResourceModal/actions";
import { getResourceModalState } from "../../../store/addResourceModal/selectors";
import { getDeleteResourceModalState } from "../../../store/deleteModal/selectors";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../../../components/Hospital/ModalDeleteResource";
import ModalAddResource from "../../../components/Hospital/ModalAddEditResource";
import { getUserState } from "../../../store/user/selectors";
import { IResource } from "../../../class/data_struct/resource";
import axios from "axios";

type TResource = {
  _id: string;
  key: string;
  resourceName: string;
  resourceCode?: string;
  maximum?: number;
  available?: number;
  remark?: string;
};

const HospitalResourceIndex: NextPage = () => {
  // state part
  const [resource, setResource] = useState<TResource | undefined>({
    _id: "",
    key: "0",
    resourceName: "Loading...",
  });
  const [isView, setIsView] = useState<boolean>();
  const [tableData, setTableData] = useState<Array<TResource>>();
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);
  const deleteResourceModalState = useSelector(getDeleteResourceModalState);
  const addEditResourceModalState = useSelector(getResourceModalState);

  // delete modal handler
  const showDeleteResourceModal = (resource: TResource) => {
    setResource(resource);
    dispatch(storeShowResourceDeleteModal());
  };

  const showAddEditResourceModal = (
    resource: TResource | undefined = undefined,
    isView: boolean = false
  ) => {
    setResource(resource);
    setIsView(isView);
    dispatch(storeShowResourceModal());
  };

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
            <a
              className="hover:tw-text-green-500"
              onClick={() => {
                showAddEditResourceModal(record, true);
              }}
            >
              <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Edit">
            <a
              className="hover:tw-text-yellow-500"
              onClick={() => {
                showAddEditResourceModal(record);
              }}
            >
              <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Remove">
            <a
              className="hover:tw-text-red-500"
              onClick={() => {
                showDeleteResourceModal(record);
              }}
            >
              <DeleteOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  // function to connect API
  const fetchApiResource = async () => {
    // For Api use this to set table data
    const hospitalId = userData.userinfo.hospitalId;
    try {
      let apiResonse: any = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/resource`,
        {
          hospitalId,
        }
      );

      let rawPatientData: Array<TResource> = apiResonse.data.map(
        (x: TResource, i: Number) => ({ ...x, key: i })
      );
      console.log(rawPatientData);

      setTableData(rawPatientData);
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  useEffect(() => {
    fetchApiResource();
  }, [addEditResourceModalState, deleteResourceModalState]);

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
          onClick={() => {
            showAddEditResourceModal();
          }}
        >
          add resource
        </Button>
      }
    >
      <div className="tw-overflow-x-scroll">
        <Table columns={columns} dataSource={tableData} />

        <ModalDelete
          id={resource ? resource.key : ""}
          resourceName={resource ? resource.resourceName : ""}
        />
        <ModalAddResource isView={isView} resource={resource} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
