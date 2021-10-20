import { userState, userActionType, userActionInterface } from "./type";

const initialState: userState = {
  userinfo: {},
	login: false,
  loadStatus: false
};

export function userReducer(state = initialState, action: userActionInterface): userState {
	switch (action.type) {
		case userActionType.SET_USER_INFO:
			return { userinfo: action.payload, login: true, loadStatus: true };
    case userActionType.LOGOUT:
      return { userinfo: {}, login: false, loadStatus: true };
		default:
			return state;
	}
}