import type { NextPage } from 'next'
import LayoutHospital from '../../../components/Layout/Hospital'
import { Table, Button } from 'antd';
import Status from '../../../components/Hospital/Status'
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'

type TResource = {
  key: string,
  resource: string,
  amount: number,
  avaliable: number
}

const HospitalResourceIndex: NextPage = () => {
  // Dummy Hospital data
  const columns = [
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource'
    },
    {
      title: 'Maximum',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Avaliable',
      dataIndex: 'avaliable',
      key: 'avaliable',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record:TResource) => (
        <Status avaliable={record.avaliable} amount={record.amount} />
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
      resource: 'bed',
      amount: 32,
      avaliable: 32
    },
    {
      key: '2',
      resource: 'Respirator',
      amount: 32,
      avaliable: 32
    }
  ];

  return (
    <LayoutHospital
      title="Capybara Hospital : Resource list"
      button={
        <Button className="tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto tw-w-full md:tw-w-auto" type="primary" shape="round" icon={<PlusSquareOutlined />} size="large">add resource</Button>
      }
    >
      <div className="tw-overflow-x-scroll">
        <Table columns={columns} dataSource={data} />
      </div>
    </LayoutHospital>
  )
}

export default HospitalResourceIndex
