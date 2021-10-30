import { deleteModalState, deleteModalActionType, deleteModalActionInterface } from "./type";

const initialState: deleteModalState = {
	showHospitalDeleteModal: false,
	showResourceModal: false
};

export function deleteModalReducer(state = initialState, action: deleteModalActionInterface): deleteModalState {
	switch (action.type) {
		case deleteModalActionType.SHOW_SYS_HOSPITAL_DELETE_MODAL:
			return { showHospitalDeleteModal: true, showResourceModal: false };
    case deleteModalActionType.HIDE_SYS_HOSPITAL_DELETE_MODAL:
      return { showHospitalDeleteModal: false, showResourceModal: false };
    case deleteModalActionType.SHOW_HOS_RESOURCE_DELETE_MODAL:
      return { showHospitalDeleteModal: false, showResourceModal: true };
    case deleteModalActionType.HIDE_HOS_RESOURCE_DELETE_MODAL:
      return { showHospitalDeleteModal: false, showResourceModal: false };
		default:
			return state;
	}
}