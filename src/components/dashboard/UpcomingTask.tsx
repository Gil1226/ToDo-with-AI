import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useTasks } from "@/context/taskContext";

export default function UpcomingTask() {
  const { upcomingTasks } = useTasks();
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Upcoming Tasks</Text>
        <Link href={"/"}>➜</Link>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks.slice(0,5)}/>
      </View>
    </View>
  );
}
