export interface deleteModalState {
  show: boolean;
}

export enum deleteModalActionType {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL"
}

export type deleteModalAction = deleteModalActionType;

export interface deleteModalActionInterface {
  type: deleteModalAction;
  payload: boolean;
}