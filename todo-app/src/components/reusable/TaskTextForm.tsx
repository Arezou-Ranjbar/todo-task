// components/forms/TaskTextForm.tsx
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack } from "@mui/material";

//schema with Zod for form validation
const schema = z.object({
  text: z
    .string()
    .min(3, "حداقل ۳ کاراکتر لازم است")
    .max(50, "حداکثر ۵۰ کاراکتر مجاز است")
    .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است"),
});

// Defining the type for the form data
type FormData = z.infer<typeof schema>;

interface TaskTextFormProps {
  initialText?: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const TaskTextForm: React.FC<TaskTextFormProps> = ({
  initialText = "",
  onSubmit,
  onCancel,
  submitLabel = "ثبت",
}) => {
  // react-hook-form to manage form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { text: initialText },
  });

  // form submission
  const handleFormSubmit = (data: FormData) => {
    onSubmit(data.text);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="متن تسک"
              autoFocus
              fullWidth
              variant="outlined"
              error={!!errors.text}
              helperText={errors.text?.message}
            />
          )}
        />
        <Stack direction="row" spacing={2}>
          {onCancel && (
            <Button onClick={onCancel} variant="outlined" color="secondary">
              لغو
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            {submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskTextForm;
