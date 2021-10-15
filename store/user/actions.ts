import { TUser } from "../../class/data_struct/user";
import { userActionType, userActionInterface } from "./type";

export function setUser(userInfo:TUser): userActionInterface {
	return {
		type: userActionType.SET_USER_INFO,
		payload: userInfo,
	};
}