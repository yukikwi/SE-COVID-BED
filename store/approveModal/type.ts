export interface approveModalState {
  show: boolean;
}

export enum approveModalActionType {
  SHOW_APPROVE_MODAL = "SHOW_APPROVE_MODAL",
  HIDE_APPROVE_MODAL = "HIDE_APPROVE_MODAL"
}

export type approveModalAction = approveModalActionType;

export interface approveModalActionInterface {
  type: approveModalAction;
  payload: boolean;
}