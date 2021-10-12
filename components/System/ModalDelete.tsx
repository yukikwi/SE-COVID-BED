import React, { ReactElement } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { getDeleteModalState } from "../../store/deleteModal/selectors";
import { hideModal } from '../../store/deleteModal/actions';

interface Props {

}

function ModalDelete({}: Props): ReactElement {

  // redux part
  const dispatch = useDispatch();
  const showDeleteModal = useSelector(getDeleteModalState);

  return (
    <Modal title="Basic Modal" visible={showDeleteModal} onCancel={() => dispatch(hideModal())} centered>
      <p>click "Confirm" if you’re sure that you want to remove this hospital, if not click cancel</p>
    </Modal>
  )
}

export default ModalDelete
