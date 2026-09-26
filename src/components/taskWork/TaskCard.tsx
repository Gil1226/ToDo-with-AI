import { useTasks } from "@/context/taskContext";
import { updateCompleted } from "@/database/taskFunction";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../../types/taskType";

export function TaskCard({
  id,
  title,
  time,
  category,
  completed = false,
}: Task) {
  const { tasks, updateTask } = useTasks();
  const task = tasks.find((task) => task.id === id);

  const isCompleted = task?.completed;

  const markDone = async () => {
    const realtimeValue = !isCompleted;

    updateCompleted(id, realtimeValue);
    updateTask();
  };
  return (
    <View style={styles.wholeContainer}>
      <Pressable
        style={[
          styles.checkbox,
          isCompleted ? styles.taskDone : styles.taskUndone,
        ]}
        onPress={markDone}
      >
        {isCompleted && <Ionicons name="checkmark" size={12} color="white" />}
      </Pressable>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            isCompleted ? styles.titleCompleted : styles.titleIncomplete,
          ]}
        >
          {title}
        </Text>
        <View style={styles.timeCatContainer}>
          <Text
            style={[
              styles.time,
              isCompleted ? styles.timeCompleted : styles.timeIncomplete,
            ]}
          >
            {time}
          </Text>
          <View
            style={[
              styles.category,
              isCompleted
                ? styles.categoryCompleted
                : styles.categoryIncomplete,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                isCompleted ? { color: "#A5A9AD" } : { color: "#172033" },
              ]}
            >
              {category}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wholeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    marginRight: 12,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    borderWidth: 1,
  },
  taskDone: {
    borderColor: "#B8CBB9",
    backgroundColor: "#B8CBB9",
  },

  taskUndone: {
    borderColor: "#B8C0CC",
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    marginVertical: 3,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  titleCompleted: {
    color: "#A5A9AD",
    textDecorationLine: "line-through",
  },

  titleIncomplete: {
    color: "#172033",
  },

  timeCatContainer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  time: {
    fontSize: 11,
  },

  timeCompleted: {
    color: "#C2C5C8",
  },

  timeIncomplete: {
    color: "#8B95A5",
  },

  category: {
    marginLeft: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  categoryCompleted: {
    backgroundColor: "#F5F5F5",
  },

  categoryIncomplete: {
    backgroundColor: "#F5F3F0",
  },

  categoryText: {
    fontSize: 10,
  },
});
