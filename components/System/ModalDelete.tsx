import React, { ReactElement, useEffect, useState } from 'react'
import { Modal, notification } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getDeleteModalState, getDeleteModalHospitalId } from "../../store/deleteModal/selectors";
import { hideDeleteModal } from '../../store/deleteModal/actions';
import axios, { AxiosError } from 'axios';
import { IHospital } from '../../class/data_struct/hospital';

interface Props {
  
}

function ModalDelete({}: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const showDeleteModal = useSelector(getDeleteModalState);
  const hospitalId = useSelector(getDeleteModalHospitalId);

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
      let apiResonse = await axios.post('http://localhost:3000/api/delete-hospital',{
        id: hospitalId
      })
      console.log(apiResonse.data)
      dispatch(hideDeleteModal())
    }
    catch(error: any | AxiosError){
      notifyError()
    }
  }

  // Fetch data from api
  const [hospitalName, setHospitalName] = useState('')

  const getHospitalData = async () => {
    try{
      // check init or user action
      console.log(hospitalId)
      if(hospitalId !== 'unknow'){
        let apiResonse = await axios.get('http://localhost:3000/api/hospital/'+hospitalId)
        let hospitalData:IHospital = apiResonse.data
        setHospitalName(hospitalData.hospitalName)
      }
      else{
        setHospitalName('Loading...')
      }
    }
    catch (error: any | AxiosError) {
      notifyError()
    }
  }
  
  // load Data on init
  useEffect(() => {
    getHospitalData()
  },[hospitalId])

  return (
    <Modal
      title={`Delete Hospital (${hospitalName})`}
      visible={showDeleteModal}
      onOk={() => deleteHospital()}
      onCancel={() => dispatch(hideDeleteModal())}
      okText="Confirm"
      centered
    >
      <p>{`click "Confirm" if you’re sure that you want to remove ${hospitalName}, if not click cancel`}</p>
    </Modal>
  );
}

export default ModalDelete;
