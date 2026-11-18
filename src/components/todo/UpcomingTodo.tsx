import { commonStyles} from "@/styles/common";
import { todo } from "@/styles/todoStyles";
import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { TaskList } from "../taskWork/TaskList";
import { useUpcomingTasks } from "@/context/taskContext";
import { useState } from "react";
import { handleDeleteTask } from "@/utility/deleteFunction";
import { handleEditTask } from "@/utility/updateFunction";
import { Task } from "@/types/taskType";
import AllTasksModal from "./AllTaskModal";

type UpcomingTaskProps = {
  activeCategory: string
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function UpcomingTodo({ activeCategory, setShowUpdateTaskForm, setTask }: UpcomingTaskProps) {
  const { upcomingTasks, updateUpcomingTask } = useUpcomingTasks();

  const [showAllUpcoming, setShowAllUpcoming] = useState(false)

  const seeAllHandler = () => {
    setShowAllUpcoming(true)
  };

  const filteredTasks = 
    activeCategory === "All" ? 
      upcomingTasks
      :  upcomingTasks.filter(
            (task) => task.category === activeCategory
    );

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
            <TaskList emptyMessage="No more upcoming task" allTask={filteredTasks.slice(0,5)} onEditTask={(task) => handleEditTask({ task, setShowUpdateTaskForm, setTask })} onDeleteTask={(task) => handleDeleteTask({ task, refresh:updateUpcomingTask })} />
          </View>
      </ScrollView>
      <AllTasksModal
        visible={showAllUpcoming}
        onClose={() => setShowAllUpcoming(false)}
        title="All upcoming tasks"
        emptyMessage="No more upcoming task"
        tasks={filteredTasks}
        activeCategory={activeCategory}
        onEditTask={(task) => handleEditTask({ task, setShowUpdateTaskForm, setTask })}
        onDeleteTask={(task) => handleDeleteTask({ task, refresh: updateUpcomingTask })}
      />
    </>
  );
}

