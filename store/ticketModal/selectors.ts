import { RootState } from "../index";

export function getTicketModalState(state: RootState) {
	return state.ticketModalReducer.showTicketModal;
}