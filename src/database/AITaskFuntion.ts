
import { db } from "./database";
import { AITask } from "@/types/aiTask";

export function getAITaskContext(): AITask[] {
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
