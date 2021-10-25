import { approveModalActionType, approveModalActionInterface } from "./type";

export function showApproveModal(): approveModalActionInterface {
	return {
		type: approveModalActionType.SHOW_APPROVE_MODAL,
		payload: true,
	};
}

export function hideApproveModal(): approveModalActionInterface {
	return {
		type: approveModalActionType.HIDE_APPROVE_MODAL,
		payload: false,
	};
}
