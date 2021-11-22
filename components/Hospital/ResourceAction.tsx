import { Tooltip } from 'antd';
import React, { ReactElement } from 'react'
import { TResourceUI } from '../../class/data_struct/resource';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";

interface Props {
  record: TResourceUI,
  showAddEditResourceModal: (record:TResourceUI, isEdit: boolean) => void,
  showDeleteResourceModal: (record:TResourceUI) => void,
}

function ResourceAction(props: Props): ReactElement {

  const { showAddEditResourceModal, showDeleteResourceModal, record } = props

  //event handler
  const showAddEditResourceModalWrapper = (isEdit:boolean = false) => {
    showAddEditResourceModal(record, isEdit);
  }
  const showDeleteResourceModalWrapper = () => {
    showDeleteResourceModal(record);
  }

  return (
    <div>
      <Tooltip title="View">
        <a
          id={`resource-${record._id}-view`}
          className="hover:tw-text-green-500"
          onClick={() => {
            showAddEditResourceModalWrapper(true);
          }}
        >
          <EyeOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>

      <Tooltip title="Edit">
        <a
          id={`resource-${record._id}-edit`}
          className="hover:tw-text-yellow-500"
          onClick={() => {
            showAddEditResourceModalWrapper();
          }}
        >
          <EditOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>

      <Tooltip title="Remove">
        <a
          id={`resource-${record._id}-remove`}
          className="hover:tw-text-red-500"
          onClick={() => {
            showDeleteResourceModalWrapper();
          }}
        >
          <DeleteOutlined className="tw-font-base tw-text-lg tw-mr-3" />
        </a>
      </Tooltip>
    </div>
  )
}

export default ResourceAction
