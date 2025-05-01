import {
  IconButton,
  ListItem,
  ListItemText,
  Checkbox,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useAppDispatch } from "../../lib/redux/hooks";
import {
  toggleTaskDone,
  removeTask,
  editTask,
  ITask,
} from "../../lib/redux/TasksSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TaskTextForm from "../reusable/TaskTextForm";

// validation schema
const taskSchema = z.object({
  text: z
    .string()
    .min(3, "حداقل ۳ کاراکتر لازم است")
    .max(50, "حداکثر ۵۰ کاراکتر مجاز است")
    .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است"),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskListItemProps {
  task: ITask;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  // Handle toggle for done section
  const handleToggleDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskDone({ id: task.id, date: task.date }));
  };

  // Handle deleting the task
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeTask({ id: task.id, date: task.date }));
  };

  const handleOpenEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  // Close the task edit dialog
  const handleCloseEdit = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          "&:hover": { backgroundColor: "action.hover" },
          cursor: "pointer",
          position: "relative",
          direction: "rtl",
          pr: 8,
        }}
        onClick={handleOpenEdit}
        secondaryAction={
          <Stack direction="row" spacing={1}>
            <Tooltip title="حذف">
              <IconButton
                edge="start"
                onClick={handleDelete}
                sx={{ ml: 1 }}
                color="error"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      >
        <ListItemText
          primary={task.text}
          sx={{
            textDecoration: task.done ? "line-through" : "none",
            textAlign: "right",
            px: 2,
            color: task.done ? "text.disabled" : "inherit",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />

        <Checkbox
          edge="start"
          checked={task.done}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleDone(e);
          }}
          color="primary"
        />
      </ListItem>

      <Dialog
        open={isEditing}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle align="right">ویرایش تسک</DialogTitle>
        <DialogContent>
          <TaskTextForm
            initialText={task.text}
            onSubmit={(newText) => {
              dispatch(editTask({ id: task.id, newText }));
              handleCloseEdit();
            }}
            onCancel={handleCloseEdit}
            submitLabel="ذخیره تغییرات"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskListItem;
