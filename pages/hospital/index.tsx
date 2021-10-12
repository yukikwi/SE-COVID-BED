import type { NextPage } from 'next'
import HospitalNavbar from '../../components/Hospital/Navbar'
import { Button, List, Switch } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'

const HospitalIndex: NextPage = () => {
  const data = [
    {
      type: 'string',
      title: 'Hospital Name',
      data: 'Capybara Hospital'
    },
    {
      type: 'string',
      title: 'Hospital address',
      data: 'BaraLand'
    },
    {
      type: 'string',
      title: 'Staff Name',
      data: 'Dr.DIO'
    },
    {
      type: 'switch',
      title: 'Status',
      data: ''
    }
  ];

  return (
    <div>
      <HospitalNavbar />
      <div className="tw-mx-10 tw-my-5 tw-grid tw-grid-cols-2">
        <div>
          <h1 className="tw-text-charcoal tw-text-3xl tw-font-bold">Capybara Hospital : Information</h1>
        </div>
        <div>
          <Button className="tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto" type="primary" shape="round" icon={<PlusSquareOutlined />} size="large">add resource</Button>
        </div>

        <div className="tw-bg-white tw-p-5 tw-mt-5 tw-col-span-2 tw-rounded-lg">
          <List
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <span>
                  <label className="tw-font-bold">{item.title}: </label>
                  {
                    item.type === 'switch'?
                    <Switch checkedChildren="เปิด" unCheckedChildren="ปิด" defaultChecked /> : item.data
                  }
                </span>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default HospitalIndex
