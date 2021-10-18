import { RootState } from "../index";

export function getDeleteModalState(state: RootState) {
	return state.deleteModalReducer.show;
}