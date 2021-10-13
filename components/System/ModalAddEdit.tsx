import React, { ReactElement } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getaddOrEditModalState } from "../../store/addOrEditModal/selectors";
import { hideAddOrEditModal } from '../../store/addOrEditModal/actions';

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
      centered
    >
      <p>click "Confirm" if you’re sure that you want to remove this hospital, if not click cancel</p>
    </Modal>
  )
}

export default ModalAddEdit
