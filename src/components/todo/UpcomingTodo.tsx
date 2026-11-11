import { commonStyles} from "@/styles/common";
import { todo } from "@/styles/todoStyles";
import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useUpcomingTasks } from "@/context/taskContext";
import { useState } from "react";
import { handleDeleteTask } from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";

type TodayTaskProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<number>>;
};

export default function UpcomingTodo({ setShowUpdateTaskForm, setTaskId }: TodayTaskProps) {
  const { upcomingTasks, updateUpcomingTask } = useUpcomingTasks();

  const [showAllUpcoming, setShowAllUpcoming] = useState(false)

  const seeAllHandler = () => {
    setShowAllUpcoming(true)
  };

  return (
    <>
      <ScrollView style={todo.taskSeparator}>
        <View style={[commonStyles.cardHeaderLayout, todo.headerLayout]}>
          <Text style={todo.title}>
            Upcomming
          </Text>
          <Pressable onPress={seeAllHandler}>
            <Text style={todo.sellAllText}>
              See All
            </Text>
          </Pressable>
        </View>  
          <View>  
            <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks.slice(0,5)} onEditTask={(taskId) => handleEditTask({ taskId, setShowUpdateTaskForm, setTaskId })} onDeleteTask={(taskId) => handleDeleteTask({ taskId, refresh:updateUpcomingTask })} />
          </View>
      </ScrollView>
      <Modal visible={showAllUpcoming} onRequestClose={() => setShowAllUpcoming(false)} animationType="slide">
        <View style={style.modalContainer}>
          <View style={commonStyles.cardHeaderLayout}>
            <Text>All Tasks</Text>

            <Pressable onPress={() => setShowAllUpcoming(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
          <ScrollView>
            <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks} onEditTask={(taskId) => handleEditTask({ taskId, setShowUpdateTaskForm, setTaskId })} onDeleteTask={(taskId) => handleDeleteTask({ taskId, refresh:updateUpcomingTask })} />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
  //"No more upcoming task"
}

const style = StyleSheet.create({
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
});
