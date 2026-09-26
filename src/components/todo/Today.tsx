import { commonStyles, todo } from "@/styles/common";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";

export default function TodayTodo() {
  return (
    <ScrollView style={todo.taskSeparator}>
      <Text style={[commonStyles.cardHeaderLayout, todo.headerLayout]}>
        Today
      </Text>
      <View>
        <View>
          <TaskList type="today" />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  bg: {
    backgroundColor: "#ffffff",
  },
});
