import { deleteModalActionType, deleteModalActionInterface } from "./type";

export function showDeleteModal(hospitalId:string): deleteModalActionInterface {
	return {
		type: deleteModalActionType.SHOW_DELETE_MODAL,
		payload: hospitalId,
	};
}

export function hideDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.HIDE_DELETE_MODAL,
		payload: 'unknow',
	};
}
