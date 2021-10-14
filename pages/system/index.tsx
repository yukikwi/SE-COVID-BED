import type { NextPage } from "next";
import axios from "axios";
import LayoutHospital from "../../components/Layout/Hospital";
import ModalDelete from "../../components/System/ModalDelete";
import ModalAddEdit from "../../components/System/ModalAddEdit";
import { Table, Button } from "antd";
import Status from "../../components/System/Status";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showDeleteModal } from "../../store/deleteModal/actions";
import { showAddOrEditModal } from "../../store/addOrEditModal/actions";
import { THospital } from "../../class/data_struct/hospital";
import { useEffect, useState } from "react";

type TResource = {
  hospital: string;
  avaliable: number;
  amount: number;
  isClose: boolean;
};

const HospitalResourceIndex: NextPage = () => {
  const [selectedHospital, setSelectedHospital] = useState("");
  // Dummy Hospital data
  const columns = [
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
      sorter: {
        compare: (a: TResource, b: TResource) =>
          a.hospital.localeCompare(b.hospital),
      },
    },
    {
      title: "Convince",
      dataIndex: "convince",
      key: "convince",
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Avaliable beds",
      dataIndex: "avaliable",
      key: "avaliable",
    },
    {
      title: "Status",
      key: "status",
      render: (record: TResource) => (
        <Status
          isClose={record.isClose}
          avaliable={record.avaliable}
          amount={record.amount}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TResource) => (
        <div>
          <a className="hover:tw-text-green-500">
            <EyeOutlined className="tw-font-base tw-mr-3" />
          </a>
          <a
            className="hover:tw-text-yellow-500"
            onClick={() => {
              dispatch(showAddOrEditModal("Edit"));
            }}
          >
            <EditOutlined className="tw-font-base tw-mr-3" />
          </a>
          <a
            className="hover:tw-text-red-500"
            onClick={() => {
              setSelectedHospital(record.hospital);
              dispatch(showDeleteModal());
            }}
          >
            <DeleteOutlined className="tw-font-base tw-mr-3" />
          </a>
        </div>
      ),
    },
  ];

  // Fetch data from api
  const [data, setData] = useState([{}]);
  const getHospitalData = async () => {
    let hospitalData = [];
    let apiResonse = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API}/hospital`
    );
    let rawHospitalData: Array<THospital> = apiResonse.data;
    for (let i = 0; i < rawHospitalData.length; i++) {
      hospitalData.push({
        key: i.toString(),
        hospital: rawHospitalData[i].hospitalName,
        convince: rawHospitalData[i].hospitalConvince,
        staff: "Dr.Dio",
        amount: 32,
        avaliable: 32,
        isClose: rawHospitalData[i].isAvaliable,
      });
    }
    setData(hospitalData);
  };
  useEffect(() => {
    getHospitalData();
  }, []);

  // Redux part
  const dispatch = useDispatch();

  return (
    <LayoutHospital
      title="Hospital List"
      button={
        <Button
          className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto"
          type="primary"
          shape="round"
          icon={<PlusSquareOutlined />}
          size="large"
          onClick={() => {
            dispatch(showAddOrEditModal("Add"));
          }}
        >
          add hospital
        </Button>
      }
    >
      <div>
        <ModalDelete hospital={selectedHospital} />
        <ModalAddEdit />
        <div className="tw-overflow-x-scroll">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
