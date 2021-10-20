import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import ApproveModal from "../../../components/Hospital/Approve"
import { Table, Button, Tooltip } from "antd";
import Status from "../../../components/Hospital/Status";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showApproveModal as storeShowApproveModal } from "../../../store/approveModal/actions";
import { showPatientModal } from "../../../store/addPatientModal/actions";
import ModalAddPatient from "../../../components/Hospital/ModalAddEditPatient";

type TPatient = {
  key: string;
  patientName: string;
  patientSeverity: 'Red' | 'Yellow' | 'Green'
  patientStatus: 'Request' | 'In progress' | 'Complete'
};

const HospitalResourceIndex: NextPage = () => {
  // cast state and method
  const [tableData, settableData] = useState<Array<any>>()
  const [approvePatient, setApprovePatient] = useState<TPatient>()
  const dispatch = useDispatch()

  // Approve Modal handler
  const showApproveModal = (patient:TPatient) => {
    console.log('Display')
    setApprovePatient(patient)
    dispatch(storeShowApproveModal());
  }

  // Add Modal handler
  const showAddModal = () => {
    dispatch(showPatientModal());
  }

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
          <Tooltip title="Approve">
            <a className="hover:tw-text-green-500" onClick={() => {showApproveModal(record)}}>
              <CheckCircleOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>
          
          <Tooltip title="View">
            <a className="hover:tw-text-yellow-500" href="#">
              <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Edit">
            <a className="hover:tw-text-blue-500" href="#">
              <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

        </div>
      ),
    },
  ];

  const data = [
    {
      key: '_id1234',
      patientName: 'Mr.Capybara',
      patientSeverity: 'Red',
      patientStatus: 'Request'
    },
    {
      key: '_id5678',
      patientName: 'Mr.Reaw Wong',
      patientSeverity: 'Yellow',
      patientStatus: 'Request'
    }
  ];

  useEffect(() => {
    // For Api use this to set table data
    settableData(data)
  }, [])

  return (
    <LayoutHospital
      title="Capybara Hospital : Patient list"
      button={
        <Button
          className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-float-right tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-auto"
          type="primary"
          shape="round"
          icon={<PlusSquareOutlined />}
          size="large"
          onClick={() => {showAddModal()}}
        >
          add patient
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

        <ModalAddPatient />
        <ApproveModal patient={approvePatient}/>
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
