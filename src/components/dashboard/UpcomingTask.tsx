import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useUpcomingTasks } from "@/context/taskContext";
import {handleDeleteTask} from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";
import { Task } from "@/types/taskType";


type UpcomingTaskProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function UpcomingTask({ setShowUpdateTaskForm, setTask }: UpcomingTaskProps) {
  const { upcomingTasks, updateUpcomingTask } = useUpcomingTasks();
  const importantTasks = upcomingTasks.filter(task => task.isImportant === 1);
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Upcoming Important Tasks</Text>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No more upcoming important tasks" allTask={importantTasks.slice(0,5)} onEditTask={(task) => handleEditTask({ task, setShowUpdateTaskForm, setTask })} onDeleteTask={(task) => handleDeleteTask({ task, refresh:updateUpcomingTask })} />
      </View>
    </View>
  );
}
