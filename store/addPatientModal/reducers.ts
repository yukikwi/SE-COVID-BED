import { patientModalState, patientModalActionType, patientModalActionInterface } from "./type";

const initialState: patientModalState = {
	show: false,
};

export function patientModalReducer(state = initialState, action: patientModalActionInterface): patientModalState {
	switch (action.type) {
		case patientModalActionType.SHOW_PATIENT_MODAL:
			return { show: true };
    case patientModalActionType.HIDE_PATIENT_MODAL:
      return { show: false };
		default:
			return state;
	}
}