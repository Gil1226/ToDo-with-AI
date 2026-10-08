import { db } from "./database";
import { Task } from "@/types/taskType";

export function fetchTask() {
    const tasks = db.getAllSync<Task>(`SELECT * FROM tasks ORDER BY date ASC, time ASC Limit 5`);

    const convertTasks = tasks.map(task => ({
        ...task,
        completed: Boolean(task.completed),
    }));
    return convertTasks
}

type CategoryRow = {
  category: string;
};

export function distinctCategory() {
    const categories = db.getAllSync<CategoryRow>(`SELECT DISTINCT category FROM tasks`);
    return categories.map(category => category.category);
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