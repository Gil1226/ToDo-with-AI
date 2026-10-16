import { colors } from "@/styles/colors";
import { commonStyles, todo } from "@/styles/common";
import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useTasks } from "@/context/taskContext";
import { Task } from "@/types/taskType";
import { useState } from "react";


export default function UpcomingTodo() {
  const { upcomingTasks } = useTasks();

  const [showAllUpcoming, setShowAllUpcoming] = useState(false)

  const seeAllHandler = () => {
    setShowAllUpcoming(true)
  };

  return (
    <>
      <ScrollView style={todo.taskSeparator}>
        <View style={[commonStyles.cardHeaderLayout, todo.headerLayout]}>
          <Text>
            Upcomming
          </Text>
          <Pressable onPress={seeAllHandler}>
            <Text style={todo.sellAllText}>
              See All
            </Text>
          </Pressable>
        </View>  
          <View>  
            <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks.slice(0,5)}/>
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
            <TaskList emptyMessage="No more upcoming task" allTask={upcomingTasks}/>
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
