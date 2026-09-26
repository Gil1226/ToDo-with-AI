import { db } from "./database";
import { Task } from "@/types/taskType";

export function fetchTask() {
    const tasks = db.getAllSync<Task>(`SELECT * FROM tasks ORDER BY id DESC`);

    const convertTasks = tasks.map(task => ({
        ...task,
        completed: Boolean(task.completed),
    }));
    return convertTasks
}

export function createTask(title:string, time:string, date:string, category:string) {
    db.runSync(`INSERT INTO tasks (title, time, date, category) 
                VALUES (?, ?, ?, ?)`, title, time, date, category
            );
            console.log("Task created successfully.");
}

export function updateCompleted(id:number, completed:boolean) {
    db.runSync(`UPDATE tasks SET completed = ? WHERE id == ?`, completed, id);
    console.log("Task Updated successfully.");
}