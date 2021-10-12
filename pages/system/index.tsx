import type { NextPage } from 'next'
import LayoutHospital from '../../components/Layout/Hospital'
import { Table, Button } from 'antd';
import Status from '../../components/System/Status'
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'

type TResource = {
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
      key: 'hospital'
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
          <a className="hover:tw-text-green-500" href="#"><EyeOutlined className="tw-font-base tw-mr-3" /></a>
          <a className="hover:tw-text-yellow-500" href="#"><EditOutlined className="tw-font-base tw-mr-3" /></a>
          <a className="hover:tw-text-red-500" href="#"><DeleteOutlined className="tw-font-base tw-mr-3" /></a>
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
        key: '2',
        hospital: 'KIKK Hospital',
        convince: 'MARS',
        staff: 'Dr.SINOVAC',
        amount: 1000,
        avaliable: 22,
        isClose: true
    }
  ];

  return (
    <LayoutHospital
        title="Hospital List"
        button={
            <Button className="tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto" type="primary" shape="round" icon={<PlusSquareOutlined />} size="large">add hospital</Button>
        }
    >
      <div className="tw-overflow-x-scroll">
        <Table columns={columns} dataSource={data} />
      </div>
    </LayoutHospital>
  )
}

export default HospitalResourceIndex
