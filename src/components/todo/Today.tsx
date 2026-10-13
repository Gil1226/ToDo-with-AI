import { commonStyles, todo } from "@/styles/common";
import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useState } from "react";  
import { Task } from "@/types/taskType";
import { useTasks } from "@/context/taskContext";

export default function TodayTodo() {
  const{ todayTasks } = useTasks();

  const [showAll, setShowAll] = useState(false)
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const seeAllHandler = () => {
    setAllTasks(todayTasks)
    setShowAll(true)
  };

  return (
    <>
      <ScrollView style={todo.taskSeparator}>
        <View style={[commonStyles.cardHeaderLayout, todo.headerLayout]}>
          <Text>
            Today
          </Text>
          <Pressable onPress={seeAllHandler}>
            <Text style={todo.sellAllText}>
              See All
            </Text>
          </Pressable>
        </View>  
          <View>  
            <TaskList type="today"/>
          </View>
      </ScrollView>

      <Modal visible={showAll} onRequestClose={() => setShowAll(false)} animationType="slide">
        <View style={style.modalContainer}>
          <View style={commonStyles.cardHeaderLayout}>
            <Text>All Tasks</Text>

            <Pressable onPress={() => setShowAll(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
          <ScrollView>
            <TaskList type="today" showAll={showAll} setShowAll={setShowAll}  allTask={allTasks}/>
          </ScrollView>
        </View>
      </Modal>

    </>
    
  );
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
