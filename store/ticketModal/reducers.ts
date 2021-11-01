import { ticketModalState, ticketModalActionType, ticketModalActionInterface } from "./type";

const initialState: ticketModalState = {
	showTicketModal: false,
};

export function ticketModalReducer(state = initialState, action: ticketModalActionInterface): ticketModalState {
	switch (action.type) {
		case ticketModalActionType.SHOW_TICKET_MODAL:
			return { showTicketModal: true };
    case ticketModalActionType.HIDE_TICKET_MODAL:
      return { showTicketModal: false };
		default:
			return state;
	}
}