import type { NextPage } from "next";
import LayoutHospital from "../../../components/Layout/Hospital";
import ApproveModal from "../../../components/Hospital/ModalApprove"
import DischargeModal from "../../../components/Hospital/ModalDischarge"
import { Table, Button, notification } from "antd";
import Status from "../../../components/Hospital/Status";
import {
  PlusSquareOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPatientModal } from "../../../store/addPatientModal/actions";
import ModalAddEditPatient from "../../../components/Hospital/ModalAddEditPatient";
import { IPatient } from "../../../class/data_struct/patient";
import axios from "axios";
import { getUserState } from "../../../store/user/selectors";
import { getPatientModalState } from "../../../store/addPatientModal/selectors";
import { getApproveModalState } from "../../../store/approveModal/selectors";
import PatientAction from "../../../components/Hospital/PatientAction"

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
  const [tableData, setTableData] = useState<Array<any>>();
  const [approveDischargePatient, setApproveDischargePatient] = useState<TPatient>();
  const [editPatient, setEditPatient] = useState<TPatient>();
  const [isView, setIsView] = useState<boolean>();
  const [selectTab, setSelectTab] = useState<
    "Request" | "In progress" | "Complete"
  >("Request");
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);
  const addEditPatientModalState = useSelector(getPatientModalState);
  const approveModalState = useSelector(getApproveModalState);

  // Add Modal handler
  const showAddEditModal = (
    patient: TPatient | undefined = undefined,
    isView: boolean = false
  ) => {
    setEditPatient(patient);
    setIsView(isView);
    dispatch(showPatientModal());
  };

  // Column component
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
        <PatientAction
          record={record}
          setApproveDischargePatient={(patient: TPatient) => {setApproveDischargePatient(patient)}}
          setEditPatient={(patient: TPatient) => {setEditPatient(patient)}}
          setIsView={(isView: boolean) => {setIsView(isView)}}
        />
      ),
    },
  ];

  // function to connect API
  const fetchApiPatient = async (
    selectTab: "Request" | "In progress" | "Complete"
  ) => {
    // For Api use this to set table data
    const hospitalId = userData.userinfo.hospitalId;
    try {
      let apiResonse: any = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/patient`,
        {
          hospitalId,
        }
      );

      let rawPatientData: Array<IPatient> = apiResonse.data.data.filter(
        (item: TPatient) => {
          return item.patientStatus === selectTab;
        }
      );

      setTableData(rawPatientData);
    } catch (error) {
      
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  useEffect(() => {
    fetchApiPatient(selectTab);
  }, [addEditPatientModalState, approveModalState, selectTab]);

  // ui part
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
            id="tab-request"
            className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-items-center tw-justify-center tw-h-auto tw-mr-3"
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              setSelectTab("Request");
            }}
            disabled={selectTab === "Request"}
          >
            Request
          </Button>
          <Button
            id="tab-in-progress"
            className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-items-center tw-justify-center tw-h-auto tw-mr-3"
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              setSelectTab("In progress");
            }}
            disabled={selectTab === "In progress"}
          >
            In progress
          </Button>
          <Button
            id="tab-complete"
            className="tw-bg-dark-matcha-green tw-border-transparent hover:tw-bg-charcoal hover:tw-border-transparent focus:tw-bg-charcoal focus:tw-border-transparent tw-items-center tw-justify-center tw-h-auto"
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              setSelectTab("Complete");
            }}
            disabled={selectTab === "Complete"}
          >
            Complete
          </Button>
        </div>

        <Table columns={columns} dataSource={tableData} />

        <ModalAddEditPatient patient={editPatient} isView={isView} />
        <ApproveModal patient={approveDischargePatient} />
        <DischargeModal patient={approveDischargePatient} />
      </div>
    </LayoutHospital>
  );
};

export default HospitalResourceIndex;
