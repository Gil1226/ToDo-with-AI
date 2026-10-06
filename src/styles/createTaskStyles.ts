import { StyleSheet } from "react-native";

export const createTaskStyles = StyleSheet.create({
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
})