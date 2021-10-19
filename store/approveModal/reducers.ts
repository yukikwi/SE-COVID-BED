import { approveModalState, approveModalActionType, approveModalActionInterface } from "./type";

const initialState: approveModalState = {
	show: false,
};

export function approveModalReducer(state = initialState, action: approveModalActionInterface): approveModalState {
	switch (action.type) {
		case approveModalActionType.SHOW_APPROVE_MODAL:
			return { show: true };
    case approveModalActionType.HIDE_APPROVE_MODAL:
      return { show: false };
		default:
			return state;
	}
}