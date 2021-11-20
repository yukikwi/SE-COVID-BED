import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import { Table, Button, notification } from "antd";
import Status from "../../../components/Hospital/Status";
import { showResourceDeleteModal as storeShowResourceDeleteModal } from "../../../store/deleteModal/actions";
import { showResourceModal as storeShowResourceModal } from "../../../store/addResourceModal/actions";
import { getResourceModalState } from "../../../store/addResourceModal/selectors";
import { getDeleteResourceModalState } from "../../../store/deleteModal/selectors";
import {
  PlusSquareOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../../../store/user/selectors";
import axios from "axios";
import ResourceAction from "../../../components/Hospital/ResourceAction";
import { TResourceUI } from "../../../class/data_struct/resource";
import dynamic from "next/dynamic";
const ModalDelete = dynamic(import("../../../components/Hospital/ModalDeleteResource"));
const ModalAddResource = dynamic(import("../../../components/Hospital/ModalAddEditResource"));

const HospitalResourceIndex: NextPage = () => {
  // state and redux part
  const [resource, setResource] = useState<TResourceUI | undefined>({
    _id: "",
    key: "0",
    resourceName: "Loading...",
  });
  const [isView, setIsView] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<TResourceUI>>();
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);
  const deleteResourceModalState = useSelector(getDeleteResourceModalState);
  const addEditResourceModalState = useSelector(getResourceModalState);

  // event handler
  // delete modal handler
  const showDeleteResourceModal = (resource: TResourceUI) => {
    setResource(resource);
    dispatch(storeShowResourceDeleteModal());
  };

  const showAddEditResourceModal = (
    resource: TResourceUI | undefined = undefined,
    isView: boolean = false
  ) => {
    setResource(resource);
    setIsView(isView);
    dispatch(storeShowResourceModal());
  };

  // Table Column template
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
      render: (record: TResourceUI) => (
        <Status available={record.available} amount={record.maximum} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TResourceUI) => (
        <ResourceAction
          record={record}
          showAddEditResourceModal={(record:TResourceUI, isEdit: boolean) => {showAddEditResourceModal(record, isEdit)}}
          showDeleteResourceModal={(record:TResourceUI) => {showDeleteResourceModal(record)}}
        />
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

      let rawResourceData: Array<TResourceUI> = apiResonse.data.map(
        (x: TResourceUI, i: Number) => ({ ...x, key: i })
      );
      setTableData(rawResourceData);
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
          id={resource ? resource._id : ""}
          resourceName={resource ? resource.resourceName : ""}
        />
        <ModalAddResource isView={isView} resource={resource} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
