import React from "react";
import { Paper, List, Typography, Divider } from "@mui/material";
import TaskListItem from "./TaskListItem";
import { useAppSelector } from "../../lib/redux/hooks";

const ListBox: React.FC = () => {
  const selectedDate = useAppSelector((state) => state.date.selectedDate);
  // Get the tasks for all dates
  const todaysTasks = useAppSelector((state) => state.tasks.tasksByDate);
  const tasks = selectedDate ? todaysTasks[selectedDate] ?? [] : [];

  return (
    <Paper
      elevation={3}
      sx={{
        height: 300,
        overflowY: "auto",
        direction: "rtl",
        p: 2,
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom textAlign="center">
        لیست کارهای امروز
      </Typography>
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <React.Fragment key={task.id}>
              <TaskListItem task={task} />
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            {selectedDate
              ? "هیچ کاری برای این تاریخ ثبت نشده است"
              : "تاریخی انتخاب نشده است"}
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default ListBox;
