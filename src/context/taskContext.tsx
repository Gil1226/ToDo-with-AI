import { fetchHistory, fetchToday, fetchUpcomming } from "@/database/taskFunction";
import { Task } from "@/types/taskType"
import { useContext, createContext, useEffect, useState, useCallback } from "react"


type  taskContextType = {
    todayTasks: Task[];
    updateTodayTask: () => Promise<void>;
    setTodayTasks: React.Dispatch<React.SetStateAction<Task[]>>;

    upcomingTasks: Task[];
    updateUpcomingTask: () => Promise<void>;
    setUpcomingTasks: React.Dispatch<React.SetStateAction<Task[]>>;

    historyTasks: Task[];
    updateHistoryTask: () => Promise<void>;
    setHistoryTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskContext = createContext<taskContextType | null>(null);

export function TaskProvider({ children }: {children: React.ReactNode}){
    const[loading, setLoading] = useState(false);

    const [todayTasks, setTodayTasks] = useState<Task[]>([]);

    const updateTodayTask = useCallback(async () => {
        const data = await fetchToday();
        setTodayTasks(data);
        console.log("down")
    }, []);

    const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

    const updateUpcomingTask = useCallback(async () => {
        const data = fetchUpcomming();
        setUpcomingTasks(data)
        console.log("up")
    }, [])

    const [historyTasks, setHistoryTasks] = useState<Task[]>([]);

    const updateHistoryTask = async () => {
        const data = await fetchHistory();
        setHistoryTasks(data)
    }
    const refreshTasks = useCallback(async () => {
        setLoading(true);

        try {
        await Promise.all([
            updateTodayTask(),
            updateUpcomingTask(),
            updateHistoryTask(),
        ]);
        } finally {
        setLoading(false);
        }
    }, [updateTodayTask, updateUpcomingTask]);

    useEffect(() => {
        void refreshTasks()
    }, [refreshTasks])

    return(
        <TaskContext.Provider value={{todayTasks, updateTodayTask, setTodayTasks, upcomingTasks, updateUpcomingTask, setUpcomingTasks, historyTasks, updateHistoryTask, setHistoryTasks}}>
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

