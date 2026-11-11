type UpdateTaskFormProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number;
  setTaskId: React.Dispatch<React.SetStateAction<number>>;
};

export const handleEditTask = ({taskId, setShowUpdateTaskForm, setTaskId}: UpdateTaskFormProps) => {
    setShowUpdateTaskForm(true);
    setTaskId(taskId);
};