import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useTodayTasks } from "@/context/taskContext";
import { handleDeleteTask } from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";

type TodayTaskProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TodayTask({ setShowUpdateTaskForm }: TodayTaskProps) {
  const {todayTasks, updateTodayTask} = useTodayTasks()
  
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Today's Tasks</Text>
        <Link href={"/"}>➜</Link>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No task today, Enjoy your rest!" allTask={todayTasks.slice(0,5)}  onEditTask={(taskId) => handleEditTask({ taskId, setShowUpdateTaskForm })} onDeleteTask={(taskId) => handleDeleteTask({ taskId, refresh:updateTodayTask })} />
      </View>
    </View>
  );
}
