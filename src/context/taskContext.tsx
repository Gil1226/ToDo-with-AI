import { fetchTask } from "@/database/taskFunction";
import { Task } from "@/types/taskType"
import { useContext, createContext, useEffect, useState } from "react"


type  taskContextType = {
    tasks: Task[];
    updateTask: () => Promise<void>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<taskContextType | null>(null);

export function TaskProvider({ children }: {children: React.ReactNode}){
    const [tasks, setTasks] = useState<Task[]>([]);

    const updateTask = async () => {
        const data = await fetchTask();
        setTasks(data)
    }

    useEffect(() => {
        updateTask();
    }, [])

    return(
        <TaskContext.Provider value={{tasks, updateTask, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used inside TaskProvider");
    }

    return context;
}

