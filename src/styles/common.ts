import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F2EB",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  componentContainer: {
    marginBottom: 10, 
  },

  flexBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  cardHeaderLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 16,
  },

  cardHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  
});

export const todo = StyleSheet.create({
  headerLayout: {
        borderColor: colors.secondary,
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontSize: 15
    },
    taskSeparator: {
        paddingBottom: 20,
        borderColor: colors.secondary,
    },
})