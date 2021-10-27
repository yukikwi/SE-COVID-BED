import { RootState } from "../index";

export function getResourceModalState(state: RootState) {
	return state.resourceModalReducer.show;
}