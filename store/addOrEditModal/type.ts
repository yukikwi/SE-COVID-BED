export type addOrEdit = 'Add' | 'Edit'

export interface addOrEditModalState {
  show: boolean;
  addOrEdit?: addOrEdit
}

export enum addOrEditModalActionType {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL"
}

export type addOrEditModalAction = addOrEditModalActionType;

export interface addOrEditModalActionInterface {
  type: addOrEditModalAction;
  payload?: addOrEdit;
}