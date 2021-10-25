import React, { ReactElement } from "react";
import { Tag, Typography } from "antd";

type Props = {
  available: number;
  amount: number;
  type: 'resource' | 'patient' | 'severity',
  status: 'Request' | 'In progress' | 'Complete' | undefined,
  patientSeverity: 'Red' | 'Yellow' | 'Green' | undefined
};

// default props define here
Status.defaultProps = {
  available: 0,
  amount: 0,
  type: 'resource',
  status: undefined,
  patientSeverity: undefined
}

function Status(props: Props): ReactElement {
  const { patientSeverity, status, type, available, amount } = props;
  let color = "";
  let tag = "";
  const { Text } = Typography;
  // check status ui for?
  if(type === 'severity'){
    if(patientSeverity === 'Red')
      return <Text type="danger">Red</Text>
    else if(patientSeverity === 'Yellow')
      return <Text type="warning">Yellow</Text>
    else if(patientSeverity === 'Green')
      return <Text type="success">Green</Text>
    else
      return <Text disabled>Not specified</Text>
  }
  else{
    if(type === 'patient' && status){
      tag = status
      if (status == 'Request') {
        color = "red";
      }
      if (status == 'In progress') {
        color = "orange";
      }
      if (status == 'Complete') {
        color = "green";
      }
    }
    if(type === 'resource'){
      if (available / amount < 0.3) {
        color = "orange";
        tag = "Lowstock";
      } else if (available === 0) {
        color = "red";
        tag = "Outofstock";
      } else {
        color = "green";
        tag = "Instock";
      }
    }
    return (
      <Tag color={color} key={tag}>
        {tag}
      </Tag>
    );
  }
}

export default Status;
