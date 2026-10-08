import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

type CreateTasksBtnProps = {
  setShowCreateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTasksBtn({ setShowCreateTaskForm }: CreateTasksBtnProps) {
  return (
    <View style={style.container}>
      <Pressable style={style.roundBackground} onPress={() => setShowCreateTaskForm(true)}>
        <Ionicons name="add" style={style.addDesign}></Ionicons>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    bottom: 24,
  },
  roundBackground: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addDesign: {
    color: "white",
    fontSize: 40,
  },
});
