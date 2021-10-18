export type addOrEdit = 'Add' | 'Edit'

export interface addOrEditModalState {
  show: boolean;
  addOrEdit?: addOrEdit
}

export enum addOrEditModalActionType {
  SHOW_AOR_MODAL = "SHOW_AOR_MODAL",
  HIDE_AOR_MODAL = "HIDE_AOR_MODAL"
}

export type addOrEditModalAction = addOrEditModalActionType;

export interface addOrEditModalActionInterface {
  type: addOrEditModalAction;
  payload?: addOrEdit;
}