import { dischargeModalActionType, dischargeModalActionInterface } from "./type";

export function showDischargeModal(): dischargeModalActionInterface {
	return {
		type: dischargeModalActionType.SHOW_DISCHARGE_MODAL,
		payload: true,
	};
}

export function hideDischargeModal(): dischargeModalActionInterface {
	return {
		type: dischargeModalActionType.HIDE_DISCHARGE_MODAL,
		payload: false,
	};
}
