export interface resourceModalState {
  show: boolean;
}

export enum resourceModalActionType {
  SHOW_RESOURCE_MODAL = "SHOW_RESOURCE_MODAL",
  HIDE_RESOURCE_MODAL = "HIDE_RESOURCE_MODAL"
}

export type resourceModalAction = resourceModalActionType;

export interface resourceModalActionInterface {
  type: resourceModalAction;
  payload: boolean;
}