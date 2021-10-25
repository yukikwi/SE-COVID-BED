import { RootState } from "../index";

export function getPatientModalState(state: RootState) {
	return state.patientModalReducer.show;
}