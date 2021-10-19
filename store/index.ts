import { createStore, combineReducers } from "redux";

import { deleteModalReducer } from "./deleteModal/reducers";
import { addOrEditModalReducer } from "./addOrEditModal/reducers";
import { userReducer } from "./user/reducers";
import { approveModalReducer } from "./approveModal/reducers";

const rootReducer = combineReducers({
	deleteModalReducer,
	userReducer,
	addOrEditModalReducer,
	approveModalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer);

	return store;
}