import { TUser } from "../../class/data_struct/user";
import { userActionType, userActionInterface } from "./type";

export function setUser(userInfo:TUser): userActionInterface {
	return {
		type: userActionType.SET_USER_INFO,
		payload: userInfo,
	};
}

export function storelogout(): userActionInterface {
	return {
		type: userActionType.LOGOUT,
		payload: {},
	};
}

export function setHospitalId(hospitalId:string | undefined): userActionInterface {
	return {
		type: userActionType.SET_HOSPITAL_ID,
		payload: hospitalId,
	};
}