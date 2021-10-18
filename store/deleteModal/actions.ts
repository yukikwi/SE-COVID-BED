import { deleteModalActionType, deleteModalActionInterface } from "./type";

export function showDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.SHOW_DELETE_MODAL,
		payload: true,
	};
}

export function hideDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.HIDE_DELETE_MODAL,
		payload: false,
	};
}
