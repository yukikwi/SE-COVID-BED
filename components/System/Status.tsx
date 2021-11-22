import React, { ReactElement } from "react";
import { Tag } from "antd";

type Props = {
  available: number;
  amount: number;
  isAvailable: boolean;
};

function Status(props: Props): ReactElement {
  const { available, amount, isAvailable } = props;
  let color = "";
  let tag = "";
  if (isAvailable === false) {
    color = "red";
    tag = "Close";
  } else if (available === 0) {
    color = "orange";
    tag = "UnAvailable";
  } else {
    color = "green";
    tag = "Available";
  }
  return (
    <Tag color={color} key={tag}>
      {tag}
    </Tag>
  );
}

export default Status;
