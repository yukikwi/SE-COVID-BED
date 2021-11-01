import { RootState } from "../index";

export function getMapState(state: RootState) {
	return state.mapReducer;
}