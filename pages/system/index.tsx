import type { NextPage } from "next";
import axios from "axios";
import LayoutHospital from "../../components/Layout/Hospital";
import ModalDelete from "../../components/System/ModalDelete";
import ModalAddEdit from "../../components/System/ModalAddEdit";
import { Table, Button, notification, Tooltip } from "antd";
import {PlusSquareOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { showAddOrEditModal } from "../../store/addOrEditHospitalModal/actions";
import { IHospital } from "../../class/data_struct/hospital";
import { useEffect, useState } from "react";
import { getDeleteModalState } from "../../store/deleteModal/selectors";
import { getAddOrEditModalState } from "../../store/addOrEditHospitalModal/selectors";
import TableAction from "../../components/System/TableAction";

export type TUiHospital = {
  key: string;
  hospital: string;
  convince: string;
  staff: string;
  isAvailable: boolean;
};

type selectHospitalType = {
  key: string;
  hospital: string;
};

const HospitalResourceIndex: NextPage = () => {
  //state & redux part
  const [selectedHospital, setSelectedHospital] = useState<selectHospitalType>({
    key: "",
    hospital: "",
  });
  const [data, setData] = useState<Array<TUiHospital>>();
  const deleteModalState = useSelector(getDeleteModalState);
  const addEditModalState = useSelector(getAddOrEditModalState);
  const dispatch = useDispatch();

  // refresh when deleteModalState or addEditModalState change
  useEffect(() => {
    getHospitalsData();
  }, [deleteModalState, addEditModalState]);

  // Method: Fetch data from api
  const getHospitalsData = async () => {
    try {
      let apiResonse = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API}/hospital`
      );
      let rawHospitalData: Array<IHospital> = apiResonse.data;

      const hospitalData: TUiHospital[] = rawHospitalData.map(
        (hospital: IHospital) => ({
          key: hospital._id,
          hospital: hospital.hospitalName,
          convince: hospital.hospitalConvince,
          staff: (hospital.staff && typeof hospital.staff.username === "string") ?
            hospital.staff.username
            :
            "not specific",
          isAvailable: hospital.isAvailable,
        })
      );
      
      // set data
      setData(hospitalData);
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  // Column template
  const columns = [
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
      sorter: {
        compare: (a: TUiHospital, b: TUiHospital) => a.hospital.localeCompare(b.hospital)
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
      title: "Action",
      key: "action",
      render: (record: TUiHospital) => (
        <TableAction record={record} setSelectedHospital={(data:selectHospitalType) => { setSelectedHospital(data)}} />
      ),
    },
  ];

  // add hospital button ui
  const addHospitalBtn = 
  <Button
    className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto"
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

  return (
    <LayoutHospital
      title="Hospital List"
      button={
        addHospitalBtn
      }
    >
      <div>
        <ModalDelete
          id={selectedHospital?.key as string}
          hospital={selectedHospital?.hospital as string}
        />
        <ModalAddEdit
          id={selectedHospital?.key as string}
        />
        <div className="tw-overflow-x-scroll">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;