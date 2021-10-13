import { RootState } from "../index";

export function getaddOrEditModalState(state: RootState) {
	return state.addOrEditModalReducer;
}