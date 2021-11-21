import { Tooltip } from 'antd'
import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux';
import { showPatientModal } from '../../store/addPatientModal/actions';
import { showApproveModal as storeShowApproveModal } from "../../store/approveModal/actions";
import { showDischargeModal as storeShowDischargeModal } from "../../store/dischargeModal/actions";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";

interface Props {
  record: any,
  setApproveDischargePatient: (patient: any) => void,
  setEditPatient: (patient: any) => void,
  setIsView: (isView: boolean) => void
}

function PatientAction(props: Props): ReactElement {
  // state and redux part
  const dispatch = useDispatch()
  const { setApproveDischargePatient, setEditPatient, setIsView, record } = props
  
  // Approve Modal handler
  const showApproveModal = (patient: any) => {
    setApproveDischargePatient(patient);
    dispatch(storeShowApproveModal());
  };
  // Discharge Modal handler
  const showDischargeModal = (patient: any) => {
    setApproveDischargePatient(patient);
    dispatch(storeShowDischargeModal());
  };
  
  // Add-Edit Modal handler
  const showAddEditModal = (
    patient: any | undefined = undefined,
    isView: boolean = false
  ) => {
    setEditPatient(patient);
    setIsView(isView);
    dispatch(showPatientModal());
  };

  // Approve action part
  const Approve = (record:any) => {
    if(record.patientStatus === 'Request'){
      return (
        <React.Fragment>
          <Tooltip title="Approve">
            <a
              id={`patient-${record._id}-approve`}
              className="hover:tw-text-green-500"
              onClick={() => {showApproveModal(record)}}
            >
              <CheckCircleOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>
          <Tooltip title="Discharge">
            <a
              id={`patient-${record._id}-discharge`}
              className="hover:tw-text-red-500"
              onClick={() => {showDischargeModal(record)}}
            >
              <CloseCircleOutlined className="tw-font-base tw-text-lg tw-mr-3" />
            </a>
          </Tooltip>
        </React.Fragment>
      )
    }
  }


  return (
    <div>
      { Approve(record) }
      
      <Tooltip title="View">
        <a
          id={`patient-${record._id}-view`}
          className="hover:tw-text-yellow-500"
          onClick={() => {
            showAddEditModal(record, true);
          }}
        >
          <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>
      { record.patientStatus !== 'Request'?
        <Tooltip title="Edit">
          <a
            id={`patient-${record._id}-edit`}
            className="hover:tw-text-blue-500"
            onClick={() => {
              showAddEditModal(record);
            }}
          >
            <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
          </a>
        </Tooltip>
        :
        <></>
      }
      
    </div>
  )
}

export default PatientAction;