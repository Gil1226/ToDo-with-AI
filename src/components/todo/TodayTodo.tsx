import { commonStyles } from "@/styles/common";
import { todo } from "@/styles/todoStyles";
import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useState } from "react";  
import { Task } from "@/types/taskType";
import { useTasks } from "@/context/taskContext";

type props = {
  activeCategory: string
}

export default function TodayTodo({activeCategory}: props) {
  const{ todayTasks } = useTasks();

  const [showAllToday, setShowAllToday] = useState(false)

  const seeAllHandler = () => {
    setShowAllToday(true)
  };

  const filteredTasks = 
    activeCategory === "All" ? 
      todayTasks 
      :  todayTasks.filter(
            (task) => task.category === activeCategory
            );


  return (
    <>
      <ScrollView style={todo.taskSeparator}>
        <View style={[commonStyles.cardHeaderLayout, todo.headerLayout]}>
          <Text style={todo.title}>
            Today
          </Text>
          <Pressable onPress={seeAllHandler}>
            <Text style={todo.sellAllText}>
              See All
            </Text>
          </Pressable>
        </View>  
          <View>  
            <TaskList emptyMessage="No task today, Enjoy your rest!" allTask={filteredTasks.slice(0,5)}/>
          </View>
      </ScrollView>

      <Modal visible={showAllToday} onRequestClose={() => setShowAllToday(false)} animationType="slide">
        <View style={style.modalContainer}>
          <View style={commonStyles.cardHeaderLayout}>
            <Text>All Tasks</Text>

            <Pressable onPress={() => setShowAllToday(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
          <ScrollView>
            <TaskList emptyMessage="No task today, Enjoy your rest!" allTask={todayTasks}/>
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
