import { deleteTask } from "@/database/taskFunction";
import {Task} from "@/types/taskType";
type HandleDeleteTaskProps = {
    task: Task;
    refresh: () => Promise<void>;
};

export const handleDeleteTask = async ({ task, refresh }: HandleDeleteTaskProps) => {
    try {
        deleteTask(task.id);
        await refresh();
    } catch (error) {
        console.error("Failed to delete task:", error);
    }
    
};


