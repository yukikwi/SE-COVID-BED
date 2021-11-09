import { dischargeModalState, dischargeModalActionType, dischargeModalActionInterface } from "./type";

const initialState: dischargeModalState = {
	show: false,
};

export function dischargeModalReducer(state = initialState, action: dischargeModalActionInterface): dischargeModalState {
	switch (action.type) {
		case dischargeModalActionType.SHOW_DISCHARGE_MODAL:
			return { show: true };
    case dischargeModalActionType.HIDE_DISCHARGE_MODAL:
      return { show: false };
		default:
			return state;
	}
}