import { userState, userActionType, userActionInterface } from "./type";

const initialState: userState = {
  userinfo: {},
	login: false
};

export function userReducer(state = initialState, action: userActionInterface): userState {
	switch (action.type) {
		case userActionType.SET_USER_INFO:
			return { userinfo: action.payload, login: true };
		default:
			return state;
	}
}