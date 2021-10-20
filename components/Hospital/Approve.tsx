import { Modal } from 'antd'
import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideApproveModal } from '../../store/approveModal/actions';
import { getApproveModalState } from '../../store/approveModal/selectors';

interface Props {
  patient: any
}

Approve.defaultProps = {
  patient: {}
}

function Approve(props: Props): ReactElement {
  const {patient} = props
  const show = useSelector(getApproveModalState);
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(hideApproveModal())
  }

  const handleApprove = () => {
    // Api for approve here
  }

  return (
    <Modal
      title="Approve patient"
      visible={show}
      onOk={handleApprove}
      okText="Confirm"
      onCancel={handleCancel}
    >
      <p>click “Confirm” if you’re sure that you want to approve patient named <span className="tw-font-bold">{patient.patientName}</span>, if not click cancel.</p>
    </Modal>
  )
}

export default Approve
