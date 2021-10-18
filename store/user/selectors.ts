import { RootState } from "../index";

export function getUserState(state: RootState) {
	return state.userReducer;
}