import { resourceModalActionType, resourceModalActionInterface } from "./type";

export function showResourceModal(): resourceModalActionInterface {
	return {
		type: resourceModalActionType.SHOW_RESOURCE_MODAL,
		payload: true,
	};
}

export function hideResourceModal(): resourceModalActionInterface {
	return {
		type: resourceModalActionType.HIDE_RESOURCE_MODAL,
		payload: false,
	};
}
