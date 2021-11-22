import React, { ReactElement } from 'react'
import { Modal, notification } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getDeleteModalState } from "../../store/deleteModal/selectors";
import { hideHospitalDeleteModal } from '../../store/deleteModal/actions';
import axios, { AxiosError } from 'axios';

interface Props {
  id: string;
  hospital: string;
}

function ModalDelete(props: Props): ReactElement {
  // state & redux part
  const dispatch = useDispatch();
  const showHospitalDeleteModal = useSelector(getDeleteModalState);
  const { id, hospital } = props;

  // Delete method
  const deleteHospital = async () => {
    try{
      let apiResonse = await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/hospital/delete-hospital`,{
        id
      })
      console.log(apiResonse.data)
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
      title={`Delete Hospital (${hospital})`}
      visible={showHospitalDeleteModal}
      onOk={() => deleteHospital()}
      onCancel={() => dispatch(hideHospitalDeleteModal())}
      okText="Confirm"
      centered
    >
      <p>
        click &quot;Confirm&quot; if you’re sure that you want to remove
        <span className="tw-font-bold"> {hospital} </span>
        , if not click cancel
      </p>
    </Modal>
  );
}

export default ModalDelete;
