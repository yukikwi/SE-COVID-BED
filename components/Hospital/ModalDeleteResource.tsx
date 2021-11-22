import React, { ReactElement, useEffect, useState } from 'react'
import { Modal, notification } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getDeleteResourceModalState } from "../../store/deleteModal/selectors";
import { hideHospitalDeleteModal } from '../../store/deleteModal/actions';
import axios, { AxiosError } from 'axios';

interface Props {
  id: string;
  resourceName: string;
}

function ModalDelete(props: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const showResourceDeleteModal = useSelector(getDeleteResourceModalState);
  const { id, resourceName } = props;

  // Delete method
  const deleteResource = async () => {
    try{
      await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/resource/delete-resource`,{
        id
      })
      
      notification.open({
        message: "Success",
        description: "Delete resource successful.",
      });
      dispatch(hideHospitalDeleteModal())
    }
    catch(error: any | AxiosError){
      notification.open({
        message: 'Error',
        description: 'Cannot connect to api. Please contact admin for more information.'
      });
    }
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
        click &quot;Confirm&quot; if you’re sure that you want to remove
        <span className="tw-font-bold"> {resourceName} </span>
        , if not click cancel
      </p>
    </Modal>
  );
}

export default ModalDelete;
