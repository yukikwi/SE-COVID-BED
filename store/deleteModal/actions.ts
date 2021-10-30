import { deleteModalActionType, deleteModalActionInterface } from "./type";

export function showHospitalDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.SHOW_SYS_HOSPITAL_DELETE_MODAL,
		payload: true,
	};
}

export function hideHospitalDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.HIDE_SYS_HOSPITAL_DELETE_MODAL,
		payload: false,
	};
}

export function showResourceDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.SHOW_HOS_RESOURCE_DELETE_MODAL,
		payload: true,
	};
}

export function hideResourceDeleteModal(): deleteModalActionInterface {
	return {
		type: deleteModalActionType.HIDE_HOS_RESOURCE_DELETE_MODAL,
		payload: false,
	};
}