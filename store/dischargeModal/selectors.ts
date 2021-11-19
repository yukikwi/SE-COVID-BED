import { RootState } from "../index";

export function getDischargeModalState(state: RootState) {
	return state.dischargeModalReducer.show;
}