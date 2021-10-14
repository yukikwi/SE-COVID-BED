import type { NextPage } from 'next'
import axios, { AxiosError } from 'axios'
import LayoutHospital from '../../components/Layout/Hospital'
import ModalDelete from '../../components/System/ModalDelete'
import ModalAddEdit from '../../components/System/ModalAddEdit'
import { Table, Button, notification } from 'antd';
import Status from '../../components/System/Status'
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { showDeleteModal } from "../../store/deleteModal/actions";
import { showAddOrEditModal } from "../../store/addOrEditModal/actions";
import { IHospital } from '../../class/data_struct/hospital'
import { useEffect, useState } from 'react'
import { getDeleteModalState } from '../../store/deleteModal/selectors'

type TUiHospital = {
  key: string,
  _id: string,
  hospital: string,
  convince: string,
  staff: string,
  avaliable: number,
  amount: number,
  isClose: boolean
}

const HospitalResourceIndex: NextPage = () => {
  const [selectedHospital, setSelectedHospital] = useState("");
  // Dummy Hospital data
  const columns = [
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
      sorter: {
        compare: (a: TUiHospital, b: TUiHospital) =>
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
      title: 'Status',
      key: 'status',
      render: (record:TUiHospital) => (
        <Status isClose={record.isClose} avaliable={record.avaliable} amount={record.amount} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (record:TUiHospital) => (
        <div>
          <a className="hover:tw-text-green-500"><EyeOutlined className="tw-font-base tw-mr-3" /></a>
          <a className="hover:tw-text-yellow-500" onClick={() => { dispatch(showAddOrEditModal('Edit')) }}><EditOutlined className="tw-font-base tw-mr-3" /></a>
          <a className="hover:tw-text-red-500" onClick={() => { dispatch(showDeleteModal(record._id)) }}><DeleteOutlined className="tw-font-base tw-mr-3" /></a>
        </div>
      ),
    },
  ];

  // Fetch data from api
  const [data, setData] = useState<Array<TUiHospital>>()
  const getHospitalsData = async () => {
    let hospitalData:Array<TUiHospital> = []
    try{
      let apiResonse = await axios.get(`${process.env.NEXT_PUBLIC_APP_API}/hospital`)
      let rawHospitalData:Array<IHospital> = apiResonse.data
      for (let i = 0; i < rawHospitalData.length; i++){
        hospitalData.push({
          key: i.toString(),
          _id: rawHospitalData[i]._id,
          hospital: rawHospitalData[i].hospitalName,
          convince: rawHospitalData[i].hospitalConvince,
          staff: 'Dr.Dio',
          amount: 32,
          avaliable: 32,
          isClose: rawHospitalData[i].isAvaliable
        })
      }
      setData(hospitalData)
    }
    catch (error: any | AxiosError) {
      console.log(error.response.status)
      notification.open({
        message: 'Error',
        description: 'Cannot connect to api. Please contact admin for more information.'
      });
    }
  }

  // Redux part
  const deleteModalState = useSelector(getDeleteModalState);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getHospitalsData()
  },[deleteModalState])

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
        <ModalDelete />
        <ModalAddEdit />
        <div className="tw-overflow-x-scroll">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
