import { Modal, notification } from "antd";
import axios from "axios";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideApproveModal } from "../../store/approveModal/actions";
import { getApproveModalState } from "../../store/approveModal/selectors";

interface Props {
  patient: any;
}

Approve.defaultProps = {
  patient: {},
};

function Approve(props: Props): ReactElement {
  const { patient } = props;
  const showApproveModal = useSelector(getApproveModalState);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideApproveModal());
  };

  const handleApprove = async () => {
    // Api for approve here
    const id = patient._id;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/patient/approve-patient`,
        {
          id,
        }
      );

      notification.open({
        message: "Success",
        description: "Connect to api successful.",
      });
      dispatch(hideApproveModal());
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  return (
    <Modal
      title="Approve patient"
      visible={showApproveModal}
      onOk={handleApprove}
      okText="Confirm"
      onCancel={handleCancel}
    >
      <p>
        click “Confirm” if you’re sure that you want to approve patient named &nbsp;
        <span className="tw-font-bold">{patient.patientName}</span>, if not
        click cancel.
      </p>
    </Modal>
  );
}

export default Approve;
