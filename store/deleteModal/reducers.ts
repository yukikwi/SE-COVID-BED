import { deleteModalState, deleteModalActionType, deleteModalActionInterface } from "./type";

const initialState: deleteModalState = {
	hospitalId: 'unknow',
	show: false,
};

export function deleteModalReducer(state = initialState, action: deleteModalActionInterface): deleteModalState {
	switch (action.type) {
		case deleteModalActionType.SHOW_DELETE_MODAL:
			return { hospitalId: action.payload, show: true };
    case deleteModalActionType.HIDE_DELETE_MODAL:
      return { hospitalId: 'unknow', show: false };
		default:
			return state;
	}
}