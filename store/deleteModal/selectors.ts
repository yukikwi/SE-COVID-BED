import { RootState } from "../index";

export function getDeleteModalState(state: RootState) {
	return state.deleteModalReducer.show;
}

export function getDeleteModalHospitalId(state: RootState) {
	return state.deleteModalReducer.hospitalId;
}