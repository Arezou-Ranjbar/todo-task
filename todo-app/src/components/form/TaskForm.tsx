import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../lib/redux/TasksSlice";
import { RootState } from "../../lib/redux/store";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import type { ITask } from "../../lib/redux/TasksSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TaskTextForm from "../reusable/TaskTextForm";

// theme with RTL direction
const theme = createTheme({
  direction: "rtl",
});

//  RTL plugin
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const TaskForm: React.FC = () => {
  // Get selected date from Redux state
  const selectedDate = useSelector(
    (state: RootState) => state.date.selectedDate
  );

  // tasks
  const dispatch = useDispatch();

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="ltr">
          <TaskTextForm
            onSubmit={(text) => {
              if (!selectedDate) return;
              const newTask: ITask = {
                id: crypto.randomUUID(),
                text,
                date: selectedDate,
                done: false,
              };
              dispatch(addTask(newTask));
            }}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default TaskForm;
