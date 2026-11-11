import { deleteTask } from "@/database/taskFunction";
import {Task} from "@/types/taskType";
type HandleDeleteTaskProps = {
    taskId: number;
    refresh: () => Promise<void>;
};

export const handleDeleteTask = async ({ taskId, refresh }: HandleDeleteTaskProps) => {
    try {
        deleteTask(taskId);
        await refresh();
    } catch (error) {
        console.error("Failed to delete task:", error);
    }
    
};


