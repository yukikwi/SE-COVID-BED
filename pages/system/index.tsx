import type { NextPage } from 'next'
import LayoutHospital from '../../components/Layout/Hospital'
import ModalDelete from '../../components/System/ModalDelete'
import ModalAddEdit from '../../components/System/ModalAddEdit'
import { Table, Button } from 'antd';
import Status from '../../components/System/Status'
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { showDeleteModal } from "../../store/deleteModal/actions";
import { showAddOrEditModal } from "../../store/addOrEditModal/actions";

type TResource = {
  hospital: string,
  avaliable: number,
  amount: number,
  isClose: boolean
}

const HospitalResourceIndex: NextPage = () => {
  // Dummy Hospital data
  const columns = [
    {
      title: 'Hospital',
      dataIndex: 'hospital',
      key: 'hospital',
      sorter: {
        compare: (a:TResource,b:TResource) => a.hospital.localeCompare(b.hospital)
      }
    },
    {
      title: 'Convince',
      dataIndex: 'convince',
      key: 'convince',
    },
    {
      title: 'Staff',
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: 'Avaliable beds',
      dataIndex: 'avaliable',
      key: 'avaliable',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record:TResource) => (
        <Status isClose={record.isClose} avaliable={record.avaliable} amount={record.amount} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (record:TResource) => (
        <div>
          <a className="hover:tw-text-green-500" onClick={() => { dispatch(showAddOrEditModal('Add')) }}><EyeOutlined className="tw-font-base tw-mr-3" /></a>
          <a className="hover:tw-text-yellow-500" onClick={() => { dispatch(showAddOrEditModal('Edit')) }}><EditOutlined className="tw-font-base tw-mr-3" /></a>
          <a className="hover:tw-text-red-500" onClick={() => { dispatch(showDeleteModal()) }}><DeleteOutlined className="tw-font-base tw-mr-3" /></a>
        </div>
      )
    }
  ];

  const data = [
    {
      key: '1',
      hospital: 'Capybara Hospital',
      convince: 'Bangkok',
      staff: 'Dr.Dio',
      amount: 32,
      avaliable: 32,
      isClose: false
    },
    {
      key: '2',
      hospital: 'KIKK Hospital',
      convince: 'MARS',
      staff: 'Dr.SINOVAC',
      amount: 1000,
      avaliable: 22,
      isClose: false
    },
    {
      key: '3',
      hospital: 'KIKK Hospital',
      convince: 'MARS',
      staff: 'Dr.SINOVAC',
      amount: 1000,
      avaliable: 22,
      isClose: true
    }
  ];

  // Redux part
	const dispatch = useDispatch();

  return (
    <LayoutHospital
      title="Hospital List"
      button={
        <Button className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto" type="primary" shape="round" icon={<PlusSquareOutlined />} size="large">add hospital</Button>
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
  )
}

export default HospitalResourceIndex
