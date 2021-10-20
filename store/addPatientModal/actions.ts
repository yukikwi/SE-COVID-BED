import { patientModalActionType, patientModalActionInterface } from "./type";

export function showPatientModal(): patientModalActionInterface {
	return {
		type: patientModalActionType.SHOW_PATIENT_MODAL,
		payload: true,
	};
}

export function hidePatientModal(): patientModalActionInterface {
	return {
		type: patientModalActionType.HIDE_PATIENT_MODAL,
		payload: false,
	};
}
