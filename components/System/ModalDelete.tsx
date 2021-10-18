import React, { ReactElement, useEffect, useState } from 'react'
import { Modal, notification } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getDeleteModalState } from "../../store/deleteModal/selectors";
import { hideDeleteModal } from '../../store/deleteModal/actions';
import axios, { AxiosError } from 'axios';
import { IHospital } from '../../class/data_struct/hospital';

interface Props {
  id: string;
  hospital: string;
}

function ModalDelete(props: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const showDeleteModal = useSelector(getDeleteModalState);
  const { id, hospital } = props;

  //
  const notifyError = () => {
    notification.open({
      message: 'Error',
      description: 'Cannot connect to api. Please contact admin for more information.'
    });
  }

  // Delete method
  const deleteHospital = async () => {
    try{
      let apiResonse = await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/delete-hospital`,{
        id
      })
      console.log(apiResonse.data)
      dispatch(hideDeleteModal())
    }
    catch(error: any | AxiosError){
      notifyError()
    }
  }

  return (
    <Modal
      title={`Delete Hospital (${hospital})`}
      visible={showDeleteModal}
      onOk={() => deleteHospital()}
      onCancel={() => dispatch(hideDeleteModal())}
      okText="Confirm"
      centered
    >
      <p>
        click "Confirm" if you’re sure that you want to remove
        <span className="tw-font-bold"> {hospital} </span>
        , if not click cancel
      </p>
    </Modal>
  );
}

export default ModalDelete;
