import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loadState, saveState } from "../localStorage";
import dateReducer from "./dateSlice";
import taskReducer from "./TasksSlice";

// Loading  state from localStorage
const persistedState = loadState();

// Combining the reducers for date and tasks slices
const rootReducer = combineReducers({
  date: dateReducer,
  tasks: taskReducer,
});

// Configuring the store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    tasks: persistedState || { tasksByDate: {} },
  },
});

// Subscribing to store changes to save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});
// Type for the entire state of the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
