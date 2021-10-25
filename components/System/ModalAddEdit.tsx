import React, { ReactElement, useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAddOrEditModalState } from "../../store/addOrEditHospitalModal/selectors";
import { hideAddOrEditModal } from "../../store/addOrEditHospitalModal/actions";
import AddEditForm from "./ModalHospitalForm/AddEdit";
import { IHospital } from "../../class/data_struct/hospital";

export type TUiHospital = {
  key: string;
  hospital: string;
  convince: string;
  staff: string;
  available: number;
  amount: number;
  isClose: boolean;
};

export const initValue = {
  hospitalName: "",
  hospitalPhoneNumber: "",
  hospitalConvince: "",
  hospitalAddress: "",
  hospitalLocation: {},
  isAvailable: true,
  isDelete: false,
};

interface Props {
  id: string;
  hospital: string;
}

function ModalAddEdit(props: Props): ReactElement {
  // redux part
  const dispatch = useDispatch();
  const { show, addOrEdit } = useSelector(getAddOrEditModalState);
  const { id, hospital } = props;

  const [hospitalData, setHospitalData] = useState<IHospital>(
    initValue as IHospital
  );

  useEffect(() => {
    initHospitalData();
  }, [id, addOrEdit]);

  const initHospitalData = async () => {
    if (id !== "") {
      if (addOrEdit === "Edit") {
        try {
          let apiResonse = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_API}/hospital/${id}`
          );
          let rawHospitalData: IHospital = apiResonse.data;
          if(rawHospitalData.staff)
            rawHospitalData.staff = rawHospitalData.staff._id
          else
            rawHospitalData.staff = ''
          console.log("rawHospitalData", rawHospitalData);

          setHospitalData(rawHospitalData);
        } catch (err) {
          notification.open({
            message: "Error",
            description:
              "Cannot connect to api. Please contact admin for more information.",
          });
        }
      } else {
        console.log("rawHospitalData", initValue);
        setHospitalData(initValue as IHospital);
      }
    }
  };

  const handleCancel = () => {
    dispatch(hideAddOrEditModal());
    console.log("set");

    setHospitalData(initValue as IHospital);
  };

  return (
    <Modal
      title={`${addOrEdit} Hospital Information`}
      visible={show}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>
      ]}
      width={1000}
      centered
    >
      <AddEditForm hospitalData={hospitalData} mode={addOrEdit} />
    </Modal>
  );
}

export default ModalAddEdit;
