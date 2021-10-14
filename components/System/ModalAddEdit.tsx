import React, { ReactElement, useEffect, useState } from "react";
import { Modal, notification } from "antd";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getaddOrEditModalState } from "../../store/addOrEditModal/selectors";
import { hideAddOrEditModal } from "../../store/addOrEditModal/actions";
import AddEditForm from "./ModalHospitalForm/AddEdit";
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

const initValue = {
  hospitalName: "",
  hospitalPhoneNumber: "",
  hospitalConvince: "",
  hospitalAddress: "",
  hospitalLocation: {},
  isAvaliable: true,
  isDelete: false,
};

interface Props {
  id: string;
  hospital: string;
}

function ModalAddEdit(props: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const { show, addOrEdit } = useSelector(getaddOrEditModalState);
  const { id, hospital } = props;

  const [hospitalData, setHospitalData] = useState<IHospital>();

  useEffect(() => {
    initHospitalData();
  }, [id, addOrEdit]);

  const initHospitalData = async () => {
    if (addOrEdit === "Edit") {
      try {
        let apiResonse = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API}/hospital/${id}`
        );
        const rawHospitalData: IHospital = apiResonse.data;

        setHospitalData(rawHospitalData);
      } catch (err) {
        notification.open({
          message: "Error",
          description:
            "Cannot connect to api. Please contact admin for more information.",
        });
      }
    } else {
      setHospitalData(initValue as IHospital);
    }
  };

  const handleCancel = () => {
    dispatch(hideAddOrEditModal());
    setHospitalData(initValue as IHospital);
  };

  return (
    <Modal
      title={`${addOrEdit} Hospital Information`}
      visible={show}
      onCancel={handleCancel}
      okText="Save"
      width={1000}
      centered
    >
      <AddEditForm hospitalData={hospitalData} mode={addOrEdit} />
    </Modal>
  );
}

export default ModalAddEdit;
