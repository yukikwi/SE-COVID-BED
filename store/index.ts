import { createStore, combineReducers } from "redux";

import { deleteModalReducer } from "./deleteModal/reducers";
import { addOrEditModalReducer } from "./addOrEditModal/reducers";

const rootReducer = combineReducers({
	deleteModalReducer,
	addOrEditModalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer);

	return store;
}