import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../localStorage";

export interface ITask {
  id: string;
  text: string;
  date: string;
  done: boolean;
}

interface ITasksState {
  tasksByDate: {
    [date: string]: ITask[];
  };
}

const initialState: ITasksState = loadState()?.tasks || {
  tasksByDate: {},
};

// creating slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const { date } = action.payload;
      const newTask = { ...action.payload, done: false };
      if (!state.tasksByDate[date]) {
        state.tasksByDate[date] = [];
      }
      state.tasksByDate[date].push(newTask);
    },
    toggleTaskDone: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const { id, date } = action.payload;
      const task = state.tasksByDate[date]?.find((task) => task.id === id);
      if (task) {
        task.done = !task.done;
      }
    },

    editTask: (
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) => {
      const { id, newText } = action.payload;

      for (const date in state.tasksByDate) {
        const task = state.tasksByDate[date].find((task) => task.id === id);
        if (task) {
          task.text = newText;
          break;
        }
      }
    },

    removeTask: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const { id, date } = action.payload;
      if (state.tasksByDate[date]) {
        state.tasksByDate[date] = state.tasksByDate[date].filter(
          (task) => task.id !== id
        );
      }
    },
    clearTasksByDate: (state, action: PayloadAction<string>) => {
      delete state.tasksByDate[action.payload];
    },
  },
});

// Exporting the generated action creators

export const {
  addTask,
  removeTask,
  clearTasksByDate,
  editTask,
  toggleTaskDone,
} = tasksSlice.actions;
export default tasksSlice.reducer;
