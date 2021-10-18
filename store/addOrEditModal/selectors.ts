import { RootState } from "../index";

export function getAddOrEditModalState(state: RootState) {
  return state.addOrEditModalReducer;
}
