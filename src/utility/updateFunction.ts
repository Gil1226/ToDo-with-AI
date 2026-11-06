type UpdateTaskFormProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number;
};

export const handleEditTask = ({taskId, setShowUpdateTaskForm}: UpdateTaskFormProps) => {
    setShowUpdateTaskForm(true);
    
};