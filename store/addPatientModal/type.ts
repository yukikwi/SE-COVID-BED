export interface patientModalState {
  show: boolean;
}

export enum patientModalActionType {
  SHOW_PATIENT_MODAL = "SHOW_PATIENT_MODAL",
  HIDE_PATIENT_MODAL = "HIDE_PATIENT_MODAL"
}

export type patientModalAction = patientModalActionType;

export interface patientModalActionInterface {
  type: patientModalAction;
  payload: boolean;
}