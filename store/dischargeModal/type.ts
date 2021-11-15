export interface dischargeModalState {
  show: boolean;
}

export enum dischargeModalActionType {
  SHOW_DISCHARGE_MODAL = "SHOW_DISCHARGE_MODAL",
  HIDE_DISCHARGE_MODAL = "HIDE_DISCHARGE_MODAL"
}

export type dischargeModalAction = dischargeModalActionType;

export interface dischargeModalActionInterface {
  type: dischargeModalAction;
  payload: boolean;
}