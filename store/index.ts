import { createStore, combineReducers } from "redux";

import { deleteModalReducer } from "./deleteModal/reducers";
import { addOrEditModalReducer } from "./addOrEditModal/reducers";
import { userReducer } from "./user/reducers";

const rootReducer = combineReducers({
	deleteModalReducer,
	userReducer,
	addOrEditModalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer);

	return store;
}