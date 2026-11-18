import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import AIChatbot from "../taskWork/aiAssistant/aiChatbot";
import { useTodayTasks, useUpcomingTasks } from "@/context/taskContext";
import { updateCompleted } from "@/database/taskFunction";

type Props = {
  visible: boolean;
  onClose: () => void;
};

function ChatSheet({ onClose }: { onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { updateTodayTask } = useTodayTasks();
  const { updateUpcomingTask } = useUpcomingTasks();

  function handleTasksChanged() {
    updateTodayTask();
    updateUpcomingTask();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerText}>
          <Text style={styles.title}>AI Todo Assistant</Text>
          <Text style={styles.subtitle}>
            Ask about tasks or manage your schedule
          </Text>
        </View>

        <Pressable
          onPress={onClose}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Close AI assistant"
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons
            name="close-circle"
            size={30}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <AIChatbot onTasksChanged={handleTasksChanged} />
    </KeyboardAvoidingView>
  );
}

export default function AIChatbotModal({ visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <ChatSheet onClose={onClose} />
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3EC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.secondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D8CFC0",
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.fontDark,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: colors.fontLight,
  },
  pressed: {
    opacity: 0.6,
  },
});