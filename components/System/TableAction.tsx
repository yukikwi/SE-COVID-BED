import { Tooltip } from 'antd';
import router from 'next/router';
import React, { ReactElement } from 'react'
import { showAddOrEditModal } from '../../store/addOrEditHospitalModal/actions';
import { setHospitalId } from '../../store/user/actions';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { showHospitalDeleteModal } from '../../store/deleteModal/actions';
import { TUiHospital } from '../../pages/system';

interface Props {
  record: TUiHospital,
  setSelectedHospital: (data:any) => void
}

function TableAction(props: Props): ReactElement {
  //state and redux part
  const { record, setSelectedHospital } = props
  const dispatch = useDispatch();

  // event handler
  const handleEdit = () => {
    dispatch(showAddOrEditModal("Edit"));
    setSelectedHospital({
      key: record.key,
      hospital: record.hospital,
    });
  }

  const handleRemove = () => {
    dispatch(showHospitalDeleteModal());
    setSelectedHospital({
      key: record.key,
      hospital: record.hospital,
    });
  }

  return (
    <div>
      <Tooltip title="View">
        <a
          id={`hospital-${record.key}-view`}
          className="hover:tw-text-green-500"
          onClick={() => {
            dispatch(setHospitalId(record.key));
            router.push("/hospital");
          }}
        >
          <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>

      <Tooltip title="Edit">
        <a
          id={`hospital-${record.key}-edit`}
          className="hover:tw-text-yellow-500"
          onClick={handleEdit}
        >
          <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>

      <Tooltip title="Remove">
        <a
          id={`hospital-${record.key}-delete`}
          className="hover:tw-text-red-500"
          onClick={handleRemove}
        >
          <DeleteOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>
    </div>
  )
}

export default TableAction

