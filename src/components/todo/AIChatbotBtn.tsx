import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

type AIAssistantBtnProps = {
  onPress: () => void;
};

export default function AIChatbotBtn({ onPress }: AIAssistantBtnProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        accessibilityLabel="Open AI Assistant"
      >
        <Ionicons name="sparkles" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    bottom: 86,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
