import {
  Modal,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import AIChatbot from "../taskWork/aiAssistant/aiChatbot";
import { useTasks } from "@/context/taskContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AIChatbotModal({
  visible,
  onClose,
}: Props) {
  const { updateTodayTask, updateUpcomingTask } = useTasks();

  function handleTasksChanged() {
    updateTodayTask();
    updateUpcomingTask();
  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            accessibilityLabel="Close AI assistant"
          >
            <Ionicons
              name="close-circle-outline"
              size={30}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <View style={styles.chat}>
          <AIChatbot onTasksChanged={handleTasksChanged}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 55,
    paddingHorizontal: 16,
    alignItems: "flex-end",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chat: {
    flex: 1,
  },
});
