import { Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import Percentage from "./Percentage";
import { commonStyles } from "@/styles/common";
import { Task } from "@/types/taskType";
import { colors } from "@/styles/colors";

type tasks = {
  todayTasks: Task[];
  upcomingTasks: Task[];
}

export default function ProgressCard({todayTasks, upcomingTasks}: tasks) {
  const [showOverall, setShowOverall] = useState(false);

  const todayCompleted = todayTasks.filter(task => task.completed);
  const upcomingCompleted = upcomingTasks.filter(task => task.completed);

  const overallCount = upcomingTasks.length + todayTasks.length;
  const overallCompleted = upcomingCompleted.length + todayCompleted.length;
  
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
            {showOverall ? `${overallCompleted} of ${overallCount} task` : `${todayCompleted.length} of ${todayTasks.length}  tasks`}
          </Text>
        </View>
        <Percentage
          completed={showOverall ? overallCompleted : todayCompleted.length}
          total={showOverall ? overallCount : todayTasks.length}
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