import { createStore, combineReducers } from "redux";

import { deleteModalReducer } from "./deleteModal/reducers";
import { addOrEditModalReducer } from "./addOrEditHospitalModal/reducers";
import { userReducer } from "./user/reducers";
import { approveModalReducer } from "./approveModal/reducers";
import { patientModalReducer } from "./addPatientModal/reducers";

const rootReducer = combineReducers({
	deleteModalReducer,
	userReducer,
	addOrEditModalReducer,
	approveModalReducer,
	patientModalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer);

	return store;
}