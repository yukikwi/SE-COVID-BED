import { deleteModalState, deleteModalActionType, deleteModalActionInterface } from "./type";

const initialState: deleteModalState = {
	show: false,
};

export function deleteModalReducer(state = initialState, action: deleteModalActionInterface): deleteModalState {
	switch (action.type) {
		case deleteModalActionType.SHOW_DELETE_MODAL:
			return { show: true };
    case deleteModalActionType.HIDE_DELETE_MODAL:
      return { show: false };
		default:
			return state;
	}
}