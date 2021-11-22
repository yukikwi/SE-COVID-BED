import React, { ReactElement } from "react";
import { Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";

interface Props {
  hospitalStatus?: boolean;
  updateHospitalStatus: SwitchChangeEventHandler;
  mode?: string;
}

HospitalStatus.defaultProps = {
  hospitalStatus: true,
};

function HospitalStatus(props: Props): ReactElement {
  // props
  const { hospitalStatus, updateHospitalStatus, mode } = props;

  return (
    <Switch
      onChange={updateHospitalStatus}
      checkedChildren="Open"
      unCheckedChildren="Close"
      defaultChecked={hospitalStatus}
      disabled={mode === "Add"}
    />
  );
}

export default HospitalStatus;
