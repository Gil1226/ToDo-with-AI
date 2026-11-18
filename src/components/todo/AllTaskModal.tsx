import { ScrollView, StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { TaskList } from "@/components/taskWork/TaskList";
import { Task } from "@/types/taskType";

type AllTasksModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  emptyMessage: string;
  tasks: Task[];
  activeCategory?: string;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
};

type SheetProps = Omit<AllTasksModalProps, "visible">;

function buildSubtitle(count: number, activeCategory?: string) {
  const countLabel = `${count} ${count === 1 ? "task" : "tasks"}`;

  return !activeCategory || activeCategory === "All"
    ? countLabel
    : `${countLabel} in ${activeCategory}`;
}

// Lives inside the Modal so it reads the modal's own safe-area insets.
function AllTasksSheet({
  onClose,
  title,
  emptyMessage,
  tasks,
  activeCategory,
  onEditTask,
  onDeleteTask,
}: SheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {buildSubtitle(tasks.length, activeCategory)}
          </Text>
        </View>

        <Pressable
          onPress={onClose}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={`Close ${title}`}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons name="close-circle" size={30} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TaskList
          emptyMessage={emptyMessage}
          allTask={tasks}
          onEditTask={(task) => {
            // Close first, otherwise the edit form opens behind the modal.
            onClose();
            onEditTask(task);
          }}
          onDeleteTask={onDeleteTask}
        />
      </ScrollView>
    </View>
  );
}

export default function AllTasksModal({ visible, ...sheetProps }: AllTasksModalProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={sheetProps.onClose}
      animationType="slide"
    >
      {/* Modals get their own native view, so they need their own insets */}
      <SafeAreaProvider>
        <AllTasksSheet {...sheetProps} />
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
  content: {
    padding: 16,
  },
  pressed: {
    opacity: 0.6,
  },
});