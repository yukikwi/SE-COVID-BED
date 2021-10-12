import { deleteModalActionType, deleteModalActionInterface } from "./type";

export function showModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.SHOW_MODAL,
		payload: false,
	};
}

export function hideModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.HIDE_MODAL,
		payload: false,
	};
}
