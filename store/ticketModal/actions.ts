import { ticketModalActionType, ticketModalActionInterface } from "./type";

export function showTicketModal(): ticketModalActionInterface {
	return {
		type: ticketModalActionType.SHOW_TICKET_MODAL,
		payload: true,
	};
}

export function hideTicketModal(): ticketModalActionInterface {
	return {
		type: ticketModalActionType.HIDE_TICKET_MODAL,
		payload: false,
	};
}