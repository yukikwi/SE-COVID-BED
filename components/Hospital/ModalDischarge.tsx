import { Modal, notification } from "antd";
import axios from "axios";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDischargeModal } from "../../store/dischargeModal/actions";
import { getDischargeModalState } from "../../store/dischargeModal/selectors";

interface Props {
  patient: any;
}

Discharge.defaultProps = {
  patient: {},
};

function Discharge(props: Props): ReactElement {
  const { patient } = props;
  const showDischargeModal = useSelector(getDischargeModalState);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideDischargeModal());
  };

  const handleDischarge = async () => {
    // Api for discharge here
    const id = patient._id;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/patient/discharge-patient`,
        {
          id,
        }
      );

      notification.open({
        message: "Success",
        description: "Connect to api successful.",
      });
      dispatch(hideDischargeModal());
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
      title="Discharge patient"
      visible={showDischargeModal}
      onOk={handleDischarge}
      okText="Confirm"
      onCancel={handleCancel}
    >
      <p>
        click “Confirm” if you’re sure that you want to discharge patient named &nbsp;
        <span className="tw-font-bold">{patient.patientName}</span>, if not
        click cancel.
      </p>
    </Modal>
  );
}

export default Discharge;
