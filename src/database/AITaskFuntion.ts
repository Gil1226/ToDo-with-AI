
import { db } from "./database";
import { AITask } from "@/types/aiTask";
import { getTodayDateSQL } from "@/utility/dateFormat";

export function getAITasks(): AITask[] {
  const today = getTodayDateSQL();

  return db.getAllSync<AITask>(
    `
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
      WHERE date >= ?
      ORDER BY date ASC, time ASC
      LIMIT 100
    `,
    [today]
  );
}
