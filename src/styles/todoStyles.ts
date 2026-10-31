import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const todo = StyleSheet.create({
    headerLayout: {
      borderColor: colors.secondary,
      borderBottomWidth: 1,
      paddingVertical: 10,   
    },
    sellAllText: {
      fontSize: 10,
      fontWeight: "600",
      color: colors.fontLight,
    },
    taskSeparator: {
        paddingBottom: 20,
        borderColor: colors.secondary,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
})