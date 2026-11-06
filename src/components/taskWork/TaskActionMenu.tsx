
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskActionMenu({
  children,
  onEdit,
  onDelete,
}: Props) {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    closeMenu();
    onEdit();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            closeMenu();
            onDelete();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {/* Task card */}
      <Pressable
        onLongPress={() => setVisible(true)}
        delayLongPress={400}
      >
        {children}
      </Pressable>

      {/* Action menu */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <View style={styles.overlay}>

          {/* Close when tapping outside */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeMenu}
          />

          {/* Bottom sheet */}
          <View style={styles.sheet}>

            <View style={styles.handle} />

            <Text style={styles.heading}>
              Task Options
            </Text>

            <Text style={styles.description}>
              Choose what you want to do with this task.
            </Text>

            {/* EDIT BUTTON */}
            <Pressable
              onPress={handleEdit}
              style={({ pressed }) => [
                styles.action,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.editIcon}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color="#3978DB"
                />
              </View>

              <View style={styles.actionContent}>
                <Text style={styles.editTitle}>
                  Edit Task
                </Text>

                <Text style={styles.actionSubtitle}>
                  Update task details
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </Pressable>

            {/* DELETE BUTTON */}
            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => [
                styles.action,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.deleteIcon}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="#E5484D"
                />
              </View>

              <View style={styles.actionContent}>
                <Text style={styles.deleteTitle}>
                  Delete Task
                </Text>

                <Text style={styles.actionSubtitle}>
                  Remove this task permanently
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </Pressable>

            {/* CANCEL BUTTON */}
            <Pressable
              onPress={closeMenu}
              style={({ pressed }) => [
                styles.cancel,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>

            <View
              style={{
                height: Platform.OS === "ios" ? 20 : 10,
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 10,
  },

  handle: {
    width: 42,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#D5D5D5",
    alignSelf: "center",
    marginBottom: 22,
  },

  heading: {
    fontSize: 21,
    fontWeight: "700",
    color: "#172033",
  },

  description: {
    fontSize: 13,
    color: "#8B95A5",
    marginTop: 5,
    marginBottom: 20,
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    borderRadius: 15,
    padding: 13,
    minHeight: 76,
    marginBottom: 10,
  },

  pressed: {
    opacity: 0.65,
  },

  editIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FDEBEC",
    alignItems: "center",
    justifyContent: "center",
  },

  actionContent: {
    flex: 1,
    marginLeft: 13,
  },

  editTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172033",
  },

  deleteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5484D",
  },

  actionSubtitle: {
    fontSize: 12,
    color: "#8B95A5",
    marginTop: 4,
  },

  cancel: {
    backgroundColor: "#F0F1F4",
    borderRadius: 14,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172033",
  },
});
