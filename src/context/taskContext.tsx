import { fetchHistory, fetchToday, fetchUpcomming } from "@/database/taskFunction";
import { Task } from "@/types/taskType"
import { useContext, createContext, useEffect, useState, useCallback, useMemo } from "react"


// TYPES
type TodayContextType = {
    todayTasks: Task[];
    updateTodayTask: () => Promise<void>;
    setTodayTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type UpcomingContextType = {
    upcomingTasks: Task[];
    updateUpcomingTask: () => Promise<void>;
    setUpcomingTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type HistoryContextType = {
    historyTasks: Task[];
    updateHistoryTask: () => Promise<void>;
    setHistoryTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

// CONTEXTS
const TodayContext = createContext<TodayContextType | null>(null);
const UpcomingContext = createContext<UpcomingContextType | null>(null);
const HistoryContext = createContext<HistoryContextType | null>(null);


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

    const updateHistoryTask = useCallback(async () => {
        const data = await fetchHistory();
        setHistoryTasks(data);
    }, []);



    const refreshTasks = useCallback(async () => {
        await Promise.all([
            updateTodayTask(),
            updateUpcomingTask(),
            updateHistoryTask(),
        ]);
    }, [updateTodayTask, updateUpcomingTask, updateHistoryTask]);


    const todayValue = useMemo(() => ({
        todayTasks,
        updateTodayTask,
        setTodayTasks,
    }), [todayTasks, updateTodayTask]);

    const upcomingValue = useMemo(() => ({
        upcomingTasks,
        updateUpcomingTask,
        setUpcomingTasks,
    }), [upcomingTasks, updateUpcomingTask]);

    const historyValue = useMemo(() => ({
        historyTasks,
        updateHistoryTask,
        setHistoryTasks,
    }), [historyTasks, updateHistoryTask]);



    useEffect(() => {
        void refreshTasks()
    }, [refreshTasks])




    return(
        <TodayContext.Provider value={todayValue}>
            <UpcomingContext.Provider value={upcomingValue}>
                <HistoryContext.Provider value={historyValue}>
                    {children}
                </HistoryContext.Provider>
            </UpcomingContext.Provider>
        </TodayContext.Provider>
    )
}

// TODAY HOOK
export function useTodayTasks() {
    const context = useContext(TodayContext);

    if (!context) {
        throw new Error("useTodayTasks must be used inside TaskProvider");
    }

    return context;
}


// UPCOMING HOOK
export function useUpcomingTasks() {
    const context = useContext(UpcomingContext);

    if (!context) {
        throw new Error("useUpcomingTasks must be used inside TaskProvider");
    }

    return context;
}


// HISTORY HOOK
export function useHistoryTasks() {
    const context = useContext(HistoryContext);

    if (!context) {
        throw new Error("useHistoryTasks must be used inside TaskProvider");
    }

    return context;
}

