export interface deleteModalState {
  showHospitalDeleteModal: boolean;
  showResourceModal: boolean;
}

export enum deleteModalActionType {
  SHOW_SYS_HOSPITAL_DELETE_MODAL = "SHOW_SYS_HOSPITAL_DELETE_MODAL",
  HIDE_SYS_HOSPITAL_DELETE_MODAL = "HIDE_SYS_HOSPITAL_DELETE_MODAL",
  SHOW_HOS_RESOURCE_DELETE_MODAL = "SHOW_HOS_RESOURCE_DELETE_MODAL",
  HIDE_HOS_RESOURCE_DELETE_MODAL = "HIDE_HOS_RESOURCE_DELETE_MODAL"
}

export type deleteModalAction = deleteModalActionType;

export interface deleteModalActionInterface {
  type: deleteModalAction;
  payload: boolean;
}