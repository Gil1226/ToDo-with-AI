import { Task } from "@/types/taskType";
type UpdateTaskFormProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export const handleEditTask = ({task, setShowUpdateTaskForm, setTask}: UpdateTaskFormProps) => {
    setShowUpdateTaskForm(true);
    setTask(task);
};