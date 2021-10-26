import { TUser } from "../../class/data_struct/user";

export interface userState {
  userinfo: TUser,
  login: boolean,
  loadStatus: boolean
}

export enum userActionType {
  SET_USER_INFO = "SET_USER_INFO",
  LOGOUT = "LOGOUT",
  SET_HOSPITAL_ID = "SET_HOSPITAL_ID"
}

export type userAction = userActionType;

export interface userActionInterface {
  type: userAction;
  payload: TUser | string | undefined;
}