import { commonStyles } from "@/styles/common";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useUpcomingTasks } from "@/context/taskContext";
import {handleDeleteTask} from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";


type UpcomingTaskProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<number>>;
};

export default function UpcomingTask({ setShowUpdateTaskForm, setTaskId }: UpcomingTaskProps) {
  const { upcomingTasks, updateUpcomingTask } = useUpcomingTasks();
  return (
    <View style={commonStyles.componentContainer}>
      <View style={commonStyles.cardHeaderLayout}>
        <Text style={commonStyles.cardHeader}>Upcoming Tasks</Text>
        <Link href={"/"}>➜</Link>
      </View>
      <View style={commonStyles.card}>
        <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks.slice(0,5)} onEditTask={(taskId) => handleEditTask({ taskId, setShowUpdateTaskForm, setTaskId })} onDeleteTask={(taskId) => handleDeleteTask({ taskId, refresh:updateUpcomingTask })} />
      </View>
    </View>
  );
}
