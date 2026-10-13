
import { getTodayDateSQL } from "./date";
import { Task } from "@/types/taskType";

export function todayTask(tasks: Task[]) {
    const todayDate = getTodayDateSQL();
    console.log("fetch today")
    
    return tasks.filter(task => task.date === todayDate).sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).slice(0, 5);;
}

export function upcomingTask(tasks: Task[]){
    const todayDate = getTodayDateSQL();
    console.log("fetch upcom")

    return tasks.filter(task => task.date > todayDate).sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).slice(0, 5);;
}
