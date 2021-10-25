import React, { ReactElement, useEffect, useState } from 'react'
import { Modal, notification } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getDeleteResourceModalState } from "../../store/deleteModal/selectors";
import { hideHospitalDeleteModal } from '../../store/deleteModal/actions';

interface Props {
  id: string;
  resourceName: string;
}

function ModalDelete(props: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const showResourceDeleteModal = useSelector(getDeleteResourceModalState);
  const { id, resourceName } = props;

  //
  const notifyError = () => {
    notification.open({
      message: 'Error',
      description: 'Cannot connect to api. Please contact admin for more information.'
    });
  }

  // Delete method
  const deleteResource = async () => {
    // api here
  }

  return (
    <Modal
      title={`Delete Resource (${resourceName})`}
      visible={showResourceDeleteModal}
      onOk={() => deleteResource()}
      onCancel={() => dispatch(hideHospitalDeleteModal())}
      okText="Confirm"
      centered
    >
      <p>
        click "Confirm" if you’re sure that you want to remove
        <span className="tw-font-bold"> {resourceName} </span>
        , if not click cancel
      </p>
    </Modal>
  );
}

export default ModalDelete;
