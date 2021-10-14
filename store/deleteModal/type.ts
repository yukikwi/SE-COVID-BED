export interface deleteModalState {
  show: boolean;
}

export enum deleteModalActionType {
  SHOW_DELETE_MODAL = "SHOW_DELETE_MODAL",
  HIDE_DELETE_MODAL = "HIDE_DELETE_MODAL"
}

export type deleteModalAction = deleteModalActionType;

export interface deleteModalActionInterface {
  type: deleteModalAction;
  payload: boolean;
}