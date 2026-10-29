
import { useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import { AIAction } from "@/types/chatTypes";
import {confirmTaskAction, processChatMessage} from "@/services/aiChatService";
import { colors } from "@/styles/colors";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type Props = {
  onTasksChanged?: () => void;
};

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

export default function AIChatbot({
  onTasksChanged,
}: Props) {
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
  const [pendingAction, setPendingAction] =
    useState<AIAction | null>(null);

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

    if (!message || loading) return;

    setInput("");
    addMessage("user", message);
    setLoading(true);

    try {
      const action = await processChatMessage(message);

      if (action.type === "create_task" ||
          action.type === "reschedule_task") {
        setPendingAction(action);
        addMessage(
          "assistant",
          `${action.message}\n\n${describeAction(action)}\n\n` +
          "Please confirm or cancel this change."
        );
      } else {
        addMessage("assistant", action.message);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      addMessage("assistant", `Sorry, ${message}`);
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
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save this change.";

      Alert.alert("Could not save task", message);
    }
  }

  function cancelAction() {
    setPendingAction(null);
    addMessage("assistant", "Okay, I cancelled that change.");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Todo Assistant</Text>
        <Text style={styles.subtitle}>
          Ask about tasks or manage your schedule
        </Text>
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user"
                ? styles.userBubble
                : styles.assistantBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.role === "user" && styles.userText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}

      {pendingAction && !loading && (
        <View style={styles.actionButtons}>
          <Pressable
            style={[styles.actionButton, styles.cancelButton]}
            onPress={cancelAction}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.confirmButton]}
            onPress={confirmAction}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask or manage your tasks..."
          multiline
          editable={!loading && !pendingAction}
          onSubmitEditing={sendMessage}
        />

        <Pressable
          style={[
            styles.sendButton,
            (loading || pendingAction || !input.trim()) &&
              styles.disabledButton,
          ]}
          onPress={sendMessage}
          disabled={loading || !!pendingAction || !input.trim()}
        >
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
  list: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    gap: 12,
  },
  bubble: {
    maxWidth: "88%",
    padding: 12,
    borderRadius: 14,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#0F172A",
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
    color: "#64748B",
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
    padding: 12,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: "#15803D",
  },
  cancelButton: {
    backgroundColor: "#64748B",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  input: {
    flex: 1,
    maxHeight: 110,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.45,
  },
});
