import { RootState } from "../index";

export function getDeleteModalState(state: RootState) {
	return state.deleteModalReducer.showHospitalDeleteModal;
}

export function getDeleteResourceModalState(state: RootState) {
	return state.deleteModalReducer.showResourceModal;
}