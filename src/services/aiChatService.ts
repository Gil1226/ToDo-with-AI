import { db } from "@/database/database";
import { askGemini } from "./aiServices";
import { AIAction } from "@/types/chatTypes";
import { AITask } from "@/types/aiTask";
import { getTodayDateSQL } from "@/utility/dateFormat";
import { validDate, validTime } from "@/utility/dateAndTimeValidation";
import { createTask, updateTask } from "@/database/taskFunction";

export function getAITasks(): AITask[] {
  return db.getAllSync<AITask>(`
    SELECT
      id,
      title,
      time,
      endTime,
      date,
      category,
      completed,
      isImportant
    FROM tasks
    ORDER BY date, time
    LIMIT 100
  `);
}

export async function processChatMessage(message: string): Promise<AIAction> {
  const tasks = getAITasks();

  return askGemini(message, tasks, getTodayDateSQL());
}

export function confirmTaskAction(action: AIAction): string {
  //create
  if (action.type === "create_task") {
    const title = action.title?.trim();

    if (!title) {
      throw new Error("The task title is required.");
    }

    if (
      (action.date !== null && !validDate(action.date)) ||
      !validTime(action.time) ||
      !validTime(action.endTime)
    ) {
      throw new Error("The proposed date or time is invalid.");
    }

    if (action.time && action.endTime && action.endTime <= action.time) {
      throw new Error("End time must be later than start time.");
    }

    createTask(title, action.time || "", action.endTime || "", action.date || "", action.category || "")
    
    return `Created "${title}".`;
  }
  //resched
  if (action.type === "reschedule_task") {
    if (!Number.isInteger(action.taskId) || !validDate(action.date)) {
      throw new Error("The proposed task ID or date is invalid.");
    }

    if (!validTime(action.time) || !validTime(action.endTime)) {
      throw new Error("The proposed time is invalid.");
    }

    if (action.time && action.endTime && action.endTime <= action.time) {
      throw new Error("End time must be later than start time.");
    }

    // Recheck the task against SQLite at confirmation time.
    const task = db.getFirstSync<AITask>(
      `SELECT id, title, time, endTime, date, category,
              completed, isImportant
       FROM tasks
       WHERE id = ?`,
      action.taskId,
    );

    if (!task) {
      throw new Error("This task no longer exists.");
    }

    if (task.completed === 1) {
      throw new Error("Completed tasks cannot be rescheduled.");
    }

    // Preserve the original start/end times if the AI omitted them.
    const newTime = action.time ?? task.time;
    const newEndTime = action.endTime ?? task.endTime;
 
    if (newTime && newEndTime && newEndTime <= newTime) {
      throw new Error("End time must be later than start time.");
    }

    const result = updateTask(action.date, newTime, newEndTime, action.taskId)

    if (result.changes === 0) {
      throw new Error(
        "Task was not changed. It may have been completed or removed.",
      );
    }

    return `Rescheduled "${task.title}".`;
  }

  throw new Error("This action cannot change your tasks.");
}
