import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import { Table, Button } from "antd";
import Status from "../../../components/Hospital/Status";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

type TPatient = {
  key: string;
  patientSeverity: 'Red' | 'Yellow' | 'Green'
  patientStatus: 'Request' | 'In progress' | 'Complete'
};

const HospitalResourceIndex: NextPage = () => {
  // Dummy Hospital data
  const columns = [
    {
      title: "Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Severity level",
      key: "patientSeverity",
      render: (record: TPatient) => (
        <Status type="severity" patientSeverity={record.patientSeverity} />
      ),
    },
    {
      title: "Status",
      key: "patientStatus",
      render: (record: TPatient) => (
        <Status type="patient" status={record.patientStatus} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TPatient) => (
        <div>
          <a className="hover:tw-text-green-500" href="#">
            <CheckCircleOutlined className="tw-font-base tw-text-lg tw-mr-3" />
          </a>
          <a className="hover:tw-text-yellow-500" href="#">
            <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
          </a>
          <a className="hover:tw-text-blue-500" href="#">
            <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
          </a>
        </div>
      ),
    },
  ];

  const data = [
    {
      patientName: 'Mr.Capybara',
      patientSeverity: 'Red',
      patientStatus: 'Request'
    },
    {
      patientName: 'Mr.Reaw Wong',
      patientSeverity: 'Yellow',
      patientStatus: 'Request'
    }
  ];

  const [tableData, settableData] = useState<Array<any>>()

  useEffect(() => {
    // For Api use this to set table data
    settableData(data)
  }, [])

  return (
    <LayoutHospital
      title="Capybara Hospital : Patient list"
      button={
        <Button
          className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto"
          type="primary"
          shape="round"
          icon={<PlusSquareOutlined />}
          size="large"
        >
          add resource
        </Button>
      }
    >
      <div className="tw-overflow-x-scroll">
        <div className="tw-flex tw-flex-row tw-mb-3">
          <Button
            className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-items-center tw-justify-center tw-h-auto tw-mr-3"
            type="primary"
            shape="round"
            size="large"
            disabled
          >
            Request
          </Button>
          <Button
            className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-items-center tw-justify-center tw-h-auto tw-mr-3"
            type="primary"
            shape="round"
            size="large"
          >
            In progess
          </Button>
          <Button
            className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-items-center tw-justify-center tw-h-auto"
            type="primary"
            shape="round"
            size="large"
          >
            Complete
          </Button>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
