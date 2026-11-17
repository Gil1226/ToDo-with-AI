import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useTodayTasks } from "@/context/taskContext";
import { handleDeleteTask } from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";
import { Task } from "@/types/taskType";

type TodayTaskProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function TodayTask({ setShowUpdateTaskForm, setTask }: TodayTaskProps) {
  const {todayTasks, updateTodayTask} = useTodayTasks()
  const importantTasks = todayTasks.filter(task => task.isImportant === 1);
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Today's Important Tasks</Text>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No important tasks today, Enjoy your rest!" allTask={importantTasks.slice(0,5)}  onEditTask={(task) => handleEditTask({ task, setShowUpdateTaskForm, setTask })} onDeleteTask={(task) => handleDeleteTask({ task, refresh:updateTodayTask })} />
      </View>
    </View>
  );
}
