import React, { ReactElement } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteModalState } from "../../store/deleteModal/selectors";
import { hideDeleteModal } from "../../store/deleteModal/actions";

interface Props {
  hospital: string;
}

function ModalDelete(props: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const showDeleteModal = useSelector(getDeleteModalState);
  const { hospital } = props;

  return (
    <Modal
      title="Delete Hospital"
      visible={showDeleteModal}
      onCancel={() => dispatch(hideDeleteModal())}
      okText="Confirm"
      centered
    >
      <p>{`click "Confirm" if you’re sure that you want to remove ${hospital}, if not click cancel`}</p>
    </Modal>
  );
}

export default ModalDelete;
