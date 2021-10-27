import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { IResource } from "../../../class/data_struct/resource";

interface Props {
  hospitalId: string;
}

interface Record {
  _id: string;
  key: string;
  resource: string;
  maximum: number;
  available: number;
  remark: string;
}

function Resources({ hospitalId }: Props): ReactElement {
  // Init state
  const [editingKey, setEditingKey] = useState("");
  const [removeOnCancelKey, setRemoveOnCancelKey] = useState(false);
  const [data, setData] = useState<Array<any>>([]);
  const [form] = Form.useForm();

  // function to connect API
  const fetchApiResource = async () => {
    try {
      let apiResonse: any = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/resource`,
        {
          hospitalId,
        }
      );

      let rawResourceData: Array<IResource> = apiResonse.data;
      setData(rawResourceData);
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  // declare edit method
  const editApi = async (resourceId: string, formData: Record) => {
    //call edit api
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API}/resource/edit-resource`,
        {
          id: resourceId,
          newData: formData,
        }
      );
      notification.open({
        message: "Success",
        description: "Edit resource information successful",
      });
    } catch (error) {
      notification.open({
        message: "Error",
        description:
          "Cannot connect to api. Please contact admin for more information.",
      });
    }
  };

  useEffect(() => {
    fetchApiResource();
  }, [hospitalId]);

  // check is row in edit state
  const isEditing = (record: Record) => record.key === editingKey;

  // if user click edit do this
  const edit = (record: Partial<Record> & { key: React.Key }) => {
    form.setFieldsValue({
      resource: "",
      maximum: 0,
      available: 0,
      remark: "",
      ...record,
    });
    // set editing key to specific row
    setEditingKey(record.key);
  };

  const cancel = () => {
    let newData = [];
    setEditingKey("");
    // If removeOncancelKey set to true remove editing obj
    if (removeOnCancelKey) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key !== editingKey) newData?.push(data[i]);
      }

      setData(newData);
      setRemoveOnCancelKey(false);
    }
  };

  // Original columns
  const columns = [
    {
      title: "Resource",
      dataIndex: "resourceName",
      key: "resourceName",
      editable: true,
    },
    {
      title: "Resource Code",
      dataIndex: "resourceCode",
      key: "resourceCode",
      editable: true,
    },
    {
      title: "Maximum",
      dataIndex: "maximum",
      key: "maximum",
      editable: true,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      editable: true,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Record) => {
        // render option: save, cancel
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  // patch cell
  const mergedColumns = columns.map((col) => {
    // if cannot edit
    if (!col.editable) {
      return col;
    }
    // else allow edit
    return {
      ...col,
      onCell: (record: Record) => ({
        record,
        inputType:
          col.dataIndex === "maximum" || col.dataIndex === "available"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // save data to datastate
  const save = async (key: React.Key) => {
    try {
      // validate field
      const row = (await form.validateFields()) as Record;

      const newData = [...data];
      // is row already exist
      const index = newData.findIndex((item) => key === item.key);
      // if found replace old one
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // save datastate
        setData(newData);
        editApi(item._id, row);
        setEditingKey("");
      } else {
        // save as new row
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Record;
    index: number;
    children: React.ReactNode;
  }

  // Edit cell UI
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // Number input or text input
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // Add new resource function
  const addNewResource = () => {
    let newDataKey = "1";
    if (
      data.length !== 0 &&
      typeof parseInt(data[data.length - 1]?.key) === "number"
    )
      newDataKey = (parseInt(data[data.length - 1]?.key) + 1).toString();
    let newRowData: Record = {
      _id: "",
      key: newDataKey,
      resource: "",
      maximum: 0,
      available: 0,
      remark: "",
    };
    let newData = [...data, { ...newRowData }];
    setData(newData);
    setRemoveOnCancelKey(true);
    edit(newRowData);
  };

  return (
    <Form form={form} component={false}>
      <div className="tw-overflow-x-scroll">
        <div className="tw-mb-3">
          <label>Resources</label>
          <Button
            className="tw-ml-3"
            onClick={() => {
              addNewResource();
            }}
          >
            Add new resources
          </Button>
        </div>
        <Table
          dataSource={data}
          columns={mergedColumns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </div>
    </Form>
  );
}

export default Resources;
