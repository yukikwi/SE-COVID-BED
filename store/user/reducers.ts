import { userState, userActionType, userActionInterface } from "./type";

const initialState: userState = {
  userinfo: {},
	login: false,
  loadStatus: false
};

export function userReducer(state = initialState, action: userActionInterface): userState {
	switch (action.type) {
		case userActionType.SET_USER_INFO:
      if(typeof(action.payload) === 'object'){
        return { userinfo: action.payload, login: true, loadStatus: true };
      }
      else{
        return { 
          ...state // nothing change
        }
      }
    case userActionType.LOGOUT:
      return { userinfo: {}, login: false, loadStatus: true };
    case userActionType.SET_HOSPITAL_ID:
      console.log(action.payload)
      if(typeof(action.payload) === 'string' || typeof(action.payload) === 'undefined'){
        return { 
          ...state,
          userinfo: {
            ...state.userinfo,
            hospitalId: action.payload
          }
        }
      }
      else{
        return { 
          ...state // nothing change
        }
      }
		default:
			return state;
	}
}