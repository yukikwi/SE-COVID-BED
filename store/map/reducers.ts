import { mapState, mapActionType, mapActionInterface } from "./type";

const initialState: mapState = {
  lat: 13.736717,
  long: 100.523186
};

export function mapReducer(state = initialState, action: mapActionInterface): mapState {
	switch (action.type) {
		case mapActionType.SET_LOC:
      return { lat: action.payload.lat, long: action.payload.long };
		default:
			return state;
	}
}