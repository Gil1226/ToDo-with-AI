import { Task } from "@/types/taskType";
import { getTodayDateSQL } from "@/utility/dateFormat";
import { db } from "./database";

export function fetchToday() {
  const today = getTodayDateSQL();
  const tasks = db.getAllSync<Task>(
    `
        SElECT * FROM tasks WHERE date = ? ORDER BY time ASC
    `,
    today,
  );

  const convertTasks = tasks.map((task) => ({
    ...task,
    completed: Boolean(task.completed),
  }));
  return convertTasks;
}

export function fetchUpcomming() {
  const today = getTodayDateSQL();
  const tasks = db.getAllSync<Task>(
    `
        SElECT * FROM tasks WHERE date > ? ORDER BY date ASC, time ASC
    `,
    today,
  );

  const convertTasks = tasks.map((task) => ({
    ...task,
    completed: Boolean(task.completed),
  }));
  return convertTasks;
}
export function fetchHistory() {
  const today = getTodayDateSQL();
  const tasks = db.getAllSync<Task>(
    `SElECT * FROM tasks WHERE date < ? ORDER BY date ASC, time ASC`,
    today,
  );

  const convertTasks = tasks.map((task) => ({
    ...task,
    completed: Boolean(task.completed),
  }));
  return convertTasks;
}

export function createTask(
  title: string,
  time: string,
  date: string,
  category: string,
) {
  db.runSync(
    `INSERT INTO tasks (title, time, date, category) 
                VALUES (?, ?, ?, ?)`,
    title,
    time,
    date,
    category,
  );
  console.log("Task created successfully.");
}

export function updateCompleted(id: number, completed: boolean) {
  db.runSync(
    `UPDATE tasks SET completed = ? WHERE id == ?`,
    completed ? 1 : 0,
    id,
  );
  console.log("Task Updated successfully.");
}

type CategoryRow = {
  category: string;
};

export function distinctCategory() {
  const today = getTodayDateSQL();
  const categories = db.getAllSync<CategoryRow>(
    `SELECT DISTINCT category FROM tasks WHERE date >= ?`,
    today,
  );
  return categories.map((category) => category.category);
}

export function todayCount() {
  const today = getTodayDateSQL();
  const count = db.getFirstSync<{ count: number }>(
    `
        SELECT COUNT(*) as count
        FROM tasks
        WHERE date = ?
    `,
    today,
  );

  return count ? count.count : 0;
}
