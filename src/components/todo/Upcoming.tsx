import { colors } from "@/styles/colors";
import { commonStyles } from "@/styles/common";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TaskList } from "../taskWork/TaskList";

export default function UpcomingTodo() {
  return (
    <ScrollView>
      <Text style={[commonStyles.cardHeaderLayout, style.headerLayout]}>
        Upcoming
      </Text>
      <View>
        <View>
          <TaskList type="upcoming" />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  bg: {
    backgroundColor: "#ffffff",
  },
  headerLayout: {
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
});
