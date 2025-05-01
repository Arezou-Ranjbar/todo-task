import { RootState } from "./redux/store";

//load state from localStorage
export const loadState = () => {
  try {
    const saveData = localStorage.getItem("tasksState");
    return saveData ? JSON.parse(saveData) : undefined;
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

//  save state to localStorage
export const saveState = (state: RootState) => {
  try {
    const saveData = JSON.stringify(state.tasks);
    localStorage.setItem("tasksState", saveData);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};
