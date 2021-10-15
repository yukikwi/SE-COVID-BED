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
  const { hospitalStatus, updateHospitalStatus, mode } = props;
  if (mode === "Add") {
    return (
      <Switch
        onChange={updateHospitalStatus}
        checkedChildren="Open"
        unCheckedChildren="Close"
        defaultChecked
        disabled
      />
    );
  } else if (hospitalStatus) {
    return (
      <Switch
        onChange={updateHospitalStatus}
        checkedChildren="Open"
        unCheckedChildren="Close"
        defaultChecked
      />
    );
  } else {
    return (
      <Switch
        onChange={updateHospitalStatus}
        checkedChildren="Open"
        unCheckedChildren="Close"
      />
    );
  }
}

export default HospitalStatus;
