import { RootState } from "../index";

export function getApproveModalState(state: RootState) {
	return state.approveModalReducer.show;
}