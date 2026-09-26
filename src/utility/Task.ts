
import { getTodayDate } from "./date";
import { Task } from "@/types/taskType";

export function todayTask(tasks: Task[]) {
    const todayDate = getTodayDate();
    console.log("fetch today")

    return tasks.filter(task => task.date === todayDate);
}

export function upcomingTask(tasks: Task[]){
    const todayDate = getTodayDate();
    console.log("fetch upcom")

    return tasks.filter(task => task.date > todayDate);
}
