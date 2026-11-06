import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useUpcomingTasks } from "@/context/taskContext";
import {handleDeleteTask} from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";


type UpcomingTaskProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpcomingTask({ setShowUpdateTaskForm }: UpcomingTaskProps) {
  const { upcomingTasks, updateUpcomingTask } = useUpcomingTasks();
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Upcoming Tasks</Text>
        <Link href={"/"}>➜</Link>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks.slice(0,5)} onEditTask={(taskId) => handleEditTask({ taskId, setShowUpdateTaskForm })} onDeleteTask={(taskId) => handleDeleteTask({ taskId, refresh:updateUpcomingTask })} />
      </View>
    </View>
  );
}
