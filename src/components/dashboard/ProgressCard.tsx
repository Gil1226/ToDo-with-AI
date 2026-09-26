import { Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import Percentage from "../../utility/Percentage";
import { commonStyles } from "@/styles/common";
import { Task } from "@/types/taskType";
import { getTodayDate } from "@/utility/date";
import { colors } from "@/styles/colors";

type tasks = {
  tasks: Task[];
}

export default function ProgressCard({tasks}: tasks) {
  const [showOverall, setShowOverall] = useState(false);

  const todayTasksList = tasks.filter(task => task.date === getTodayDate()); 
  const todayCompleted = todayTasksList.filter(task => task.completed)

  const overallTasksList = tasks.filter(task => task.date > getTodayDate() || task.date === getTodayDate());
  const overallCompleted = overallTasksList.filter(task => task.completed)

  return (  
    <View style={commonStyles.componentContainer}>
      <Pressable
        style={styles.toggleButton}
        onPress={() => setShowOverall(!showOverall)}
      >
        <Text style={styles.toggleText}>
          {showOverall ? "View Today" : "View Overall"}
        </Text>
      </Pressable>

      <View style={[commonStyles.card, commonStyles.flexBetween]}>
        <View>
          <Text style={commonStyles.cardHeader}>
            {showOverall ? "Overall progress" : "Today's progress"}
          </Text>

          <Text style={styles.taskCount}>
            {showOverall ? `${overallCompleted.length} of ${overallTasksList.length} task` : `${todayCompleted.length} of ${todayTasksList.length}  tasks`}
          </Text>
        </View>
        <Percentage
          completed={showOverall ? overallCompleted.length : todayCompleted.length}
          total={showOverall ? overallTasksList.length : todayTasksList.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    marginBottom: 8,
    marginRight: 16,
    alignSelf: "flex-end",
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.fontLight,
  },

  taskCount: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.fontLight,
    marginTop: 4,
  },
});