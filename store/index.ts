import { createStore, combineReducers } from "redux";

import { deleteModalReducer } from "./deleteModal/reducers";
import { addOrEditModalReducer } from "./addOrEditHospitalModal/reducers";
import { userReducer } from "./user/reducers";
import { approveModalReducer } from "./approveModal/reducers";
import { patientModalReducer } from "./addPatientModal/reducers";
import { resourceModalReducer } from "./addResourceModal/reducers";
import { ticketModalReducer } from "./ticketModal/reducers";
import { mapReducer } from "./map/reducers";
import { dischargeModalReducer } from "./dischargeModal/reducers";

const rootReducer = combineReducers({
	deleteModalReducer,
	userReducer,
	addOrEditModalReducer,
	approveModalReducer,
	dischargeModalReducer,
	patientModalReducer,
	resourceModalReducer,
	ticketModalReducer,
	mapReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer);

	return store;
}