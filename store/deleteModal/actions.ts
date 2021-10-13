import { deleteModalActionType, deleteModalActionInterface } from "./type";

export function showDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.SHOW_MODAL,
		payload: false,
	};
}

export function hideDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.HIDE_MODAL,
		payload: false,
	};
}
