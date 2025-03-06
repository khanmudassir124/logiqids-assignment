import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducer";

export const revertAll = createAction("REVERT_ALL");

const combinedReducer = combineReducers({
  board: boardReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "REVERT_ALL") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
