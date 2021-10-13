import { addOrEdit, addOrEditModalActionType, addOrEditModalActionInterface } from "./type";

export function showAddOrEditModal(mode:addOrEdit): addOrEditModalActionInterface {
	return {
		type: addOrEditModalActionType.SHOW_MODAL,
		payload: mode,
	};
}

export function hideAddOrEditModal(): addOrEditModalActionInterface {
	return {
		type: addOrEditModalActionType.HIDE_MODAL
	};
}
