import { createStore, combineReducers } from "redux";

import { deleteModalReducer } from "./deleteModal/reducers";

const rootReducer = combineReducers({
	deleteModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer);

	return store;
}