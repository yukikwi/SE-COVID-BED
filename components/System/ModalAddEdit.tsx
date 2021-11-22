import React, { ReactElement, useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAddOrEditModalState } from "../../store/addOrEditHospitalModal/selectors";
import { hideAddOrEditModal } from "../../store/addOrEditHospitalModal/actions";
import AddEditForm from "./ModalHospitalForm/AddEdit";
import { THospital } from "../../class/data_struct/hospital";

export type TUiHospital = {
  key: string;
  hospital: string;
  convince: string;
  staff: string;
  available: number;
  amount: number;
  isClose: boolean;
};

interface Props {
  id: string;
}

function ModalAddEdit(props: Props): ReactElement {
  // state & redux part
  const dispatch = useDispatch();
  const { show, addOrEdit } = useSelector(getAddOrEditModalState);
  const { id } = props;
  const initValue:THospital = {
    hospitalName: "",
    hospitalPhoneNumber: "",
    hospitalAddress: "",
    hospitalLocation: {},
    isAvailable: true,
    isDelete: false,
  };
  const [hospitalData, setHospitalData] = useState<THospital>(
    initValue
  );

  // run fetch data on id or mode change
  useEffect(() => {
    fetchHospitalData();
  }, [id, addOrEdit]);

  // Method: fetch hospital data
  const fetchHospitalData = async () => {
    if (id !== "") {
      // if add -> don't need to fetch data
      if (addOrEdit === "Edit") {
        try {
          let apiResonse = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_API}/hospital/${id}`
          );
          
          let rawHospitalData: THospital = apiResonse.data;
          if (rawHospitalData.staff)
            rawHospitalData.staff = rawHospitalData.staff._id;
          else
            rawHospitalData.staff = "";

          setHospitalData(rawHospitalData);
        } catch (err) {
          notification.open({
            message: "Error",
            description:
              "Cannot connect to api. Please contact admin for more information.",
          });
        }
      } else {
        // add using init value
        setHospitalData(initValue);
      }
    }
  };

  // handle when user click cancel or close modal
  const handleCancel = () => {
    dispatch(hideAddOrEditModal());
    setHospitalData(initValue);
  };

  return (
    <Modal
      title={`${addOrEdit} Hospital Information`}
      visible={show}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
      ]}
      width={1000}
      centered
    >
      <AddEditForm hospitalData={hospitalData} mode={addOrEdit} isShow={show} />
    </Modal>
  );
}

export default ModalAddEdit;
