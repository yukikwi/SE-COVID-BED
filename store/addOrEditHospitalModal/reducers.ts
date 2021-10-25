import { addOrEditModalState, addOrEditModalActionType, addOrEditModalActionInterface } from "./type";

const initialState: addOrEditModalState = {
	show: false,
  addOrEdit: 'Add'
};

export function addOrEditModalReducer(state = initialState, action: addOrEditModalActionInterface): addOrEditModalState {
	switch (action.type) {
		case addOrEditModalActionType.SHOW_AOR_MODAL:
			return { addOrEdit: action.payload, show: true };
    case addOrEditModalActionType.HIDE_AOR_MODAL:
      return { show: false };
		default:
			return state;
	}
}