import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "@/styles/common";

export function CreateTaskForm() {
  return (
    <View style={styles.overlay}>
        <View style={styles.form}>
            <View style={[styles.header, commonStyles.flexBetween]}>
                <Text style={styles.title}>New task</Text>

                <Pressable>
                    <Ionicons name="close" size={22} color="#8B9A6E" />
                </Pressable>
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="pencil-outline" size={19} color="#8B9A6E" />

                <TextInput
                    placeholder="Task title"
                    placeholderTextColor="#888"
                    style={styles.input}
                />
            </View>

            <Pressable style={styles.row}>
                <Ionicons name="time-outline" size={20} color="#8B9A6E" />

                <Text style={styles.label}>Time</Text>

                <Text style={styles.value}>21:00</Text>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>

            <Pressable style={styles.row}>
                <Ionicons name="calendar-outline" size={20} color="#8B9A6E" />

                <Text style={styles.label}>Date</Text>

                <Text style={styles.value}>Today</Text>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>

            <Pressable style={styles.row}>
                <Ionicons name="pricetag-outline" size={20} color="#8B9A6E" />

                <Text style={styles.label}>Category</Text>

                <View style={styles.category}>
                    <Text style={styles.categoryText}>Personal</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#999" />
            </Pressable>

            <Pressable style={styles.saveButton}>
                <Text style={styles.saveText}>Save task</Text>
            </Pressable>
        </View>
    </View>
  )
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
    inputContainer: {
        height: 40,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#DED8CC",

        paddingHorizontal: 14,
    },
    input: {
        flex: 1,
        marginLeft: 12,

        fontSize: 14,
        color: "#222",
    },
    row: {
        height: 40,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#E5DED2",

        paddingHorizontal: 14,
    },
    label: {
        marginLeft: 12,

        fontSize: 14,
        color: "#222",
    },
    value: {
        marginLeft: "auto",
        fontSize: 13,
        color: "#777",
        marginRight: 10,
    },
    category: {
        marginLeft: "auto",
        marginRight: 5,
        backgroundColor: "#8B9A6E",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    categoryText: {
        color: "white",
        fontSize: 11,
        fontWeight: "600",
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
})