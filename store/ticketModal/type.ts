export interface ticketModalState {
  showTicketModal: boolean;
}

export enum ticketModalActionType {
  SHOW_TICKET_MODAL = "SHOW_TICKET_MODAL",
  HIDE_TICKET_MODAL = "HIDE_TICKET_MODAL"
}

export type ticketModalAction = ticketModalActionType;

export interface ticketModalActionInterface {
  type: ticketModalAction;
  payload: boolean;
}