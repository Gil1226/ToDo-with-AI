import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useTasks } from "@/context/taskContext";

export default function TodayTask() {
  const {todayTasks} = useTasks()
  
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Today's Tasks</Text>
        <Link href={"/"}>➜</Link>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No task today, Enjoy your rest!" allTask={todayTasks.slice(0,5)} />
      </View>
    </View>
  );
}
