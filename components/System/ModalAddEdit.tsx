import React, { ReactElement } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getaddOrEditModalState } from "../../store/addOrEditModal/selectors";
import { hideAddOrEditModal } from '../../store/addOrEditModal/actions';
import AddEditForm from './ModalHospitalForm/AddEdit'

interface Props {

}

function ModalAddEdit({}: Props): ReactElement {


  // redux part
  const dispatch = useDispatch();
  const {show, addOrEdit} = useSelector(getaddOrEditModalState);

  return (
    <Modal
      title={ `${addOrEdit} Hospital Information` }
      visible={show}
      onCancel={() => dispatch(hideAddOrEditModal())}
      okText="Save"
      width = { 1000 }
      centered
    >
      <AddEditForm />
    </Modal>
  )
}

export default ModalAddEdit
