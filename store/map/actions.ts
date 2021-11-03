import { mapActionType, mapActionInterface, TLocation } from "./type";

export function setLoc(loc:TLocation): mapActionInterface {
	return {
		type: mapActionType.SET_LOC,
		payload: loc,
	};
}
