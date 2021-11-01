export interface mapState {
  lat: number,
  long: number
}

export enum mapActionType {
  SET_LOC = "SET_LOC"
}

export type mapAction = mapActionType;

export interface mapActionInterface {
  type: mapAction;
  payload: TLocation;
}

export type TLocation = {
  lat: number,
  long: number
}