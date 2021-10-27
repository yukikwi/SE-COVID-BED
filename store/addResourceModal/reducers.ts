import { resourceModalState, resourceModalActionType, resourceModalActionInterface } from "./type";

const initialState: resourceModalState = {
	show: false,
};

export function resourceModalReducer(state = initialState, action: resourceModalActionInterface): resourceModalState {
	switch (action.type) {
		case resourceModalActionType.SHOW_RESOURCE_MODAL:
			return { show: true };
    case resourceModalActionType.HIDE_RESOURCE_MODAL:
      return { show: false };
		default:
			return state;
	}
}