import { commonStyles } from "@/styles/common";
import { todo } from "@/styles/todoStyles";
import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useState } from "react";  
import { Task } from "@/types/taskType";
import { useTodayTasks } from "@/context/taskContext";
import { handleDeleteTask } from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";

type props = {
  activeCategory: string
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export default function TodayTodo({activeCategory, setShowUpdateTaskForm, setTask}: props) {
  const{ todayTasks, updateTodayTask } = useTodayTasks();

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
            <TaskList emptyMessage="No task today, Enjoy your rest!" allTask={filteredTasks.slice(0,5)} onEditTask={(task) => handleEditTask({ task, setShowUpdateTaskForm, setTask })} onDeleteTask={(task) => handleDeleteTask({ task, refresh:updateTodayTask })} />
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
            <TaskList emptyMessage="No task today, Enjoy your rest!" allTask={todayTasks} onEditTask={(task) => handleEditTask({ task, setShowUpdateTaskForm, setTask })} onDeleteTask={(task) => handleDeleteTask({ task, refresh:updateTodayTask })} />
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
