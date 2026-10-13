import { fetchToday, fetchUpcomming } from "@/database/taskFunction";
import { Task } from "@/types/taskType"
import { useContext, createContext, useEffect, useState } from "react"


type  taskContextType = {
    todayTasks: Task[];
    updateTodayTask: () => Promise<void>;
    setTodayTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    upcomingTasks: Task[];
    updateUpcomingTask: () => Promise<void>;
    setUpcomingTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<taskContextType | null>(null);

export function TaskProvider({ children }: {children: React.ReactNode}){
    const [todayTasks, setTodayTasks] = useState<Task[]>([]);
    const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

    const updateTodayTask = async () => {
        const data = await fetchToday();
        setTodayTasks(data)
    }
    const updateUpcomingTask = async () => {
        const data = await fetchUpcomming();
        setUpcomingTasks(data)
    }
    useEffect(() => {
        updateTodayTask();
        updateUpcomingTask();
    }, [])

    return(
        <TaskContext.Provider value={{todayTasks, updateTodayTask, setTodayTasks, upcomingTasks, updateUpcomingTask, setUpcomingTasks}}>
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

