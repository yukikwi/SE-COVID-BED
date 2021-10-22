import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import ApproveModal from "../../../components/Hospital/Approve";
import { Table, Button, Tooltip, notification } from "antd";
import Status from "../../../components/Hospital/Status";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showApproveModal as storeShowApproveModal } from "../../../store/approveModal/actions";
import { showPatientModal } from "../../../store/addPatientModal/actions";
import ModalAddEditPatient from "../../../components/Hospital/ModalAddEditPatient";
import { IPatient } from "../../../class/data_struct/patient";
import axios from "axios";
import { getUserState } from "../../../store/user/selectors";
import { getApproveModalState } from "../../../store/approveModal/selectors";

type TPatient = {
  key: string;
  patientName: string;
  patientAddress: string;
  patientPhoneNumber: string;
  patientSeverity: "Red" | "Yellow" | "Green";
  patientStatus: "Request" | "In progress" | "Complete";
};

const HospitalResourceIndex: NextPage = () => {
  // cast state and method
  const [tableData, settableData] = useState<Array<any>>();
  const [approvePatient, setApprovePatient] = useState<TPatient>();
  const [editPatient, setEditPatient] = useState<TPatient>();
  const [isView, setIsView] = useState<boolean>();
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);

  // Approve Modal handler
  const showApproveModal = (patient: TPatient) => {
    console.log("Display");
    setApprovePatient(patient);
    dispatch(storeShowApproveModal());
  };

  // Add Modal handler
  const showAddEditModal = (
    patient: TPatient | undefined = undefined,
    isView: boolean = false
  ) => {
    setEditPatient(patient);
    setIsView(isView);
    dispatch(showPatientModal());
  };

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
            <a
              className="hover:tw-text-green-500"
              onClick={() => {
                showApproveModal(record);
              }}
            >
              <CheckCircleOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="View">
            <a
              className="hover:tw-text-yellow-500"
              onClick={() => {
                showAddEditModal(record, true);
              }}
            >
              <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>

          <Tooltip title="Edit">
            <a
              className="hover:tw-text-blue-500"
              onClick={() => {
                showAddEditModal(record);
              }}
            >
              <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Dummy data
  const data = [
    {
      key: "_id1234",
      patientName: "Mr.Capybara",
      patientAddress: "baraland",
      patientPhoneNumber: "123-456-7890",
      patientSeverity: "Red",
      patientStatus: "Request",
    },
    {
      key: "_id5678",
      patientName: "Mr.Reaw Wong",
      patientAddress: "baraland2",
      patientPhoneNumber: "098-765-4321",
      patientSeverity: "Yellow",
      patientStatus: "Request",
    },
  ];

  // function to connect API
  const fetchApiPatient = async () => {
    // For Api use this to set table data
    const hospitalId = userData.userinfo.hospitalId;
    try {
      let apiResonse: any = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/patient`,
        {
          hospitalId,
        }
      );

      let rawPatientData: Array<IPatient> = apiResonse.data.data;

      settableData(rawPatientData);
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  useEffect(() => {
    fetchApiPatient();
  }, []);

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
          onClick={() => {
            showAddEditModal();
          }}
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

        <ModalAddEditPatient patient={editPatient} isView={isView} />
        <ApproveModal patient={approvePatient} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
