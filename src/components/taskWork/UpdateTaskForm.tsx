import Category from "@/components/taskWork/taskManipulationComponent/Category";
import DateField from "@/components/taskWork/taskManipulationComponent/Date";
import EndTime from "@/components/taskWork/taskManipulationComponent/EndTime";
import StartTime from "@/components/taskWork/taskManipulationComponent/StartTime";
import Title from "@/components/taskWork/taskManipulationComponent/Title";
import { useTodayTasks, useUpcomingTasks } from "@/context/taskContext";
import { updateTask } from "@/database/taskFunction";
import { commonStyles } from "@/styles/common";
import { getTodayDate } from "@/utility/dateFormat";
import { timeConflict } from "@/utility/timeConflict";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type CreateTaskFormProps = {
  setShowUpdateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number;
};

export function UpdateTaskForm({
  setShowUpdateTaskForm,
  taskId,
}: CreateTaskFormProps) {
  const { updateTodayTask } = useTodayTasks();
  const { updateUpcomingTask } = useUpcomingTasks();

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    endTime: "",
    date: getTodayDate(),
    category: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleUpdateTask = () => {
    if (!formData.title.trim()) {
      Alert.alert("Missing Title", "Please enter a task title.");
      return;
    }
    if (!formData.time.trim()) {
      Alert.alert("Missing Time", "Please enter a task time.");
      return;
    }
    if (!formData.endTime.trim()) {
      Alert.alert("Missing End Time", "Please enter a task time.");
      return;
    }
    if (!formData.category.trim()) {
      Alert.alert("Missing Category", "Please enter a task category.");
      return;
    }
    const hasConflict = timeConflict({
      selectedDate: formData.date,
      newStartTime: formData.time,
      newEndTime: formData.endTime,
    });

    console.log(hasConflict, "conflict");
    if (hasConflict) {
      Alert.alert(
        "Schedule Conflict",
        "This task overlaps with an existing task.",
      );
      return;
    }

    const [month, day, year] = formData.date.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    updateTask(formattedDate, formData.time, formData.endTime, taskId);
    updateTodayTask();
    updateUpcomingTask();
    setShowUpdateTaskForm(false);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.form}>
        <View style={[styles.header, commonStyles.flexBetween]}>
          <Text style={styles.title}>Update task</Text>
          <Pressable onPress={() => setShowUpdateTaskForm(false)}>
            <Ionicons name="close" size={22} color="#8B9A6E" />
          </Pressable>
        </View>

        <Title formData={formData} updateForm={updateForm} />
        <StartTime
          formData={formData}
          updateForm={updateForm}
          showTimePicker={showTimePicker}
          setShowTimePicker={setShowTimePicker}
        />
        <EndTime
          formData={formData}
          updateForm={updateForm}
          showEndTimePicker={showEndTimePicker}
          setShowEndTimePicker={setShowEndTimePicker}
        />
        <DateField
          formData={formData}
          updateForm={updateForm}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
        <Category
          formData={formData}
          updateForm={updateForm}
          showCategoryPicker={showCategoryPicker}
          setShowCategoryPicker={setShowCategoryPicker}
        />
        <Pressable style={styles.saveButton} onPress={handleUpdateTask}>
          <Text style={styles.saveText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },

  form: {
    width: "92%",
    backgroundColor: "#F7F3EC",
    borderRadius: 16,
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  saveButton: {
    height: 38,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: "#8B9A6E",
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
