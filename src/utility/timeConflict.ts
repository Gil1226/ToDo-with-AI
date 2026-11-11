import { Task } from "@/types/taskType";
import { timeToMinutes } from "./timeFormat";
import { fetchAllTasks } from "@/database/taskFunction";


type TimeConflictProps = {
  selectedDate: string;
  newStartTime: string;
  newEndTime: string;
};

export function timeConflict({
  selectedDate,
  newStartTime,
  newEndTime,
}: TimeConflictProps): boolean {

  const allTasks: Task[] = fetchAllTasks();

  const newStart = timeToMinutes(newStartTime);
  const newEnd = timeToMinutes(newEndTime);

  if (
    newStart === null ||
    newEnd === null ||
    newEnd <= newStart
  ) {
    return false;
  }

  return allTasks.some((task) => {
     if (task.date !== selectedDate) {
      return false;
    }

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