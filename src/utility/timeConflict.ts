import { Task } from "@/types/taskType";
import { timeToMinutes } from "./timeFormat";

type TimeConflictProps = {
  todayTasks: Task[];
  newStartTime: string;
  newEndTime: string;
};

export function timeConflict({
  todayTasks,
  newStartTime,
  newEndTime,
}: TimeConflictProps): boolean {
  const newStart = timeToMinutes(newStartTime);
  const newEnd = timeToMinutes(newEndTime);

  if (
    newStart === null ||
    newEnd === null ||
    newEnd <= newStart
  ) {
    return false;
  }

  return todayTasks.some((task) => {
    if (task.time == null || task.endTime == null) {
      return false;
    }

    const existingStart = timeToMinutes(task.time);
    const existingEnd = timeToMinutes(task.endTime);

    if (existingStart === null || existingEnd === null) {
      return false;
    }

    return newStart < existingEnd && newEnd > existingStart;
  });
}