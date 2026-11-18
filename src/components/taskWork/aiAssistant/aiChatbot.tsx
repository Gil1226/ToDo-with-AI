import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AIAction } from "@/types/chatTypes";
import { confirmTaskAction, processChatMessage } from "@/services/aiChatService";
import { colors } from "@/styles/colors";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type Props = {
  onTasksChanged?: () => void;
};

// Darker sage so white text passes contrast on the user bubble and buttons.
const SAGE_DEEP = "#66754D";

function describeAction(action: AIAction): string {
  if (action.type === "create_task") {
    return [
      `Create task: ${action.title}`,
      `Date: ${action.date ?? "Not set"}`,
      `Start: ${action.time ?? "Not set"}`,
      `End: ${action.endTime ?? "Not set"}`,
      `Category: ${action.category ?? "Not set"}`,
      `Important: ${action.isImportant ? "Yes" : "No"}`,
    ].join("\n");
  }

  if (action.type === "reschedule_task") {
    return [
      action.message,
      `Task ID: ${action.taskId}`,
      `New date: ${action.date}`,
      `New start: ${action.time ?? "Keep existing"}`,
      `New end: ${action.endTime ?? "Keep existing"}`,
    ].join("\n");
  }

  return action.message;
}

export default function AIChatbot({ onTasksChanged }: Props) {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text:
        "Hi! I can answer questions about your tasks, " +
        "create tasks, and help reschedule them. What do you need?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<AIAction | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // While the keyboard is open the home indicator is covered,
  // so the extra bottom inset would just be a visible gap.
  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const show = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  function scrollToLatest() {
    listRef.current?.scrollToEnd({ animated: true });
  }

  function addMessage(role: ChatMessage["role"], text: string) {
    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        role,
        text,
      },
    ]);
  }

  async function sendMessage() {
    const message = input.trim();

    if (!message || loading || pendingAction) return;

    setInput("");
    addMessage("user", message);
    setLoading(true);

    try {
      const conversationHistory = messages.map((item) => ({
        role: item.role,
        content: item.text,
      }));

      const action = await processChatMessage(message, conversationHistory);

      if (action.type === "create_task" || action.type === "reschedule_task") {
        setPendingAction(action);
        addMessage(
          "assistant",
          `${action.message}\n\n${describeAction(action)}\n\n` +
            "Please confirm or cancel this change.",
        );
      } else {
        addMessage("assistant", action.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      addMessage("assistant", `Sorry, ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  function confirmAction() {
    if (!pendingAction || loading) return;

    try {
      const result = confirmTaskAction(pendingAction);

      setPendingAction(null);
      addMessage("assistant", result);

      onTasksChanged?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to save this change.";

      Alert.alert("Could not save task", errorMessage);
    }
  }

  function cancelAction() {
    setPendingAction(null);
    addMessage("assistant", "Okay, I cancelled that change.");
  }

  const canSend = !loading && !pendingAction && input.trim().length > 0;
  const bottomPadding = keyboardVisible ? 8 : Math.max(insets.bottom, 8);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.list}
        contentContainerStyle={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        onContentSizeChange={scrollToLatest}
        onLayout={scrollToLatest}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        renderItem={({ item }) => {
          const isUser = item.role === "user";

          return (
            <View
              style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text
                selectable
                style={[styles.messageText, isUser && styles.userText]}
              >
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={SAGE_DEEP} />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}

      {pendingAction && !loading && (
        <View style={styles.actionButtons}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
            onPress={cancelAction}
            accessibilityRole="button"
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.confirmButton,
              pressed && styles.pressed,
            ]}
            onPress={confirmAction}
            accessibilityRole="button"
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </Pressable>
        </View>
      )}

      <View style={[styles.inputRow, { paddingBottom: bottomPadding }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask or manage your tasks..."
          placeholderTextColor={colors.fontLight}
          multiline
          editable={!loading && !pendingAction}
          // No onSubmitEditing: on a multiline input iOS inserts a new line
          // instead, so sending is done with the button.
        />

        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            !canSend && styles.disabledButton,
            pressed && canSend && styles.pressed,
          ]}
          onPress={sendMessage}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3EC",
  },
  list: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    gap: 10,
  },
  bubble: {
    maxWidth: "85%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: SAGE_DEEP,
    borderBottomRightRadius: 6,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#D8CFC0",
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.fontDark,
  },
  userText: {
    color: "#FFFFFF",
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  loadingText: {
    color: colors.fontLight,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    borderRadius: 12,
  },
  confirmButton: {
    backgroundColor: SAGE_DEEP,
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#B9AE9B",
  },
  cancelText: {
    color: colors.fontDark,
    fontSize: 16,
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 8,
    backgroundColor: colors.secondary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#D8CFC0",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 14,
    // iOS multiline inputs ignore paddingVertical on first render,
    // so top and bottom are set explicitly.
    paddingTop: Platform.OS === "ios" ? 10 : 8,
    paddingBottom: Platform.OS === "ios" ? 10 : 8,
    fontSize: 16,
    lineHeight: 20,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#C9BFAE",
    backgroundColor: "#FFFFFF",
    color: colors.fontDark,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SAGE_DEEP,
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
});