import React, { ReactElement, useEffect, useState } from 'react'
import { Modal, notification } from 'antd'
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getaddOrEditModalState } from "../../store/addOrEditModal/selectors";
import { hideAddOrEditModal } from '../../store/addOrEditModal/actions';
import AddEditForm from './ModalHospitalForm/AddEdit';
import { IHospital } from "../../class/data_struct/hospital";

export type TUiHospital = {
  key: string;
  hospital: string;
  convince: string;
  staff: string;
  avaliable: number;
  amount: number;
  isClose: boolean;
};

interface Props {
  id: string;
  hospital: string;
}

function ModalAddEdit(props: Props): ReactElement {


  // redux part
  const dispatch = useDispatch();
  const {show, addOrEdit} = useSelector(getaddOrEditModalState);
  const { id, hospital } = props;

  const [hospitalData, setHospitalData] = useState<TUiHospital>()

  useEffect(() => {
    initHospitalData();
  }, [id]);

  const initHospitalData = async () => {
    try{ 
      let apiResonse = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API}/hospital/${id}`
      );

      console.log("apiResonse", apiResonse);
      
      const rawHospitalData: IHospital = apiResonse.data;

      const tempHospital: TUiHospital = {
        key: rawHospitalData._id,
        hospital: rawHospitalData.hospitalName,
        convince: rawHospitalData.hospitalConvince,
        staff: "Dr.Dio",
        amount: 32,
        avaliable: 32,
        isClose: rawHospitalData.isDelete,
      }
      console.log("tempHospital", tempHospital);
      setHospitalData(tempHospital);

    } catch (err) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  }

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
